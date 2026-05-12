// New tab created - check immediately before rendering
chrome.tabs.onCreated.addListener(async (tab) => {
  if (tab.url) {
    await checkDuplicateAndSwitch(tab);
  }
});

// Tab URL updated - detect as soon as URL is known, don't wait for rendering
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    await checkDuplicateAndSwitch(tab);
  }
});

async function checkDuplicateAndSwitch(newTab) {
  if (!newTab.url || newTab.url.startsWith('chrome://')) return;

  const url = normalizeUrl(newTab.url);
  const allTabs = await chrome.tabs.query({});
  const existing = allTabs.find(
    (t) => t.id !== newTab.id && t.windowId !== undefined && normalizeUrl(t.url) === url
  );

  if (existing) {
    // Close new tab first, then activate existing tab
    await chrome.tabs.remove(newTab.id);
    await chrome.tabs.update(existing.id, { active: true });
    await chrome.windows.update(existing.windowId, { focused: true });
  }
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    return u.href;
  } catch {
    return url;
  }
}
