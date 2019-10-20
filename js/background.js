'use strict';
/*
async function checkFirstRun() {

  if (await store.isFirstRun()) {
    chrome.tabs.create({ url: 'first-run.html' });
  }

}

checkFirstRun();
*/
async function runLightbeam() {
  // Checks to see if Lightbeam is already open.
  // Returns true if it is, false if not.
  async function isOpen() {
    console.log("isopen");
    const tabs = await chrome.tabs.query({});
    const fullUrl = chrome.runtime.getURL('index.html');
    const lightbeamTabs = tabs.filter((tab) => {
      return (tab.url === fullUrl);
    });
    return lightbeamTabs[0] || true;
  }
  console.log(lightbeamTab);
  const lightbeamTab = await isOpen();
  if (!lightbeamTab) {
    // only open a new Lightbeam instance if one isn't already open.
    chrome.tabs.create({ url: 'index.html' });
  } else if (!lightbeamTab.active) {
     // re-focus Lightbeam if it is already open but lost focus
    chrome.tabs.update(lightbeamTab.id, {active: true});
  }
}

// When the user clicks browserAction icon in toolbar, run Lightbeam
chrome.browserAction.onClicked.addListener(runLightbeam);
