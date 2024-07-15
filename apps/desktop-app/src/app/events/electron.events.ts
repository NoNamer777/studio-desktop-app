/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { EventNames, ServerConfig } from '@woodwing/studio-desktop-app/data';
import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import { ServerSelectionService } from '../server-selection/server-selection.service';

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

ipcMain.handle(EventNames.UPDATE_SELECTED_SERVER, async (_event, serverConfig: ServerConfig) => {
    console.log('Updating selected server...', serverConfig);
    await ServerSelectionService.updateSelectedServer(serverConfig);
});

// Handle App termination
ipcMain.on('quit', (_event, code) => {
    app.exit(code);
});
