import { exec } from 'child_process';

const execAsync = (script: string) =>
  new Promise((resolve, reject) => {
    exec(script, (error, out) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(out);
    });
  });

export const installPackages = async (path: string) => {
  await execAsync(`cd ${path} && yarn install`);
};
