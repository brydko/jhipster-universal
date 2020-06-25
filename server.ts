import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { JhipsterAppServerModule } from './src/main/webapp/app/app.server.module';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): any {
  const server = express();
  const distFolder = join(process.cwd(), 'target/classes/static');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: JhipsterAppServerModule,
    }) as any
  ); // DIRTY HACK

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  server.use('/api/**', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  server.use('/management/**', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));

  // CSR may be enabled for certain paths by sending index.html without any rendered content
  /*
  server.get('/admin', function (req, res) {
    res.sendFile(join(distFolder,'index.html'));
  });
  
  server.get('/hero', function (req, res) {
    res.sendFile(join(distFolder,'index.html'));
  });
  */

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 9000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main/webapp/app/app.main.server';
