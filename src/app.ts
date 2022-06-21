import chalk from 'chalk';
import { getAdditionalFeatures } from './inquiries/features';
import { getProjectName } from './inquiries/project';
import { moveFiles } from './utils/files';
import { buildPackageJson, createPackageJson } from './utils/package-json';
import { installPackages } from './utils/packages';

const start = async () => {
  console.log(chalk.cyan('🎨 Creating your E-kit app'));

  const [name, path] = await getProjectName();
  const features = await getAdditionalFeatures();

  console.log(chalk.yellowBright('🛠  Building your package.json'));
  const packageJson = await buildPackageJson(features, name);

  console.log(chalk.yellowBright('🧱 Builing your new files'));
  moveFiles(path, features);

  createPackageJson(packageJson, path);

  console.log('');

  console.log(chalk.yellowBright('⌛️ Installing dependencies'));
  await installPackages(path);
  console.log(chalk.yellowBright('✅ Installed'));

  console.log('');

  console.log(
    chalk.cyan(
      'Thanks for using create-kit-plus, please feel free to give us a ⭐️'
    )
  );
  console.log(chalk.cyanBright('https://github.com/afroborg/create-kit-plus'));
};

start();
