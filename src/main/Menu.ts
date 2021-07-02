import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from 'electron';
import contextMenu from 'electron-context-menu';

const isMac = process.platform === 'darwin';
const sharp = require('sharp');

// const macTemplate: MenuItem|null

// template.concat()
const showOpen = () => {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JPEG', extensions: ['jpg', 'jpeg'] }]
    })
    .then(result => {
      if (!result.canceled && result.filePaths) {
        console.log(result);
        result.filePaths.forEach(path => {
          sharp(path).toFile('/tmp/output.jpg', (err: any) => {
            // TODO Create an error logger
            console.log('Error:', err);
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg
          });
        });
      }
    });
};

export default function setupMenu(win: BrowserWindow) {
  console.log('got to setupMenu');
  const template: MenuItemConstructorOptions[] = [];
  if (isMac) {
    template.push({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
  }
  template.push(
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        {
          label: 'Add Images',
          click: showOpen
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
        // ...(isMac
        //   ? [
        //       { role: 'pasteAndMatchStyle' },
        //       { role: 'delete' },
        //       { role: 'selectAll' },
        //       { type: 'separator' },
        //       {
        //         label: 'Speech',
        //         submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
        //       }
        //     ]
        //   : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // // { role: 'windowMenu' }
    // {
    //   label: 'Window',
    //   submenu: [
    //     { role: 'minimize' },
    //     { role: 'zoom' },
    //     ...(isMac
    //       ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
    //       : [{ role: 'close' }])
    //   ]
    // },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://electronjs.org');
          }
        }
      ]
    }
  );

  const menu = Menu.buildFromTemplate(template);

  // let rightClickPosition:any = null
  // const menuItem = new MenuItem({
  //   label: 'Inspect Element',
  //   click: () => {
  //     // @ts-ignore
  //     remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
  //   }
  // })
  // menu.append(menuItem)
  //
  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault()
  //   rightClickPosition = {x: e.x, y: e.y}
  //   // @ts-ignore
  //   menu.popup(remote.getCurrentWindow())
  // }, false)

  contextMenu({
    // Change the labels of the predefined context menu
    // e.g Cut, Copy, Paste
    labels: {
      cut: 'Custom Cut Text',
      copy: 'Custom Copy Text',
      paste: 'Custom Paste Text',
      // save: 'Custom Save Image Text',
      // saveImageAs: 'Custom Save Image As… Text',
      copyLink: 'Custom Copy Link Text',
      copyImageAddress: 'Custom Copy Image Address Text',
      inspect: 'Custom Inspect Element Text'
    }
  });

  Menu.setApplicationMenu(menu);
  console.log('set the menu...');
}
