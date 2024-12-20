import { BrowserWindow, App as ElectronApp, WebContentsWillNavigateEventParams, screen, shell } from 'electron';
import { join } from 'path';
import { format } from 'url';
import { environment } from '../environments/environment';
import { rendererAppName, rendererAppPort } from './constants';
import FileLoggerService from './logging/file-logger.service';
import { isRunningOnApple } from './utils/platform';

export default class App {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    static mainWindow: BrowserWindow;
    static application: ElectronApp;
    static BrowserWindow: typeof BrowserWindow;

    public static isDevelopmentMode() {
        const isEnvironmentSet = 'ELECTRON_IS_DEV' in process.env;
        const getFromEnvironment = parseInt(process.env['ELECTRON_IS_DEV'], 10) === 1;

        return isEnvironmentSet ? getFromEnvironment : !environment.production;
    }

    private static async onWindowAllClosed() {
        if (isRunningOnApple()) {
            await FileLoggerService.terminate();
            App.application.quit();
        }
    }

    // This is a normal external redirect, open it in a new browser window
    private static async onRedirect(event: Electron.Event<WebContentsWillNavigateEventParams>, url: string) {
        if (url === App.mainWindow.webContents.getURL()) return;
        event.preventDefault();

        await shell.openExternal(url);
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    private static async onReady() {
        if (!rendererAppName) return;
        App.initMainWindow();
        await App.loadMainWindow();
    }

    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    private static async onActivate() {
        if (App.mainWindow !== null) return;
        await App.onReady();
    }

    private static initMainWindow() {
        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;

        // Create the browser window.
        App.mainWindow = new BrowserWindow({
            width: Math.min(1280, workAreaSize.width || 1280),
            height: Math.min(720, workAreaSize.height || 720),
            show: false,
            webPreferences: {
                contextIsolation: true,
                backgroundThrottling: false,
                preload: join(__dirname, 'main.preload.js'),
            },
        });
        App.mainWindow.setMenu(null);
        App.mainWindow.center();

        // if main window is ready to show, close the splash window and show the main window
        App.mainWindow.once('ready-to-show', () => App.mainWindow.show());

        // Handle all external redirects in a new browser window
        App.mainWindow.webContents.on(
            'will-navigate',
            async (event: Electron.Event<WebContentsWillNavigateEventParams>, url: string) =>
                await App.onRedirect(event, url)
        );

        // Emitted when the window is closed.
        //
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        App.mainWindow.on('closed', () => {
            App.mainWindow = null;
        });
    }

    // Load the index.html of the app.
    private static async loadMainWindow() {
        if (!App.application.isPackaged) {
            await App.mainWindow.loadURL(`http://localhost:${rendererAppPort}`);
        } else {
            await App.mainWindow.loadURL(
                format({
                    pathname: join(__dirname, '../ui/browser/index.html'),
                    protocol: 'file:',
                    slashes: true,
                })
            );
        }
    }

    // We pass the Electron.App object and the Electron.BrowserWindow into this function
    // so this class has no dependencies. This  makes the code easier to write tests for
    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        App.BrowserWindow = browserWindow;
        App.application = app;

        App.application.on('window-all-closed', async () => await App.onWindowAllClosed()); // Quit when all windows are closed.
        App.application.on('ready', async () => await App.onReady()); // App is ready to load data
        App.application.on('activate', () => App.onActivate()); // App is activated
    }
}
