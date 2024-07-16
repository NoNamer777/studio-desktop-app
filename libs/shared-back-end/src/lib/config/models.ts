import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

export const environmentConfiguration = () => ({
    appName: process.env['APP_NAME'],
    port: process.env['PORT'],
});

export const configModuleOptions: ConfigModuleOptions = {
    envFilePath: ['.env'],
    load: [environmentConfiguration],
    isGlobal: true,
};
