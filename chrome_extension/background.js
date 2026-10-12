
import {
  startActivity,
  endActivity,
  saveTabSwitch,
  updateUserStatus,
  getLatestNotification,
  markNotificationRead,
  checkPlannerFocus,
} from "./api.js";

import {
  getAccessToken,
  getActivityId,
  saveActivityId,
} from "./storage.js";

// ----------------------------------------------------
// State
// ----------------------------------------------------

let currentTabId = null;
let currentUrl = null;
let previousWebsite = null;
let currentStatus = "ACTIVE";

const STATUS_ALARM = "focusguard-status-heartbeat";
const NOTIFICATION_ALARM = "focusguard-notifications";
const PLANNER_ALARM = "focusguard-planner-focus";

// ----------------------------------------------------
// Ignore Internal Browser Pages
// ----------------------------------------------------

function isValidUrl(url) {
  if (!url) return false;

  return (
    url.startsWith("http://") ||
    url.startsWith("https://")
  );
}

// ----------------------------------------------------
// Start Tracking New Activity
// ----------------------------------------------------

async function trackNewActivity(tab) {
  if (!tab?.id || !isValidUrl(tab.url)) {
    console.log("Ignored tab:", tab?.url);
    return false;
  }

  const token = await getAccessToken();

  if (!token) {
    console.log("No access token. Tracking not started.");
    return false;
  }

  // Avoid restarting the same activity unnecessarily.
  if (
    currentTabId === tab.id &&
    currentUrl === tab.url
  ) {
    return true;
  }

  const currentWebsite = tab.title || tab.url;

  // End the previous activity before starting another.
  const previousActivityId = await getActivityId();

  if (previousActivityId) {
    await endActivity(previousActivityId);
    await saveActivityId(null);
  }

  // Record the tab switch when the website changes.
  if (
    previousWebsite !== null &&
    previousWebsite !== currentWebsite
  ) {
    await saveTabSwitch(
      previousWebsite,
      currentWebsite
    );
  }

  const response = await startActivity({
    url: tab.url,
    tab_title: tab.title || tab.url,
    application: "Chrome",
  });

  if (!response?.activity_id) {
    console.error(
      "Activity was not started. Check the activity API response."
    );

    currentTabId = null;
    currentUrl = null;

    return false;
  }

  await saveActivityId(response.activity_id);

  currentTabId = tab.id;
  currentUrl = tab.url;
  previousWebsite = currentWebsite;

  console.log("Tracking started:", tab.url);
  console.log("Activity ID:", response.activity_id);

  return true;
}

// ----------------------------------------------------
// Start Tracking the Currently Active Tab
// ----------------------------------------------------

async function trackActiveTab() {
  try {
    const token = await getAccessToken();

    if (!token) {
      console.log("No access token; waiting for login.");
      return false;
    }

    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    const activeTab = tabs[0];

    if (!activeTab) {
      console.log("No active tab found.");
      return false;
    }

    return await trackNewActivity(activeTab);
  } catch (error) {
    console.error(
      "Could not track the active tab:",
      error
    );

    return false;
  }
}

// ----------------------------------------------------
// Login Success Message from popup.js
// ----------------------------------------------------

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (
      message?.type !== "FOCUSGUARD_START_TRACKING"
    ) {
      return;
    }

    trackActiveTab()
      .then((started) => {
        sendResponse({
          ok: started,
          error: started
            ? null
            : "Tracking could not start. Check the service worker console.",
        });
      })
      .catch((error) => {
        console.error(
          "Login tracking initialization failed:",
          error
        );

        sendResponse({
          ok: false,
          error: error.message || "Tracking initialization failed.",
        });
      });

    // Keep the message channel open for the async response.
    return true;
  }
);

// ----------------------------------------------------
// Tab Activated
// ----------------------------------------------------

chrome.tabs.onActivated.addListener(
  async (activeInfo) => {
    try {
      const tab = await chrome.tabs.get(
        activeInfo.tabId
      );

      await trackNewActivity(tab);
    } catch (error) {
      console.error(
        "Tab activation tracking error:",
        error
      );
    }
  }
);

