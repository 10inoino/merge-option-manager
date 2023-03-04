chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    var regex = /^https:\/\/github\.com\/.+\/.+\/pull\/\d+$/g;
    if (info.status === 'complete' && regex.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: TmpchangeMergeOpriion
        });
    }
});
var TmpchangeMergeOpriion = function () {
    var _a;
    var changedBranch = document.querySelectorAll('div#partial-discussion-header span.commit-ref.user-select-contain');
    var tmp1 = (_a = changedBranch[1].getAttribute('title')) === null || _a === void 0 ? void 0 : _a.split(':');
    var tmp2 = tmp1[0].split('/');
    var owner = tmp2[0];
    var repo = tmp2[1];
    var branch = tmp1[1];
    var mergeOptionSettings = [];
    var targetMergeOption = 'NONE';
    chrome.storage.sync.get(['mergeOptionSettings'], function (result) {
        if (result.mergeOptionSettings && result.mergeOptionSettings.length > 0) {
            mergeOptionSettings = result.mergeOptionSettings;
            mergeOptionSettings
                .sort(function (a, b) { return a.order - b.order; })
                .forEach(function (s) {
                if (RegExp(s.repo.replace(/\*/g, '.*')).test(repo) &&
                    RegExp(s.owner.replace(/\*/g, '.*')).test(owner) &&
                    RegExp(s.branch.replace(/\*/g, '.*')).test(branch)) {
                    targetMergeOption = s.mergeOption;
                }
            });
        }
    });
    var observer = new MutationObserver(function () {
        if (targetMergeOption !== 'NONE') {
            var selectButton = document.querySelector('.merge-message .select-menu-button');
            var mergeOption = void 0;
            switch (targetMergeOption) {
                case 'MERGE':
                    mergeOption = document.querySelector('.merge-message button[value="merge"]');
                    break;
                case 'SQUASH':
                    mergeOption = document.querySelector('.merge-message button[value="squash"]');
                    break;
                case 'REBASE':
                    mergeOption = document.querySelector('.merge-message button[value="rebase"]');
                    break;
                default:
                    console.log('Error: targetMergeOption is not MERGE, SQUASH or REBASE');
            }
            selectButton.click();
            mergeOption.click();
        }
        observer.disconnect();
    });
    var elem = document.getElementsByClassName('discussion-timeline-actions')[0];
    observer.observe(elem, {
        attributes: true,
        attributeFilter: ['svg'],
        childList: true,
        subtree: true
    });
};
