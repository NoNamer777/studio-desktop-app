import * as fs from 'node:fs';
import { ConfigService } from '../config/config.service';

export class FileHandlingService {
    public static async initialize() {
        console.log('initializing file system');
        await this.setupAppRootFolder();
    }

    public static async writeFileString(path: string, contents: string) {
        console.log('Writing file at path:', path);
        path = `${this.appRootFolder}/${path}`;

        if (!(await FileHandlingService.folderExists(path.substring(0, path.lastIndexOf('/'))))) {
            await FileHandlingService.createFolder(path.substring(0, path.lastIndexOf('/')));
        }
        await fs.promises.writeFile(path, contents);
    }

    public static async writeFileBuffer(path: string, buffer: ArrayBuffer) {
        console.log('Writing file at path:', path);
        path = `${this.appRootFolder}/${path}`;

        if (!(await FileHandlingService.folderExists(path.substring(0, path.lastIndexOf('/'))))) {
            await FileHandlingService.createFolder(path.substring(0, path.lastIndexOf('/')));
        }
        await fs.promises.writeFile(path, Buffer.from(buffer));
    }

    public static async readFile(path: string) {
        console.log('Reading file at path:', path);
        return await fs.promises.readFile(`${this.appRootFolder}/${path}`);
    }

    public static async verifyServerFolderExists(serverName: string) {
        const serverFolderPath = `${FileHandlingService.appRootFolder}/servers/${serverName}`;

        if (await FileHandlingService.folderExists(serverFolderPath)) return;
        await FileHandlingService.createFolder(serverFolderPath);
    }

    public static async removeFile(path: string) {
        console.log('Removing file at path', path);
        return await fs.promises.rm(`${this.appRootFolder}/${path}`);
    }

    private static async createFolder(path: string) {
        await fs.promises.mkdir(path, { recursive: true });
    }

    private static async setupAppRootFolder() {
        if (await FileHandlingService.folderExists(FileHandlingService.appRootFolder)) return;
        console.log('Creating app root folder');

        await FileHandlingService.createFolder(FileHandlingService.appRootFolder);
    }

    private static async folderExists(path: string) {
        try {
            await fs.promises.access(path);
            return true;
        } catch (_error) {
            return false;
        }
    }

    private static get appRootFolder() {
        return ConfigService.getConfig().appRootFolder;
    }
}
