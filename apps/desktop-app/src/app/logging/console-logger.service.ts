export class ConsoleLoggerService {
    public static log(...args: unknown[]) {
        console.log(...args);
    }

    public static error(...args: unknown[]) {
        console.error(...args);
    }
}
