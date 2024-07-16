import { FileHandlingService } from '../file-handling/file-handling.service';

const logFilesFolder = 'logs';
const latestLogFilePath = `${logFilesFolder}/latest.txt`;

export class FileLoggerService {
    private static logs: string[] = [];

    private static initialized = false;

    public static async initialize() {
        try {
            const fileContents = await FileHandlingService.readFile(latestLogFilePath);

            if (fileContents) {
                await FileHandlingService.writeFileString(latestLogFilePath, '');
            }
        } catch (_error) {
            // Ignore errors
        } finally {
            FileLoggerService.initialized = true;
        }
    }

    public static async terminate() {
        const fileContents = await FileHandlingService.readFile(latestLogFilePath);
        const now = new Date()
            .toLocaleString('nl-nl', {
                hourCycle: 'h24',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            .replace(/, /g, '_')
            .replace(/:/g, '-');

        await FileHandlingService.writeFileBuffer(`${logFilesFolder}/${now}.txt`, fileContents);
    }

    public static async log(...args: unknown[]) {
        if (!FileLoggerService.initialized) {
            FileLoggerService.logs.push(`${args.join('')}\n`);
            return;
        }
        if (FileLoggerService.hasLogsCached()) {
            await FileLoggerService.handleCachedLogs();
        }
        await FileHandlingService.appendFileString(latestLogFilePath, `${args.join('')}\n`);
    }

    private static hasLogsCached() {
        return FileLoggerService.logs.length > 0;
    }

    private static async handleCachedLogs() {
        await Promise.all(
            FileLoggerService.logs.map((log) => FileHandlingService.appendFileString(latestLogFilePath, log))
        );
        FileLoggerService.logs = [];
    }
}
