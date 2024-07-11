export const StudioDesktopAppNamespace = 'studioDesktopApp';

export interface StudioDesktopAppApi {
    getAppVersion: () => Promise<string>;
}

export const EventNames = {
    GET_APP_VERSION: 'get-app-version',
} as const;

export type EventName = (typeof EventNames)[keyof typeof EventNames];
