import { ServerConfig } from './server-config';

export const StudioDesktopAppNamespace = 'studioDesktopApp';

export interface StudioDesktopAppApi {
    getAppVersion: () => Promise<string>;
    getSelectedServer: () => Promise<string>;
    updateSelectedServer: (serverConfig: ServerConfig) => Promise<void>;
}

export const EventNames = {
    GET_APP_VERSION: 'get-app-version',
    GET_SELECTED_SERVER: 'get-selected-server',
    UPDATE_SELECTED_SERVER: 'update-selected-server',
} as const;

export type EventName = (typeof EventNames)[keyof typeof EventNames];