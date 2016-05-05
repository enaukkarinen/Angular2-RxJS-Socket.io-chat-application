/// <reference path="./custom_typings.d.ts" />


/**
 *             ,
            '@angular/platform-browser-dynamic',
            ,
            ,
            
            ,
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';


import { App } from './app/app';

bootstrap(
  App,
  [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    JwtHelper,
    provide(AuthHttp, {
      useFactory: (http) => { return new AuthHttp(new AuthConfig({ tokenName: 'jwt' }), http);
      },
      deps: [Http]
    })
  ]
);


import {doodles} from './rxjs_doodles';
doodles();
