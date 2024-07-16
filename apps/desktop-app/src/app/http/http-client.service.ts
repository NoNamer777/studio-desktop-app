export class HttpClientService {
    public static async getText(url: string) {
        const response = await fetch(url);

        return await response.text();
    }

    public static async getBuffer(url: string) {
        const response = await fetch(url);

        return response.arrayBuffer();
    }
}
