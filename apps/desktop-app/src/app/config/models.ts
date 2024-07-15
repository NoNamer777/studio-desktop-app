import * as os from 'node:os';
import { z } from 'zod';
import { ServerConfigSchema } from '../validation/server-config';

export const DesktopAppConfigSchema = z.object({
    appRootFolder: z.string(),
    selectedServer: ServerConfigSchema.optional(),
});

export type DesktopAppConfig = z.infer<typeof DesktopAppConfigSchema>;

export const defaultConfig: DesktopAppConfig = {
    appRootFolder: `${os.homedir()}/Documents/studio-desktop-app`,
} as const;
