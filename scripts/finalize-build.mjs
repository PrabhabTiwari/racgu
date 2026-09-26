import {rename} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');

await rename(
  path.join(projectRoot, 'dist', 'index.source.html'),
  path.join(projectRoot, 'dist', 'index.html'),
);
