import * as fs from 'node:fs';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logging/logger.service';

export class FileHandlingService {
    private static readonly logger = new LoggerService(FileHandlingService.name);

    public static async initialize() {
        await FileHandlingService.logger.log('Initializing');
        await this.setupAppRootFolder();
    }

    public static async writeFileString(path: string, contents: string) {
        path = `${this.appRootFolder}/${path}`;

        if (!(await FileHandlingService.folderExists(path.substring(0, path.lastIndexOf('/'))))) {
            await FileHandlingService.createFolder(path.substring(0, path.lastIndexOf('/')));
        }
        await fs.promises.writeFile(path, contents);
    }

    public static async appendFileString(path: string, contents: string) {
        path = `${this.appRootFolder}/${path}`;

        if (!(await FileHandlingService.folderExists(path.substring(0, path.lastIndexOf('/'))))) {
            await FileHandlingService.createFolder(path.substring(0, path.lastIndexOf('/')));
        }
        await fs.promises.appendFile(path, contents);
    }

    public static async writeFileBuffer(path: string, buffer: ArrayBuffer) {
        path = `${this.appRootFolder}/${path}`;

        if (!(await FileHandlingService.folderExists(path.substring(0, path.lastIndexOf('/'))))) {
            await FileHandlingService.createFolder(path.substring(0, path.lastIndexOf('/')));
        }
        await fs.promises.writeFile(path, Buffer.from(buffer));
    }

    public static async readFile(path: string) {
        return await fs.promises.readFile(`${this.appRootFolder}/${path}`);
    }

    public static async verifyServerFolderExists(serverName: string) {
        const serverFolderPath = `${FileHandlingService.appRootFolder}/servers/${serverName}`;

        if (await FileHandlingService.folderExists(serverFolderPath)) return;
        await FileHandlingService.createFolder(serverFolderPath);
    }

    public static async removeFile(path: string) {
        return await fs.promises.rm(`${this.appRootFolder}/${path}`);
    }

    private static async createFolder(path: string) {
        await fs.promises.mkdir(path, { recursive: true });
    }

    private static async setupAppRootFolder() {
        if (await FileHandlingService.folderExists(FileHandlingService.appRootFolder)) return;
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
