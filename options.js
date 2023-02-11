function Save() {
  var message = document.getElementById("input_message").value;
  chrome.storage.local.set({ Alertmsg: message }, function () {});
}

function Load() {
  chrome.storage.local.get("Alertmsg", function (items) {
    document.getElementById("input_message").value = items.Alertmsg;
  });
}

document.addEventListener("DOMContentLoaded", Load);

document.getElementById("save_button").addEventListener("click", Save);
