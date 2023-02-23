chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  const regex = /^https:\/\/github\.com\/.+\/.+\/pull\/\d+$/g;
  if (info.status === 'complete' && regex.test(tab.url!)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: TmpchangeMergeOpriion,
    });
  }
});

const TmpchangeMergeOpriion = () => {
  var observer = new MutationObserver(() => {
    const selectButton = document.querySelector('.merge-message .select-menu-button') as HTMLElement
    const mergeOption = document.querySelector('.merge-message button[value="squash"]') as HTMLElement
    // const mergeOption = document.querySelector('.merge-message button[value="rebase"]') as HTMLElement
    // const mergeOption = document.querySelector('.merge-message button[value="merge"]') as HTMLElement
    selectButton.click()
    mergeOption.click()
    observer.disconnect();
  });

  var elem = document.getElementsByClassName('discussion-timeline-actions')[0];
  observer.observe(elem, {
    attributes: true,
    attributeFilter: ['svg'],
    childList: true,
    subtree: true,
  });
};
