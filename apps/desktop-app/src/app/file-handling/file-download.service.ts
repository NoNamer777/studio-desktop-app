import ConfigService from '../config/config.service';
import HttpClientService from '../http/http-client.service';
import LoggerService from '../logging/logger.service';
import FileHandlingService from './file-handling.service';

export default class FileDownloadService {
    private static readonly logger = new LoggerService(this.name);

    public static async downloadFile() {
        await FileDownloadService.logger.log('Downloading file');
        const serverConfig = ConfigService.getConfig().selectedServer;

        if (!serverConfig) return;
        const fileBuffer = await HttpClientService.getBuffer(`${serverConfig.url}/images/file.jpeg`);

        await FileHandlingService.writeFileBuffer(`servers/${serverConfig.name}/images/file.jpeg`, fileBuffer);
    }
}
