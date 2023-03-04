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
  const changedBranch = document.querySelectorAll(
    'div#partial-discussion-header span.commit-ref.user-select-contain'
  )!;
  const tmp1 = changedBranch[1].getAttribute('title')?.split(':');
  const tmp2 = tmp1![0].split('/');
  const owner = tmp2[0];
  const repo = tmp2[1];
  const branch = tmp1![1];

  type mergeOption = 'MERGE' | 'SQUASH' | 'REBASE' | 'NONE';
  type mergeOptionSetting = {
    order: number;
    owner: string;
    repo: string;
    branch: string;
    mergeOption: mergeOption;
  };
  let mergeOptionSettings: mergeOptionSetting[] = [];
  let targetMergeOption: mergeOption = 'NONE';

  chrome.storage.sync.get(['mergeOptionSettings'], (result) => {
    if (result.mergeOptionSettings && result.mergeOptionSettings.length > 0) {
      mergeOptionSettings = result.mergeOptionSettings;
      mergeOptionSettings
        .sort((a, b) => a.order - b.order)
        .forEach((s) => {
          if (
            RegExp(s.repo.replace(/\*/g, '.*')).test(repo) &&
            RegExp(s.owner.replace(/\*/g, '.*')).test(owner) &&
            RegExp(s.branch.replace(/\*/g, '.*')).test(branch)
          ) {
            targetMergeOption = s.mergeOption;
          }
        });
    }
  });

  var observer = new MutationObserver(() => {
    if (targetMergeOption !== 'NONE') {
      const selectButton = document.querySelector(
        '.merge-message .select-menu-button'
      ) as HTMLElement;

      let mergeOption: HTMLElement;
      switch (targetMergeOption) {
        case 'MERGE':
          mergeOption = document.querySelector(
            '.merge-message button[value="merge"]'
          ) as HTMLElement;
          break;
        case 'SQUASH':
          mergeOption = document.querySelector(
            '.merge-message button[value="squash"]'
          ) as HTMLElement;
          break;
        case 'REBASE':
          mergeOption = document.querySelector(
            '.merge-message button[value="rebase"]'
          ) as HTMLElement;
          break;
        default:
          console.log('Error: targetMergeOption is not MERGE, SQUASH or REBASE');
      }
      selectButton.click();
      mergeOption!.click();
    }
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