// ----------------------------------------------------
// URL Changed in the Current Tab
// ----------------------------------------------------

chrome.tabs.onUpdated.addListener(
  async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") {
      return;
    }

    if (!tab.active) {
      return;
    }

    if (
      tabId === currentTabId &&
      tab.url === currentUrl
    ) {
      return;
    }

    try {
      await trackNewActivity(tab);
    } catch (error) {
      console.error(
        "Tab update tracking error:",
        error
      );
    }
  }
);

// ----------------------------------------------------
// Tab Closed
// ----------------------------------------------------

chrome.tabs.onRemoved.addListener(
  async (tabId) => {
    if (tabId !== currentTabId) {
      return;
    }

    try {
      const token = await getAccessToken();
      const activityId = await getActivityId();

      if (token && activityId) {
        await endActivity(activityId);
        await saveActivityId(null);
      }

      currentTabId = null;
      currentUrl = null;
    } catch (error) {
      console.error(
        "Tab close tracking error:",
        error
      );
    }
  }
);

// ----------------------------------------------------
// Idle Detection
// ----------------------------------------------------

chrome.idle.setDetectionInterval(60);

chrome.idle.onStateChanged.addListener(
  async (state) => {
    try {
      const token = await getAccessToken();

      if (!token) return;

      const newStatus =
        state === "active" ? "ACTIVE" : "IDLE";

      if (currentStatus === newStatus) {
        return;
      }

      currentStatus = newStatus;

      await updateUserStatus(currentStatus);

      console.log("User status:", currentStatus);
    } catch (error) {
      console.error(
        "Idle status update failed:",
        error
      );
    }
  }
);

// ----------------------------------------------------
// Status Heartbeat
// ----------------------------------------------------

async function sendStatusHeartbeat() {
  try {
    const token = await getAccessToken();

    if (!token) return;

    await updateUserStatus(currentStatus);

    console.log(
      "Status heartbeat:",
      currentStatus
    );
  } catch (error) {
    console.error(
      "Status heartbeat error:",
      error
    );
  }
}

// ----------------------------------------------------
// Browser Notifications
// ----------------------------------------------------

async function checkNotifications() {
  try {
    const token = await getAccessToken();

    if (!token) return;

    const notification = await getLatestNotification();

    if (!notification?.id) return;

    await chrome.notifications.create(
      `focusguard-${notification.id}`,
      {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon.png"),
        title: notification.title || "FocusGuard AI",
        message: notification.message || "You have a new notification.",
        requireInteraction: true,
        priority: 2,
      }
    );

    await markNotificationRead(notification.id);
  } catch (error) {
    console.error(
      "Notification check failed:",
      error
    );
  }
}

// ----------------------------------------------------
// Planner Focus Check
// ----------------------------------------------------

async function checkFocus() {
  try {
    const token = await getAccessToken();

    if (!token) return;

    const data = await checkPlannerFocus();

    if (data) {
      console.log("Planner focus:", data.status, data);
    }
  } catch (error) {
    console.error(
      "Planner focus check failed:",
      error
    );
  }
}

// ----------------------------------------------------
// Chrome Alarms
// ----------------------------------------------------

function configureAlarms() {
  chrome.alarms.create(STATUS_ALARM, {
    periodInMinutes: 5,
  });

  chrome.alarms.create(NOTIFICATION_ALARM, {
    periodInMinutes: 0.5,
  });

  chrome.alarms.create(PLANNER_ALARM, {
    periodInMinutes: 1,
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === STATUS_ALARM) {
    sendStatusHeartbeat();
  } else if (alarm.name === NOTIFICATION_ALARM) {
    checkNotifications();
  } else if (alarm.name === PLANNER_ALARM) {
    checkFocus();
  }
});

// ----------------------------------------------------
// Extension Lifecycle
// ----------------------------------------------------

chrome.runtime.onInstalled.addListener(() => {
  configureAlarms();
  trackActiveTab();
});

chrome.runtime.onStartup.addListener(() => {
  configureAlarms();
  trackActiveTab();
});

// Restore alarms and tracking when the service worker starts.
configureAlarms();
trackActiveTab();
checkNotifications();
checkFocus();
