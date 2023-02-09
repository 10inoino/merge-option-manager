let changed = false
const observer = new MutationObserver((mutated) => {
    if (!changed) {
        document.querySelector('.merge-message .select-menu-button').click()
        document.querySelector('.merge-message button[value="merge"]').click()
        changed = true
    }
});
const elem = document.getElementsByClassName('discussion-timeline-actions')[0];

document.addEventListener("DOMContentLoaded", observer.observe(elem, {
    attributes: true,
    attributeFilter: ['svg'],
    childList: true,
    subtree: true
}));