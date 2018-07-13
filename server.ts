import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as domino from 'domino';
import { join } from 'path';
import { readFileSync } from 'fs';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'petman-client', 'index.html')).toString();

const win = domino.createWindow(template);

Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

Object.defineProperty(win.document.body.style, 'box-shadow', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

global['document'] = win.document;
global['CSS'] = null;
global['Prism'] = null;
global['window'] = win;
global['DOMTokenList'] = win['DOMTokenList'];
global['Node'] = win['Node'];
global['navigator'] = win.navigator;
global['location'] = win.location;
global['HTMLElement'] = win['HTMLElement'];
global['getComputedStyle'] = win.getComputedStyle;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/petman-client-server/main');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'petman-client'));

// Server static files from /petman-client
app.get('*.*', express.static(join(DIST_FOLDER, 'petman-client')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'petman-client', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
