import * as fs from 'node:fs';
import * as os from 'node:os';

const appFilesRoot = 'Documents/studio-desktop-app';

export class FileHandlingService {
    public static async initialize() {
        console.log('initializing file system');
        await this.setupAppRootFolder();
    }

    public static async writeFile(path: string, contents: string) {
        console.log('Writing file at path:', path);
        await fs.promises.writeFile(`${this.appRootDirectory}/${path}`, contents);
    }

    public static async readFile(path: string) {
        console.log('Reading file at path:', path);
        return await fs.promises.readFile(`${this.appRootDirectory}/${path}`);
    }

    public static async removeFile(path: string) {
        console.log('Removing file at path', path);
        return await fs.promises.rm(`${this.appRootDirectory}/${path}`);
    }

    private static async setupAppRootFolder() {
        if (await this.checkAppRootFolderExists()) return;
        console.log('Creating app root folder');

        await fs.promises.mkdir(this.appRootDirectory);
    }

    private static async checkAppRootFolderExists() {
        console.log('Verifying App root folder exists');
        try {
            await fs.promises.access(this.appRootDirectory);
            return true;
        } catch (_error) {
            console.error('App root folder does not exist');
            return false;
        }
    }

    private static get appRootDirectory() {
        return `${os.homedir()}/${appFilesRoot}/`;
    }
}
