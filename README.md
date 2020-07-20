# JHipsterUniversal

Experimental JHipster application with Angular Universal. The goal of this project is to develop a guide for JHipster SSR-enabled applications.

## Composition

- Public part of the JHipster application is Tour of Heroes, which is imported as a module.
- Private part is a typical JHipster Administration / Entities set of features.
- Backend offers a public API to be consumed by Tour of Heroes.

## The setup

- JHipster v6.10.0
- Monolithic application
- No database
- No cache
- Maven
- Angular
- No internationalization
- No Lazy-Loading

## Angular Universal + JHipster Integration

The steps to add Angular Universal to any Angular CLI project are the ones explained [here](https://github.com/angular/angular-cli/wiki/stories-universal-rendering). Although the guide is a little bit outdated, it can still be useful. Following instructions explain how to add Angular Universal to a JHipster project. These steps are based on the official guide.

- **Install Dependencies**

```shell
npm install --save @angular/animations@10.0.0 @angular/platform-server@10.0.0 @nguniversal/express-engine@10.0.0 http-proxy-middleware@1.0.4
npm install --save-dev @nguniversal/builders@10.0.0 @types/express@4.17.6 @angular-builders/custom-webpack@10.0.0-beta.1 @angular-devkit/build-angular@0.1000.0
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

app.module.ts, app.server.module.ts, app.main.server.ts, tsconfig.server.json --- same changes as described in the guide above. Angular 10 introduces tsconfig.base.json, which takes the contents of tsconfig.json.

- **angular.json**

Before adding a server target to **angular.json**, jhipster project was converted to Angular CLI. The required changes may be found in the [PR #10624](https://github.com/jhipster/generator-jhipster/pull/10624). After this, at least two new targets should be added to **angular.json**: server, serve-ssr and, optionally, prerender. JHipster 7 should be using CLI by default.

- **server.ts**

This file is more or less the same as the one provided in the guide. Proxy setup for the express server is set here. Different routes for CSR and SSR may be set here as well.

- **webpack.server.config.js**

Same as described in the guide. Few tweaks added.

- **package.json**

Three common scripts were added: "dev:ssr", "serve:ssr" and "build:ssr".

## Execution

Few things to mention here.

```shell
npm run build:ssr
```

This command will compile the project and will generate target/classes/static/server/en-US/main.js file. Note that en-US is the defaut locale in Angular. Full i18 support will come soon.

After compiling, the application may be started by running:

```shell
npm run serve:ssr
```

Backend should be started separately.

---

Also you may start the project in 'prod' mode.

```shell
./mvnw -Pprod
```

start express.js server instance separately by running

```shell
node target/classes/static/server/en-US/main.js
```

---

Request SSR content on localhost:9000

- **scp**

Once running, express server will deliver rendered html to the browser. However, bootstrapping Angular files may be blocked by the scp policy of your browser.

## TODO

- i18 example.
- Lazy-Loading.
- SSR should be enabled on public routes. Private routes (the ones after login) should be CSR.
- Prerender example for any route.
- Preboot (manage the transition of state (i.e. events, focus, data) from a server-generated web view to a client-generated web view).
