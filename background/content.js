chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  const regex = /^https:\/\/github\.com\/.+\/.+\/pull\/\d+$/g;
  if (info.status === "complete" && regex.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        func: changeMergeOpriion,
      });
  }
});

const changeMergeOpriion = () => {
  var observer = new MutationObserver(() => {
    document.querySelector(".merge-message .select-menu-button").click();
    document.querySelector('.merge-message button[value="squash"]').click();
    // document.querySelector('.merge-message button[value="rebase"]').click();
    // document.querySelector('.merge-message button[value="merge"]').click();
    observer.disconnect();
  });

  var elem = document.getElementsByClassName("discussion-timeline-actions")[0];
  observer.observe(elem, {
    attributes: true,
    attributeFilter: ["svg"],
    childList: true,
    subtree: true,
  });
  observed = true;
};
