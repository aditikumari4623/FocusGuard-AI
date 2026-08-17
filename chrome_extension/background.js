import {

    startActivity,

    endActivity,

    saveTabSwitch,

    updateUserStatus,

    getLatestNotification,

    markNotificationRead,

    checkPlannerFocus

} from "./api.js";

import {

    getAccessToken,

    getActivityId,

    saveActivityId

} from "./storage.js";


let currentTabId = null;
let currentUrl = null;
let previousWebsite = null;
let currentStatus = "ACTIVE";


// -------------------------------------------
// Ignore Internal Browser Pages
// -------------------------------------------

function isValidUrl(url) {

    if (!url) return false;

    return (

        !url.startsWith("chrome://") &&
        !url.startsWith("edge://") &&
        !url.startsWith("about:") &&
        !url.startsWith("chrome-extension://")

    );

}


// -------------------------------------------
// Start Tracking New Activity
// -------------------------------------------

async function trackNewActivity(tab) {

    if (!isValidUrl(tab.url)) {

        console.log("Ignored:", tab.url);

        return;

    }

    const token = await getAccessToken();

    if (!token) {

        console.log("No Access Token");

        return;

    }

    // ------------------------------------
    // Current Website
    // ------------------------------------

    const currentWebsite = tab.title;

    // ------------------------------------
    // Save Tab Switch
    // ------------------------------------

    if (

        previousWebsite !== null &&

        previousWebsite !== currentWebsite

    ) {

        await saveTabSwitch(

            

            previousWebsite,

            currentWebsite

        );

    }

    // ------------------------------------
    // End Previous Activity
    // ------------------------------------

    const previousActivityId = await getActivityId();

    if (previousActivityId) {

        await endActivity(

            

            previousActivityId

        );

    }

    // ------------------------------------
    // Start New Activity
    // ------------------------------------

    const response = await startActivity(

        

        {

            url: tab.url,

            tab_title: tab.title,

            application: "Chrome"

        }

    );

    if (

        response &&

        response.activity_id

    ) {

        await saveActivityId(

            response.activity_id

        );

    }

    currentTabId = tab.id;

    currentUrl = tab.url;

    previousWebsite = currentWebsite;

    console.log("Tracking:", tab.url);

}


// -------------------------------------------
// Tab Changed
// -------------------------------------------

chrome.tabs.onActivated.addListener(

    async (activeInfo) => {

        try {

            const tab = await chrome.tabs.get(

                activeInfo.tabId

            );

            await trackNewActivity(tab);

        }

        catch (error) {

            console.error(error);

        }

    }

);


// -------------------------------------------
// URL Changed Inside Same Tab
// -------------------------------------------

chrome.tabs.onUpdated.addListener(

    async (

        tabId,

        changeInfo,

        tab

    ) => {

        if (

            changeInfo.status !== "complete"

        ) {

            return;

        }

        if (

            tabId !== currentTabId

        ) {

            return;

        }

        if (

            tab.url === currentUrl

        ) {

            return;

        }

        await trackNewActivity(tab);

    }

);


// -------------------------------------------
// Tab Closed
// -------------------------------------------

chrome.tabs.onRemoved.addListener(

    async (tabId) => {

        if (

            tabId !== currentTabId

        ) {

            return;

        }

        const token = await getAccessToken();

        const activityId = await getActivityId();

        if (

            token &&

            activityId

        ) {

            await endActivity(

                

                activityId

            );

        }

    }

);

// -------------------------------------------
// Idle Detection
// -------------------------------------------

// User becomes IDLE after 60 seconds
chrome.idle.setDetectionInterval(60);

chrome.idle.onStateChanged.addListener(

    async (state) => {

        const token = await getAccessToken();

        if (!token) return;

        if (state === "active") {

            if (currentStatus !== "ACTIVE") {

                currentStatus = "ACTIVE";

                await updateUserStatus(

                    

                    "ACTIVE"

                );

                console.log("User is ACTIVE");

            }

        }

        else {

            if (currentStatus !== "IDLE") {

                currentStatus = "IDLE";

                await updateUserStatus(

                    

                    "IDLE"

                );

                console.log("User is IDLE");

            }

        }

    }

);


// -------------------------------------------
// Browser Notifications
// -------------------------------------------

async function checkNotifications() {

    try {

        const token = await getAccessToken();

        if (!token) {

            return;

        }

        const notification = await getLatestNotification();

        if (

            !notification ||

            !notification.id

        ) {

            return;

        }

        chrome.notifications.create(

            `focusguard-${notification.id}`,

            {

                type: "basic",

                iconUrl: chrome.runtime.getURL("icon.png"),

                title: notification.title,

                message: notification.message,

                requireInteraction: true,

                priority: 2

            }

        );

        await markNotificationRead(

            notification.id

        );

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------
// Check Notifications Every 30 Seconds
// -------------------------------------------

setInterval(

    checkNotifications,

    30000

);


// Run Immediately On Extension Startup

checkNotifications();


// ----------------------------------------------------
// Check Planner Focus
// ----------------------------------------------------

async function checkFocus() {

    try {

        const token = await getAccessToken();

        if (!token) {

            return;

        }

        const data = await checkPlannerFocus();

        if (!data) {

            return;

        }

        console.log("Planner:", data.status);

    }

    catch (error) {

        console.error(error);

    }

}

// ----------------------------------------------------
// Check Planner Every 2 Minutes
// ----------------------------------------------------

setInterval(

    checkFocus,

    60000

);

// Run once when extension starts

checkFocus();