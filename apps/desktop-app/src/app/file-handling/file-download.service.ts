import { ConfigService } from '../config/config.service';
import { HttpClientService } from '../http/http-client.service';
import { FileHandlingService } from './file-handling.service';

export class FileDownloadService {
    public static async downloadFile() {
        const serverConfig = ConfigService.getConfig().selectedServer;

        if (!serverConfig) return;
        const fileBuffer = await HttpClientService.getBuffer(`${serverConfig.url}/images/file.jpeg`);

        await FileHandlingService.writeFileBuffer(`servers/${serverConfig.name}/images/file.jpeg`, fileBuffer);
    }
}
