import { EventNames, StudioDesktopAppApi, StudioDesktopAppNamespace } from '@woodwing/studio-desktop-app/data';
import { contextBridge, ipcRenderer } from 'electron';

const studioDesktopAppApi: StudioDesktopAppApi = {
    getAppVersion: () => ipcRenderer.invoke(EventNames.GET_APP_VERSION),
};

contextBridge.exposeInMainWorld(StudioDesktopAppNamespace, studioDesktopAppApi);
