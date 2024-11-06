# NgDemo

This demo repo is just for demonstrating `wasm` related error in `Angular` app.

## run
```
npx ng run demo2:build
```

## error
```
✘ [ERROR] WASM/ES module integration imports are not supported with Zone.js applications [plugin angular-wasm]

    node_modules/argon2-browser/lib/argon2.js:71:36:
      71 │ ...romise.resolve(import("../dist/argon2.wasm")).then(wasmModule => {
         ╵                          ~~~~~~~~~~~~~~~~~~~~~

  Information about zoneless Angular applications can be found here: https://angular.dev/guide/experimental/zoneless


✘ [ERROR] WASM/ES module integration imports are not supported with Zone.js applications [plugin angular-wasm]

    projects/demo2/src/app/wasm.component.ts:3:22:
      3 │ ... wasm from "../../../../node_modules/@bitwarden/sdk-internal/bit...
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Information about zoneless Angular applications can be found here: https://angular.dev/guide/experimental/zoneless


```
