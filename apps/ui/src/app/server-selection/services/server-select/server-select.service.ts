import { Injectable } from '@angular/core';
import { ServerConfig } from '@woodwing/studio-desktop-app/data';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerSelectService {
    getSelectedServer() {
        // Here are some examples of how the API we've defined for the Electron app is consumed.
        // Since the API exposes promises, we wrap the in `from` to convert them to observables.
        // This needs to be done since Observables are from Rxjs which we can't use in the API (ContextBridge)
        // since it's an external node module.
        // Converting them to observables allows us to keep working in familiar ways and applying best practices.
        return from(window.studioDesktopApp.getSelectedServer());
    }

    updateSelectedServer(serverConfig: ServerConfig) {
        return from(window.studioDesktopApp.updateSelectedServer(serverConfig));
    }

    downloadFileFromServer() {
        return from(window.studioDesktopApp.downloadFile());
    }
}
