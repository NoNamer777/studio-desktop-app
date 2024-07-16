import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'node:path';

export const environmentConfiguration = () => ({
    appName: process.env['APP_NAME'],
    port: process.env['PORT'],
});

export const configModuleOptions: ConfigModuleOptions = {
    envFilePath: ['.env'],
    load: [environmentConfiguration],
    isGlobal: true,
};

export const serveStaticModuleOptions: ServeStaticModuleOptions = {
    rootPath: path.join(__dirname, 'assets'),
};
