import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WasmContent } from "./wasm.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WasmContent,
  ],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
