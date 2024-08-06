import { ServerConfig } from '@woodwing/studio-desktop-app/data';
import ConfigService from '../config/config.service';
import FileHandlingService from '../file-handling/file-handling.service';
import HttpClientService from '../http/http-client.service';
import LoggerService from '../logging/logger.service';
import { ServerConfigSchema } from '../validation/server-config';

export default class ServerSelectionService {
    private static readonly loggerService = new LoggerService(this.name);

    public static async initialize() {
        await ServerSelectionService.loggerService.log('Initializing');
        const serverName = ConfigService.getConfig()?.selectedServer?.name;

        if (!serverName) return;
        await FileHandlingService.verifyServerFolderExists(serverName);
    }

    public static async updateSelectedServer(serverConfig: ServerConfig) {
        await ServerSelectionService.loggerService.log('Updating selected server ', serverConfig.name);
        await ServerSelectionService.updateConfig(serverConfig);
        await ServerSelectionService.verifyServerFolderExists(ConfigService.getConfig().selectedServer.name);
        await HttpClientService.getText(serverConfig.url);
    }

    private static async updateConfig(serverConfig: ServerConfig) {
        ConfigService.getConfig().selectedServer = ServerConfigSchema.parse(serverConfig);
        await ConfigService.saveConfig();
    }

    private static async verifyServerFolderExists(serverName: string) {
        await ServerSelectionService.loggerService.log(`Validate server folder exists '/servers/${serverName}'`);
        await FileHandlingService.verifyServerFolderExists(serverName);
    }
}
