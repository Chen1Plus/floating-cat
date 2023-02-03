const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on("pin_picture", (event, args) => {
    let current_drag_setting = window
      .getComputedStyle(document.body)
      .getPropertyValue("-webkit-app-region");

    if (current_drag_setting == "drag") {
      document.body.style = "-webkit-app-region: no-drag;";
    } else {
      document.body.style = "-webkit-app-region: drag;";
    }
  });
});
