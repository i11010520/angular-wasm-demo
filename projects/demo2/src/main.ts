import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

import { demo } from "./app/wasm";
demo();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
