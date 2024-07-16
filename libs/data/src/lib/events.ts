import { ServerConfig } from './server-config';

// The name of the attribute from which the API of the Electron App will be available from in the `Window` object.
export const StudioDesktopAppNamespace = 'studioDesktopApp';

// Here we define the events that can be sent to the Electron App
export const EventNames = {
    GET_APP_VERSION: 'get-app-version',
    GET_SELECTED_SERVER: 'get-selected-server',
    UPDATE_SELECTED_SERVER: 'update-selected-server',
    DOWNLOAD_FILE: 'download-file',
} as const;

// Here we define what the types are of the events
export interface StudioDesktopAppApi {
    getAppVersion: () => Promise<string>;
    getSelectedServer: () => Promise<string>;
    updateSelectedServer: (serverConfig: ServerConfig) => Promise<void>;
    downloadFile: () => Promise<void>;
}
