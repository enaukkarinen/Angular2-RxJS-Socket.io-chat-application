// Polyfills
import "es6-shim";
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import "es6-promise";
import "zone.js/lib/browser/zone-microtask";

// Reflect Polyfill
require("es7-reflect-metadata/dist/browser");

// Angular 2
import "angular2/platform/browser";
import "angular2/platform/common_dom";
import "angular2/router";
import "angular2/http";
import "angular2/core";

// RxJS
import "rxjs";

// Other vendors for example jQuery, Lodash, angular2-jwt
