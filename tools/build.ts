import { exec } from 'child_process';
import { cpSync } from 'fs';
import path from 'path';

const cpTemplates = async () =>
  new Promise((resolve, reject) => {
    const templatePath = path.join(__dirname, `../src/templates`);
    const targetPath = path.join(__dirname, `../build/src`);

    cpSync(templatePath, targetPath, { recursive: true, force: true });
  });

const tsc = async () =>
  new Promise((resolve, reject) => {
    exec('tsc', (error, output) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(output);
    });
  });

const start = async () => {
  console.log('Building your project...');
  await tsc();
  console.log('Typescript compiled');
  await cpTemplates();
  console.log('Templates copied');
};

start();
