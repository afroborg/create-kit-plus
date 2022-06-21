import chalk from 'chalk';
import { getAdditionalFeatures } from './inquiries/features';
import { getProjectName } from './inquiries/project';
import { moveFiles } from './utils/files';
import { buildPackageJson } from './utils/package-json';

const start = async () => {
  console.log(chalk.cyan('🎨 Creating your E-kit app'));

  const [name, path] = await getProjectName();
  const features = await getAdditionalFeatures();
  const packageJson = await buildPackageJson(features, name);

  moveFiles(path, features);
};

start();
