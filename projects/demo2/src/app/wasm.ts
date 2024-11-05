//import wasm from "@bitwarden/sdk-internal/bitwarden_wasm_internal_bg.wasm";
//import * as sdk from "@bitwarden/sdk-internal";
import argon2 from "argon2-browser";

//async function _bitsdk() {
//  const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasm), {});
//  const wasmExports = wasmModule.instance.exports;
//  return wasmExports;
//}
//function bitsdk() {
//  let result;
//
//  (async () => {
//    try {
//      result = await _bitsdk();
//      console.log("result: ", result);
//    } catch (error) {
//      console.error("Error: ", error);
//      throw error;
//    }
//  })();
//
//  return result;
//}
//function runInsideAngular<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
//  if (ngZone.isStable) {
//    console.log("ngzone stable");
//    ngZone.onStable.pipe(identity);
//  } else {
//    console.log("ngzone not stable");
//  }
//  return (source: Observable<T>) =>
//    new Observable<T>((subscriber) => {
//      const subscription = source.subscribe({
//        next(value) {
//          ngZone.run(() => subscriber.next(value));
//        },
//        error(error: unknown) {
//          ngZone.run(() => subscriber.error(error));
//        },
//        complete() {
//          ngZone.run(() => subscriber.complete());
//        },
//      });
//
//      return () => subscription.unsubscribe();
//    });
//}

export function demo() {
  let result;

  (async () => {
    try {
      const hash = await argon2.hash({
        pass: "p@ssw0rd",
        salt: "somesalt",
      });

      console.log(`Encoded: ${hash.encoded}`);
      console.log(`Hex: ${hash.hashHex}`);

      await argon2.verify({
        pass: "p@ssw0rd",
        encoded: hash.encoded,
      });

      console.log("Verified OK");
      result = { encoded: hash.encoded, hex: hash.hashHex }; // Return the hash data or any other data you need
    } catch (error) {
      console.error("Error: ", error);
      throw error; // Re-throw the error if you want the caller to handle it
    }
  })();

  return result;
}
