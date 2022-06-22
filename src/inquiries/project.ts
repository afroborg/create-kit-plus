import chalk from 'chalk';
import { fstat, mkdirSync, readdir, readdirSync, rmSync } from 'fs';
import inquirer, { prompt } from 'inquirer';
import path, { dirname } from 'path';

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

export const getProjectName = async (): Promise<string> => {
  const dirName = path.basename(path.resolve());
  const { name } = await prompt<{ name: string }>({
    name: 'name',
    message: 'Name (empty for current directory name)',
    type: 'input',
    default: dirName,
    validate: (input) => {
      if (input === '.') {
        return true;
      }

      if (!/^[a-z-]*$/.test(input)) {
        return 'Name can only include lowercase letters (a-z) and -';
      }

      return true;
    },
  });

  // if no name specified or (.) get the current folder name instead
  if (name === '.' || !name) {
    return dirName;
  }

  return name;
};

export const getProjectPath = async (name: string) => {
  const { projectPath } = await prompt<{ projectPath: string }>({
    name: 'projectPath',
    message: `Path (empty leave empty for ${name})`,
    type: 'input',
    default: name,
    validate: (input) => {
      try {
        if (readdirSync(input).length > 0) {
          chalk.redBright('Directory is not empty, could not continue');
          return false;
        }
      } catch {
        return true;
      }

      return true;
    },
  });

  await createFolder(projectPath);

  return projectPath;
};
