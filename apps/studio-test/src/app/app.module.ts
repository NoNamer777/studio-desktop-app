import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions, RootModule } from '@studio-desktop-app/shared-back-end';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), RootModule],
})
export class AppModule {}
