chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    console.log(tab)
    if (info.status === 'complete' && tab.url.indexOf('https://github.com/') !== -1) {
      chrome.tabs.executeScript(null, { file: './contentScript.js' }, () => {});
    }
});

// chrome.storage.local.get('Alertmsg', function (items) {
//     alert(items.Alertmsg);
// });

// let changed = false
// const observer = new MutationObserver((mutated) => {
//     if (!changed) {
//         document.querySelector('.merge-message .select-menu-button').click()
//         document.querySelector('.merge-message button[value="merge"]').click()
//         changed = true
//     }
// });
// const elem = document.getElementsByClassName('discussion-timeline-actions')[0];

// document.addEventListener("DOMContentLoaded", observer.observe(elem, {
//     attributes: true,
//     attributeFilter: ['svg'],
//     childList: true,
//     subtree: true
// }));