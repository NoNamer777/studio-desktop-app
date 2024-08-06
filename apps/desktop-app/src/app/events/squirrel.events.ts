import { spawn } from 'child_process';
import { app } from 'electron';
import { basename, join, resolve } from 'path';
import { environment } from '../../environments/environment';
import { isRunningOnWindows } from '../utils/platform';

/**
 * This module is responsible on handling all the setup events that is submitted by squirrel.
 */
export default class SquirrelEvents {
    private static isAppFirstRun = false;

    // App paths
    private static appFolder = resolve(process.execPath, '..');
    private static appRootFolder = resolve(SquirrelEvents.appFolder, '..');
    private static updateExe = resolve(join(SquirrelEvents.appRootFolder, 'Update.exe'));
    private static exeName = resolve(
        join(SquirrelEvents.appRootFolder, 'app-' + environment.version, basename(process.execPath))
    );

    public static handleEvents() {
        if (process.argv.length === 1 || !isRunningOnWindows()) return false;

        switch (process.argv[1]) {
            case '--squirrel-install':
            case '--squirrel-updated':
                // Install desktop and start menu shortcuts
                SquirrelEvents.update('--createShortcut', SquirrelEvents.exeName);
                return true;

            case '--squirrel-uninstall':
                // Remove desktop and start menu shortcuts
                SquirrelEvents.update('--removeShortcut', SquirrelEvents.exeName);
                return true;

            case '--squirrel-obsolete':
                app.quit();
                return true;

            case '--squirrel-firstrun':
                // Check if it is first run of the application
                SquirrelEvents.isAppFirstRun = true;
                return false;
        }
        return false;
    }

    public static isFirstRun = () => SquirrelEvents.isAppFirstRun;

    private static update(...args: string[]) {
        try {
            spawn(SquirrelEvents.updateExe, args, { detached: true }).on('close', () =>
                setTimeout(() => app.quit(), 1000)
            );
        } catch (error) {
            setTimeout(() => app.quit(), 1000);
        }
    }
}
