/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const port = configService.get<number>('port', 8100);

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
