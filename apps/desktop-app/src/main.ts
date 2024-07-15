import { app, BrowserWindow } from 'electron';
import App from './app/app';
import { ConfigService } from './app/config/config.service';
import ElectronEvents from './app/events/electron.events';
import SquirrelEvents from './app/events/squirrel.events';
import { FileHandlingService } from './app/file-handling/file-handling.service';

export default class Main {
    static initialize() {
        if (SquirrelEvents.handleEvents()) {
            // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
            app.quit();
        }
    }

    static async bootstrapApp() {
        App.main(app, BrowserWindow);

        await ConfigService.readConfig();
        await FileHandlingService.initialize();
    }

    static bootstrapAppEvents() {
        ElectronEvents.bootstrapElectronEvents();

        // initialize auto updater service
        if (!App.isDevelopmentMode()) {
            // UpdateEvents.initAutoUpdateService();
        }
    }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();
