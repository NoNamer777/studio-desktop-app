import {
    EventNames,
    ServerConfig,
    StudioDesktopAppApi,
    StudioDesktopAppNamespace,
} from '@woodwing/studio-desktop-app/data';
import { contextBridge, ipcRenderer } from 'electron';

const studioDesktopAppApi: StudioDesktopAppApi = {
    getAppVersion: () => ipcRenderer.invoke(EventNames.GET_APP_VERSION),
    getSelectedServer: () => ipcRenderer.invoke(EventNames.GET_SELECTED_SERVER),
    updateSelectedServer: (serverConfig: ServerConfig) =>
        ipcRenderer.invoke(EventNames.UPDATE_SELECTED_SERVER, serverConfig),
    downloadFile: () => ipcRenderer.invoke(EventNames.DOWNLOAD_FILE),
};

contextBridge.exposeInMainWorld(StudioDesktopAppNamespace, studioDesktopAppApi);
