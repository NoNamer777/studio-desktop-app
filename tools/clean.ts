import glob from 'fast-glob';
import { rm } from 'fs/promises';

let paths = ['.angular', '.nx', 'dist', 'coverage', 'node_modules', 'reports'];

async function clean() {
    paths = await glob(paths, { onlyDirectories: true, unique: true });

    await Promise.all(paths.map((path) => rm(path, { force: true, recursive: true })));
}

(async () => {
    try {
        await clean();
    } catch (error) {
        console.error('Something went wrong', error);
    }
})();
