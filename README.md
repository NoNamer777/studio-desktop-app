# Studio Desktop App

This [Nx](https://nx.dev/) v18.5 mono-repo holds a prototype Electron-Angular desktop app.

It used [Angular](https://angular.dev/) v17.3 for the UI and [Electron](https://www.electronjs.org/) v31.2 for the desktop Node environment which runs on Node v20. The main programming language is [TypeScript](https://www.typescriptlang.org/docs/) v5.4.

In order to quickly get some UI going, [Bootstrap](https://getbootstrap.com/) v5.3 was used, but that should be replaced using our own UI library.

Besides the Angular and Electron applications, a couple [NestJs](https://nestjs.com/) applications are used to mock back-end servers to download files from. Each of these mock servers expose the root route where a `hello` text response is returned. They also expose a static file, which is downloaded by the Electron app upon interaction of the User.

## Nx-electron

The Electron application is build with the [nx-electron](https://github.com/bennymeg/nx-electron) plugin. This plugin is not up-to-date yet with the latest version of Nx. Because of this, the versions of Nx and Angular are also restricted.

## Getting started

To get things started, as per usual, install the dependencies by running the following command:

```bash
npm install
```

After that you can start the mock back-end applications by running the following commands:

```bash
npx nx serve studio-test
```

```bash
npx nx serve studio-dev
```

```bash
npx nx serve production
```

After that you can get the desktop application started by running the following commands:

```bash
npx nx serve ui
```

```bash
npx nx serve desktop-app
```

If you get an `ERR_CONNECTION_REFUSED` error message while serving the desktop-app, it means that the desktop-app was served before the ui app was ready receive connections. Wait until the ui app has finished building and is served. After that, reload the desktop-app by either re-running the serve command or pressing <kbd>⌘ COMMAND</kbd> + <kbd>R</kbd> on Mac or <kbd>F5</kbd> on Windows while having the window of the desktop-app focused.

## How does it work?

I've left some comments throughout the repository to give some more insight on why I did some things in a certain way, but you can find a global overview below.

At this point, you should have a running desktop-app. Choose your "server" to connect to and when able press the "Download" button. At that point a couple of things happen:

1. **A signal is sent from the Angular app to the Electron app.**  
   The signal is sent through the contextBridge of Electron. The contextBridge defines an API of events which Electron can send or act upon when they are received. This API is preloaded into the Angular environment when the desktop-app is initialized. Typings for this API are defined in the `data` library. Important to note is that Electron is configured in sandbox mode with context isolation enabled. This disallows us from using external dependencies. Hence, why the data validation is done on the Electron side after the data has passed the contextBridge. TypeScript in the Angular application is made aware of this API by the `typings.d.ts` file. There, the `globalThis`/`Window` object is extended to include the API that we've defined and allowing us to use it throughout the Angular application.
2. The Electron app fetches a file from the selected server.
3. The fetched file is stored in the local file system on the machine.

"Where is my file?" you might ask. When selecting a server to connect, to your selection is saved in a configuration file, which is also stored in your file system on your machine. Upon initialization of the desktop-app this configuration is retrieved so that the previously selected server is pre-selected (when applicable).
Files for the desktop-app are by default stored in the following locations, depending on your operating system:

-   Windows `%USERPROFILE%\studio-desktop-app`
-   Mac `~/studio-desktop-app`

The configuration file will be stored in the root of the application files folder in JSON format.

Within the application folder, you'll find a `logs/` folder where logs can be found which were used for debugging purposes.

For each available server, a sub-folder will be created. This means that in this prototype, files that are downloaded from the servers into a seperate folders on a per-server basis, which would result in the following directoty structure for this application:

```
- studio-desktop-app/
  - config.json
  - logs/
    - latest.txt
    - 16-07-2024_15-34_20.txt
  - servers/
      - production/
          - images/
              - file.jpeg
      - studio-dev/
          - images/
              - file.jpeg
      - studio-test/
          - images/
              - file.jpeg
```

So to answer the question asked earlier: "Where is my file that I downloaded?", it is located in the server folder which corresponds to the server that you've selected.

## Packaging

To create an executable for the desktop-app you need to create code bundles of the desktop-app and the ui applications first. This can be done be running the following command:

```bash
npx nx run-many -t build
```

After that you can run the following command to create an executable of the desktop-app:

```bash
npx nx make desktop-app
```

This will create an executable for the platform on which the command is executed. So a `dmg` and `zip` for Mac and an installer for Windows.

## Testing

A note on testing. Although a couple test files have been generated while generating components for the UI applications, none of them have actually been implemented to speed up the development time of the prototype. This should and **must** be done during the implementation in the actual product.
