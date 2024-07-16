import { FileHandlingService } from '../file-handling/file-handling.service';
import { LoggerService } from '../logging/logger.service';
import { defaultConfig, DesktopAppConfig, DesktopAppConfigSchema } from './models';

export class ConfigService {
    private static readonly logger = new LoggerService(this.name);

    private static config: DesktopAppConfig = defaultConfig;

    public static getConfig = () => ConfigService.config;

    public static async readConfig() {
        await ConfigService.logger.log('Reading configuration file');

        try {
            const fileBuffer = await FileHandlingService.readFile('config.json');
            const parsedFileContents: Record<string, unknown> = JSON.parse(fileBuffer.toString());

            ConfigService.config = this.validatedFileContents(parsedFileContents);
        } catch (_error) {
            await FileHandlingService.writeFileString('config.json', JSON.stringify(defaultConfig, null, 4));
        }
    }

    public static async saveConfig() {
        await ConfigService.logger.log('Updating configuration file');

        const fileContents = JSON.stringify(ConfigService.config, null, 4);
        await FileHandlingService.writeFileString('config.json', fileContents);
    }

    private static validatedFileContents = (parsedFileContents: Record<string, unknown>): DesktopAppConfig =>
        DesktopAppConfigSchema.parse(parsedFileContents);
}
