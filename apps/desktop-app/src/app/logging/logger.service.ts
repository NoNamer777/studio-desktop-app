import { ConsoleLoggerService } from './console-logger.service';
import { FileLoggerService } from './file-logger.service';

export class LoggerService {
    private readonly context: string;

    constructor(context: string) {
        this.context = context;
    }

    public async log(...args: unknown[]) {
        ConsoleLoggerService.log(this.formattedPrefix('INFO'), ...args);
        await FileLoggerService.log(this.formattedPrefix('INFO'), ...args);
    }

    public async error(...args: unknown[]) {
        ConsoleLoggerService.error(this.formattedPrefix('ERROR'), ...args);
        await FileLoggerService.log(this.formattedPrefix('ERROR'), ...args);
    }

    private formattedPrefix(severity: string) {
        return `${new Date().toUTCString()} - ${severity} -\t[${this.context}]: `;
    }
}
