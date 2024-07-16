/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { EventNames, ServerConfig } from '@woodwing/studio-desktop-app/data';
import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import { ConfigService } from '../config/config.service';
import { FileDownloadService } from '../file-handling/file-download.service';
import { ServerSelectionService } from '../server-selection/server-selection.service';

export default class ElectronEvents {
    static bootstrapElectronEvents() {
        return ipcMain;
    }
}

// Retrieve app version
ipcMain.handle(EventNames.GET_APP_VERSION, () => environment.version);

ipcMain.handle(EventNames.GET_SELECTED_SERVER, () => ConfigService.getConfig().selectedServer?.name);

ipcMain.handle(
    EventNames.UPDATE_SELECTED_SERVER,
    async (_event, serverConfig: ServerConfig) => await ServerSelectionService.updateSelectedServer(serverConfig)
);

ipcMain.handle(EventNames.DOWNLOAD_FILE, async () => await FileDownloadService.downloadFile());

// Handle App termination
ipcMain.on('quit', (_event, code) => app.exit(code));
