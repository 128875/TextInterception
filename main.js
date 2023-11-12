const { app, BrowserWindow, ipcMain } = require('electron');
const { log } = require('node:console');
const path = require('node:path')

// 调试渲染进程 ：Ctrl+Shift+I
// 调试主线程 ：chrome://inspect
app.commandLine.appendSwitch('no-sandbox');

const createWindow = ()=>{
    const win = new BrowserWindow({
        // width: 800,
        height: 600,
        // frame: false, // 这将去掉自带的导航栏
        webPreferences:{
            preload: path.join(__dirname,'preload.js')
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()

    // 去除默认的菜单栏
    win.setMenu(null);
}

app.whenReady().then(()=>{
    ipcMain.handle('ping', ()=>'pong')
    createWindow()
    
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows.length === 0)
            createWindow()
    })
})

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

