import glob from 'fast-glob';
import { copyFile, mkdir, readFile, rm, stat, writeFile } from 'fs/promises';
import { basename, join, resolve } from 'path';
import { cwd } from 'process';
import { parse, stringify } from 'yaml';

interface FileInfo {
    url: string;
    sha512: string;
    size: number;
    arch?: string;
}

interface UpdateInfo {
    version: string;
    releaseDate: string;
    files: FileInfo[];
    path?: string;
    sha512?: string;
}

const baseDirPath = resolve(cwd(), 'dist', 'executables');
const packageDirectories = ['x64', 'arm64'];
const filesFilter = ['latest*.yml', '*.dmg', '*.exe', '*.zip', '*.blockmap'];

const outputPath = resolve(cwd(), 'dist', 'executables', '_release');

async function resolveFilePaths() {
    console.log('Resolving paths of files to get');

    const filePaths = packageDirectories
        .map((directoryName) => filesFilter.map((filter) => join(baseDirPath, directoryName, filter)))
        .flat();

    return await glob(filePaths);
}

async function copyFilesToReleaseDirectory(filePaths: string[]) {
    console.log('Copying installers, packages, and configurations to "_release" directory');

    try {
        await stat(outputPath);
        await rm(outputPath, { recursive: true, force: true });
    } catch {
        // Ignore errors when the `release` directory doesn't exist yet.
    } finally {
        await mkdir(outputPath);
    }
    await Promise.all(filePaths.map((filePath) => copyFile(filePath, join(outputPath, basename(filePath)))));
}

async function readConfigurationFiles(filePath: string) {
    const fileContents = await readFile(filePath, { encoding: 'utf8' });
    return parse(fileContents) as UpdateInfo;
}

async function getMacConfigurationFiles(filePaths: string[]) {
    console.log('Reading "latest-mac.yml" configuration files into memory');

    filePaths = filePaths.filter((filePath) => filePath.endsWith('latest-mac.yml'));

    return await Promise.all(filePaths.map((filePath) => readConfigurationFiles(filePath)));
}

function mergeLatestMacConfigurations(configurations: UpdateInfo[]) {
    console.log('Merging "latest-mac.yml" configuration files');

    const mergedConfigurationFile: UpdateInfo = {
        version: configurations[0].version,
        releaseDate: configurations[0].releaseDate,
        files: [...configurations.map(({ files }) => files).flat()],
    };

    mergedConfigurationFile.files = mergedConfigurationFile.files.map((fileInfo) => ({
        ...fileInfo,
        arch: fileInfo.url.includes('arm64') ? 'arm64' : 'x64',
    }));

    return mergedConfigurationFile;
}

async function createMergedLatestMacConfig(config: UpdateInfo) {
    console.log('Writing merged "latest-mac.yml" to disk');

    await writeFile(join(outputPath, 'latest-mac.yml'), stringify(config), { encoding: 'utf8' });
}

async function prepareReleasePackage() {
    console.log('Preparing release package...');

    let filePaths = await resolveFilePaths();
    await copyFilesToReleaseDirectory(filePaths);

    const configurationFiles = await getMacConfigurationFiles(filePaths);
    const mergedConfigurationFile = mergeLatestMacConfigurations(configurationFiles);

    await createMergedLatestMacConfig(mergedConfigurationFile);
}

(async () => {
    try {
        await prepareReleasePackage();

        console.log('Release package successfully prepared.');
    } catch (error) {
        console.error('Something unexpected happened while preparing the release package.');
        throw error;
    }
})();
