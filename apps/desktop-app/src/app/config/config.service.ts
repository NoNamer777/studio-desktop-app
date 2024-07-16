import { FileHandlingService } from '../file-handling/file-handling.service';
import { defaultConfig, DesktopAppConfig, DesktopAppConfigSchema } from './models';

export class ConfigService {
    private static config: DesktopAppConfig = defaultConfig;

    public static getConfig = () => ConfigService.config;

    public static async readConfig() {
        try {
            const fileBuffer = await FileHandlingService.readFile('config.json');
            const parsedFileContents: Record<string, unknown> = JSON.parse(fileBuffer.toString());

            ConfigService.config = this.validatedFileContents(parsedFileContents);
        } catch (_error) {
            await FileHandlingService.writeFile('config.json', JSON.stringify(defaultConfig, null, 4));
        }
    }

    public static async saveConfig() {
        const fileContents = JSON.stringify(ConfigService.config, null, 4);
        await FileHandlingService.writeFile('config.json', fileContents);
    }

    private static validatedFileContents = (parsedFileContents: Record<string, unknown>): DesktopAppConfig =>
        DesktopAppConfigSchema.parse(parsedFileContents);
}
