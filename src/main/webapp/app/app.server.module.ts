import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { JhipsterAppModule } from './app.module';
import { MainComponent } from './layouts/main/main.component';

@NgModule({
  imports: [JhipsterAppModule, ServerModule],
  bootstrap: [MainComponent],
})
export class JhipsterAppServerModule {}
