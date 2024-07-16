import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('')
export class RootController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    public async getRoot() {
        return `Hello from ${this.configService.get<string>('appName')}`;
    }
}
