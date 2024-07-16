import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configModuleOptions, RootModule, serveStaticModuleOptions } from '@studio-desktop-app/shared-back-end';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        ServeStaticModule.forRoot(serveStaticModuleOptions),
        RootModule,
    ],
})
export class AppModule {}
