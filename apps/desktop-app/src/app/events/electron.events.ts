/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { EventNames } from '@woodwing/studio-desktop-app/data';
import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';

export default class ElectronEvents {
    static bootstrapElectronEvents() {
        return ipcMain;
    }
}

// Retrieve app version
ipcMain.handle(EventNames.GET_APP_VERSION, () => {
    console.log(`Fetching application version... [v${environment.version}]`);
    return environment.version;
});

// Handle App termination
ipcMain.on('quit', (_event, code) => {
    app.exit(code);
});
