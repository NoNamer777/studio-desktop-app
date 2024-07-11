import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, RootComponent } from './app';

async function main() {
    try {
        await bootstrapApplication(RootComponent, appConfig);
    } catch (error) {
        console.error(error);
    }
}

main();
