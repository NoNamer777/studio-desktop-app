import { app, autoUpdater, dialog } from 'electron';
import { arch, platform } from 'os';
import App from '../app';
import { updateServerUrl } from '../constants';
import { isRunningOnWindows } from '../utils/platform';

export default class UpdateEvents {
    // Initialize auto update service - most be invoked only in production
    public static initAutoUpdateService() {
        const platformAndArch = isRunningOnWindows() ? platform() : `${platform()}_${arch()}`;

        if (!App.isDevelopmentMode()) {
            console.log('Initializing auto update service...\n');

            autoUpdater.setFeedURL({
                url: `${updateServerUrl}/update/${platformAndArch}/${app.getVersion()}`,
            });
            UpdateEvents.checkForUpdates();
        }
    }

    // Check for updates - most be invoked after initAutoUpdateService() and only in production
    public static checkForUpdates() {
        if (App.isDevelopmentMode() || autoUpdater.getFeedURL() === '') return;
        autoUpdater.checkForUpdates();
    }
}

autoUpdater.on('update-downloaded', async (_event, releaseNotes, releaseName) => {
    const returnValue = await dialog.showMessageBox({
        type: 'info' as const,
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: isRunningOnWindows() ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.',
    });

    if (returnValue.response === 0) {
        autoUpdater.quitAndInstall();
    }
});

autoUpdater.on('checking-for-update', () => console.log('Checking for updates...\n'));

autoUpdater.on('update-available', () => console.log('New update available!\n'));

autoUpdater.on('update-not-available', () => console.log('Up to date!\n'));

autoUpdater.on('before-quit-for-update', () => console.log('Application update is about to begin...\n'));

autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application');
    console.error(message, '\n');
});
