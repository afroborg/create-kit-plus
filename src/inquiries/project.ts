import chalk from 'chalk';
import { mkdirSync, rmSync } from 'fs';
import inquirer, { prompt } from 'inquirer';
import path from 'path';

const createFolder = async (name: string, del: boolean = false) => {
  try {
    if (del) {
      rmSync(name, { recursive: true, force: true });
    }

    mkdirSync(name);
    return name;
  } catch {
    console.log(
      chalk.redBright('Could not create folder, maybe it already exists?')
    );

    const { override } = await prompt({
      message: 'Override?',
      type: 'confirm',
      name: 'override',
    });

    if (!override) {
      process.exit();
    }

    createFolder(name, true);
  }
};

export const getProjectName = async (): Promise<[string, string]> => {
  const { name } = await prompt<{ name: string }>({
    name: 'name',
    message: 'Name (empty for current directory name)',
    type: 'input',
    validate: (input) => {
      if (!/^[a-z-]*$/.test(input)) {
        return 'Name can only include lowercase letters (a-z) and -';
      }

      return true;
    },
  });

  // if no name specified or (.) get the current folder name instead
  if (name === '.' || !name) {
    const foldername = path.basename(path.resolve());
    return [foldername, '.'];
  }

  await createFolder(name);
  return [name, name];
};
