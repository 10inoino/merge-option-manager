chrome.storage.local.get('Alertmsg', function (items) {
    alert(items.Alertmsg);
});

const observer = new MutationObserver((mutated) => {
    document.querySelector('.merge-message .select-menu-button').click()
    document.querySelector('.merge-message button[value="merge"]').click()
});
const elem = document.getElementsByClassName('discussion-timeline-actions')[0];

document.addEventListener("DOMContentLoaded", observer.observe(elem, {
    attributes: true,
    attributeFilter: ['svg'],
    childList: true,
    subtree: true
}));