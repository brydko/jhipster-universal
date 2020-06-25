import { ProdConfig } from './blocks/config/prod.config';
import '@angular/localize/init';

ProdConfig();

export { JhipsterAppServerModule } from './app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
