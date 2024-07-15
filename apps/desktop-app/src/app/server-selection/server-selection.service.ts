import { ServerConfig } from '@woodwing/studio-desktop-app/data';
import { ConfigService } from '../config/config.service';
import { FileHandlingService } from '../file-handling/file-handling.service';
import { ServerConfigSchema } from '../validation/server-config';

export class ServerSelectionService {
    public static async initialize() {
        const serverName = ConfigService.getConfig().selectedServer.name;

        if (!serverName) return;
        await FileHandlingService.verifyServerFolderExists(serverName);
    }

    public static async updateSelectedServer(serverConfig: ServerConfig) {
        await ServerSelectionService.updateConfig(serverConfig);
        await ServerSelectionService.verifyServerFolderExists(ConfigService.getConfig().selectedServer.name);

        // TODO: Attempt to establish connection with the server
    }

    private static async updateConfig(serverConfig: ServerConfig) {
        ConfigService.getConfig().selectedServer = ServerConfigSchema.parse(serverConfig);
        await ConfigService.saveConfig();
    }

    private static async verifyServerFolderExists(serverName: string) {
        await FileHandlingService.verifyServerFolderExists(serverName);
    }
}
