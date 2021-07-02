import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import setupMenu from './Menu';

let win: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      // Need to disable web security to show local files using webpack (dev builds)
      webSecurity: process.env.NODE_ENV !== 'development'
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });

  setupMenu(win);
};

function setupPopupWindows(browserWindow: BrowserWindow) {
  browserWindow.webContents.on(
    'new-window',
    (event, eventUrl, frameName, disposition, options, additionalFeatures) => {
      // This is the name we chose for our window. You can have multiple names for
      // multiple windows and each have their options
      if (frameName === 'ImageConverterConfig') {
        event.preventDefault();
        Object.assign(options, {
          // This will prevent interactions with the mainWindow
          parent: browserWindow,
          width: 300,
          height: 300
          // You can also set `left` and `top` positions
        });
          // eslint-disable-next-line no-param-reassign
        event.newGuest = new BrowserWindow(options);
      }
    }
  );
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
