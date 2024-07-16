import { Injectable } from '@angular/core';
import { ServerConfig } from '@woodwing/studio-desktop-app/data';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerSelectService {
    getSelectedServer() {
        return from(window.studioDesktopApp.getSelectedServer());
    }

    updateSelectedServer(serverConfig: ServerConfig) {
        return from(window.studioDesktopApp.updateSelectedServer(serverConfig));
    }

    downloadFileFromServer() {
        return from(window.studioDesktopApp.downloadFile());
    }
}
