chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  console.log("tab");
  console.log(tab);
  const regex = /^https:\/\/github\.com\/.+\/.+\/pull\/\d+$/g;
  if (info.status === "complete" && regex.test(tab.url)) {
    console.log("This is pull request page");
    // chrome.tabs.executeScript(null, { file: './contentScript.js' }, () => {});
  }
});
