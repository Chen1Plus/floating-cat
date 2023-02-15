const { app, BrowserWindow, globalShortcut, webContents } = require("electron");
const path = require("path");
const is_mac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

if (is_mac) {
  app.dock.hide();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 150,
    height: 150,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    resizable: false,
  });

  mainWindow.setAlwaysOnTop(true, "screen-saver");
  mainWindow.setVisibleOnAllWorkspaces(true);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (is_mac) {
    globalShortcut.register("Command+Option+P", () => {
      mainWindow.webContents.send("pin_picture");
    });
  } else {
    globalShortcut.register("Control+Alt+P", () => {
      mainWindow.webContents.send("pin_picture");
    });
  }
};

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!is_mac) {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
