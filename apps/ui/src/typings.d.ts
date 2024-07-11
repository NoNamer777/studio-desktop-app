import { StudioDesktopAppApi, StudioDesktopAppNamespace } from '@woodwing/studio-desktop-app/data';

declare global {
    interface Window {
        [StudioDesktopAppNamespace]: StudioDesktopAppApi;
    }
}

export {};
