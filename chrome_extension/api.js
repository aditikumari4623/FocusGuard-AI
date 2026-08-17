import { API_BASE_URL } from "./config.js";

import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    clearStorage
} from "./storage.js";


// -------------------------------------------------
// Refresh Access Token
// -------------------------------------------------

async function refreshAccessToken() {

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {

        throw new Error("Refresh Token Not Found");

    }

    const response = await fetch(

        `${API_BASE_URL}/auth/refresh-token`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                refresh_token: refreshToken

            })

        }

    );

    if (!response.ok) {

    await clearStorage();

    throw new Error("Refresh Token Expired");

}

    const data = await response.json();

    await saveAccessToken(

        data.access_token

    );

    console.log("✅ Access Token Refreshed");

    return data.access_token;

}


// -------------------------------------------------
// Authenticated Fetch
// -------------------------------------------------

async function authenticatedFetch(url, options) {

    let token = await getAccessToken();

    // No access token
    if (!token) {

        console.log("No Access Token");

        throw new Error("NOT_LOGGED_IN");

    }

    options.headers = {

        ...options.headers,

        Authorization: `Bearer ${token}`

    };

    let response = await fetch(

        url,

        options

    );

    // Access Token Expired
    if (response.status === 401) {

        console.log("Access Token Expired");

        try {

            token = await refreshAccessToken();

            options.headers.Authorization =

                `Bearer ${token}`;

            response = await fetch(

                url,

                options

            );

        }

        catch (error) {

            console.log("Session Expired");

            await clearStorage();

            throw error;

        }

    }

    return response;

}


// -------------------------------------------------
// Start Activity
// -------------------------------------------------

export async function startActivity(activity) {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/activity/start`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(activity)

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------------
// End Activity
// -------------------------------------------------

export async function endActivity(activityId) {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/activity/end/${activityId}`,

            {

                method: "PUT",

                headers: {}

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------------
// Save Tab Switch
// -------------------------------------------------

export async function saveTabSwitch(

    fromWebsite,

    toWebsite

) {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/activity/tab-switch`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    from_website: fromWebsite,

                    to_website: toWebsite

                })

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------------
// Update User Status
// -------------------------------------------------

export async function updateUserStatus(status) {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/activity/status`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    status: status

                })

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------------
// Get Latest Notification
// -------------------------------------------------

export async function getLatestNotification() {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/notifications/latest`,

            {

                method: "GET",

                headers: {}

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}


// -------------------------------------------------
// Mark Notification As Read
// -------------------------------------------------

export async function markNotificationRead(notificationId) {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/notifications/${notificationId}/read`,

            {

                method: "PATCH",

                headers: {}

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}

// -------------------------------------------------
// Check Planner Focus
// -------------------------------------------------

export async function checkPlannerFocus() {

    try {

        const response = await authenticatedFetch(

            `${API_BASE_URL}/planner/check-focus`,

            {

                method: "POST",

                headers: {}

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

    }

}