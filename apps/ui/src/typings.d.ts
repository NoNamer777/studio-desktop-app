import { StudioDesktopAppApi, StudioDesktopAppNamespace } from '@woodwing/studio-desktop-app/data';

// Here we extend the Window object to include the API we created for the Electron app to be able to send events from it
// and to receive data from it.
declare global {
    interface Window {
        [StudioDesktopAppNamespace]: StudioDesktopAppApi;
    }
}

export {};
