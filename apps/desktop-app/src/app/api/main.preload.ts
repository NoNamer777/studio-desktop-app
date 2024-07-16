import {
    EventNames,
    ServerConfig,
    StudioDesktopAppApi,
    StudioDesktopAppNamespace,
} from '@woodwing/studio-desktop-app/data';
import { contextBridge, ipcRenderer } from 'electron';

// Here we set up the API by using the ipcRenderer to process our events.
// The processing of these events are defined in the `../events/electron.events.ts` file
const studioDesktopAppApi: StudioDesktopAppApi = {
    getAppVersion: () => ipcRenderer.invoke(EventNames.GET_APP_VERSION),
    getSelectedServer: () => ipcRenderer.invoke(EventNames.GET_SELECTED_SERVER),
    updateSelectedServer: (serverConfig: ServerConfig) =>
        ipcRenderer.invoke(EventNames.UPDATE_SELECTED_SERVER, serverConfig),
    downloadFile: () => ipcRenderer.invoke(EventNames.DOWNLOAD_FILE),
};

// Here we make our API available for our UI application
contextBridge.exposeInMainWorld(StudioDesktopAppNamespace, studioDesktopAppApi);
