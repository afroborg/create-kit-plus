import chalk from 'chalk';
import { getAdditionalFeatures } from './inquiries/features';
import { getProjectName, getProjectPath } from './inquiries/project';
import { moveFiles } from './utils/files';
import { buildPackageJson, createPackageJson } from './utils/package-json';
import { installPackages } from './utils/packages';

const start = async () => {
  console.log(chalk.cyan('🎨 Creating your Kit+ app'));

  const name = await getProjectName();
  const path = await getProjectPath(name);
  const features = await getAdditionalFeatures();

  console.log(chalk.yellowBright('🛠  Building your package.json'));
  const packageJson = await buildPackageJson(features, name);

  console.log(chalk.yellowBright('🧱 Builing your new files'));
  moveFiles(path, features);

  createPackageJson(packageJson, path);

  console.log(chalk.yellowBright('⌛️ Installing dependencies'));

  await installPackages(path);

  console.log(chalk.yellowBright('✅ Installed'));

  console.log(
    chalk`\n
{yellow.bold Thanks for using create-kit-plus, please feel free to give us a ⭐️ on GitHub}
{cyan.underline https://github.com/afroborg/create-kit-plus}  
    `
  );
};

start();
