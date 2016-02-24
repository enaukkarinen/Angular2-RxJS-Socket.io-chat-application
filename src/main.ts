/// <reference path="./custom_typings.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
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

var io = require('socket.io-client');
var socket = io('http://localhost:7203');

socket.emit('new message', 'on init test message!!!');

socket.on('message', (msg) => {
    console.log('client saw message');
    console.log(msg);
});
/*
/*$('form').submit(function(){
socket.emit('chat message', $('#m').val());
$('#m').val('');
return false;
});
socket.on('chat message', function(msg){
$('#messages').append($('<li>').text(msg));
});
*/

var today = new Date();
var Christmas = new Date("12-25-2012");
var diffMs = (Christmas.valueOf() - Date.now()); // milliseconds between now & Christmas
var diffDays = Math.round(diffMs / 86400000); // days
var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas 2009 =)");