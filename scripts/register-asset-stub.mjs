import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./asset-stub-loader.mjs', import.meta.url);
