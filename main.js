const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional, if you need a preload script
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadURL('http://localhost:9001'); // URL where your React app is running
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
