import { platform } from 'os';

export const isRunningOnWindows = () => platform() === 'win32';

export const isRunningOnApple = () => platform() === 'darwin';
