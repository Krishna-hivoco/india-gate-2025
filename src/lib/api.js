// lib/api.js

const BASE_URL = "https://api.indiagategrainsofhope.com";

/**
 * Fetch main stats (visit count & share count)
 * @returns {Promise<{visit_count: number, share_count: number}>}
 */
export async function getMainStats() {
  try {
    const res = await fetch(`${BASE_URL}/main/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error fetching main stats: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("getMainStats Error:", error);
    return null;
  }
}

/**
 * Fetch school stats (ranking, shares, percentage)
 * @returns {Promise<Array>}
 */
export async function getSchoolStats() {
  try {
    const res = await fetch(`${BASE_URL}/school/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error fetching school stats: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("getSchoolStats Error:", error);
    return [];
  }
}


export async function updatePlayVideo(deviceId, shareId) {
  try {
    const res = await fetch(`${BASE_URL}/play_video/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: deviceId, share_id: shareId }),
    });
    if (!res.ok) throw new Error(`Error updating play count: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("updatePlayVideo Error:", error);
    return null;
  }
}

 export function generateUniqueId() {
   return "xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
     const r = (Math.random() * 16) | 0;
     const v = c === "x" ? r : (r & 0x3) | 0x8;
     return v.toString(16);
   });
 }


 export async function insertSchoolShare(deviceId, shareId) {
   try {
     const res = await fetch(`${BASE_URL}/other/share`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ device_id: deviceId, share_id: shareId }),
     });
     if (!res.ok)
       throw new Error(`Error inserting school share: ${res.status}`);
     return await res.json();
   } catch (error) {
     console.error("insertSchoolShare Error:", error);
     return null;
   }
 }

 
export async function insertUTM(sources) {
   try {
     const res = await fetch(
       `${BASE_URL}/log/utm_count`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ sources }),
       }
     );
     if (!res.ok)
       throw new Error(`Error inserting source: ${res.status}`);
     return await res.json();
   } catch (error) {
     console.error("insertSSource Error:", error);
     return null;
   }
 }

