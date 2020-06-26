# JHipsterUniversal

Experimental JHipster application with Angular Universal

## Composition

- Public part of the JHipster application is Tour of Heroes, which is imported as a module.
- Private part is a typical JHipster Administration / Entities set of features.
- Backend offers a public API to be consumed by Tour of Heroes.

## The setup

- JHipster v6.9.1
- Monolithic application
- No database
- No cache
- Maven
- Angular
- No internationalization
- No Lazy-Loading

## Angular Universal Integration

The steps to add angular universal are the ones explained [here](https://github.com/angular/angular-cli/wiki/stories-universal-rendering). Although the guide is a little bit outdated, it can still be used to follow the steps.

- **Install Dependencies**

```shell
npm install --save @angular/animations@9.1.3 @angular/platform-server@9.1.3 @nguniversal/express-engine@9.1.1 http-proxy-middleware@1.0.4
npm install --save-dev @nguniversal/builders@9.1.1 @types/express@4.17.6 @angular-builders/custom-webpack@9.2.0 @angular-devkit/build-angular@0.901.9
```

- **app.main.ts**

In **app.main.ts** document.addEventListener surrounds platformBrowserDynamic, like so:

```shell
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(JhipsterAppModule, { preserveWhitespaces:  true })
    // eslint-disable-next-line no-console
    .then(() =>  console.log('Application started'))
    .catch(err  =>  console.error(err));
});
```

- **Config files**

app.module.ts, app.server.module.ts, app.main.server.ts, tsconfig.server.json --- same changes as described in the guide above.

- **angular.json**

Before adding a server target to **angular.json**, jhipster project was converted to Angular CLI. The required changes may be found in the [PR #10624](https://github.com/jhipster/generator-jhipster/pull/10624). After this, at least two new targets should be added to **angular.json**: server, serve-ssr and, optionally, prerender.

- **server.ts**

This file is more or less the same as the one provided in the guide. Proxy setup for the express server is set here. Different routes for CSR and SSR may be set here as well.

- **webpack.server.config.js**

Same as described in the guide. Few tweaks added.

- **package.json**

Three common scripts were added: "dev:ssr", "serve:ssr" and "build:ssr".

## Execution

Few things to mention here.

- **localize**

```shell
npm run build:ssr
```

Because of an issue with **@angular/localize** after running **build:ssr** you should add the contents of the file **LOCALIZE** located at the root of the project to the generated file **jhipster-universal/target/classes/static/server/main.js**. Just copy the contents of file LOCALIZE and paste it to the beginnging of main.js.

```shell
npm run serve:ssr
```

- **scp**

Once running, express server will deliver rendered html to the browser. However, bootstrapping Angular files may be blocked by the scp policy of your browser. If you disable scp, Angular will bootstrap the html and the application will work in exactly the same way it does usually.

Start the backend separately.

## Issues

- localize
- scp

## TODO

- i18 example.
- Lazy-Loading.
- SSR should be enabled on public routes. Private routes (the ones after login) should be CSR.
- Prerender example for any route.
- Preboot (manage the transition of state (i.e. events, focus, data) from a server-generated web view to a client-generated web view).
