import LoggerService from '../logging/logger.service';

export default class HttpClientService {
    private static readonly logger = new LoggerService(this.name);

    public static async getText(url: string) {
        await HttpClientService.logger.log('Verifying server existence ', url);
        const response = await fetch(url);

        return await response.text();
    }

    public static async getBuffer(url: string) {
        await HttpClientService.logger.log('Fetching file from server ', url);
        const response = await fetch(url);

        return response.arrayBuffer();
    }
}
