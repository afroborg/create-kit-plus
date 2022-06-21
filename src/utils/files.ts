import chalk from 'chalk';
import { cpSync, rmSync } from 'fs';
import path from 'path';
import { Feature } from '../models/feature';
import {} from 'glob';

const template = (t: string) => path.join(__dirname, `../templates/${t}`);

const deletePackageJson = (folder: string) => rmSync(`${folder}/package.json`);

const copyTemplateData = (t: string, folder: string) => {
	cpSync(template(t), folder, {
		recursive: true,
		errorOnExist: false
	});
};

export const moveFiles = async (foldername: string, features: Feature[]) => {
	console.log(chalk.yellowBright('🧱 Builing your new files'));

	const copyTemplateData = (t: string) => {
		cpSync(template(t), foldername, {
			recursive: true,
			errorOnExist: false
		});
	};

	copyTemplateData('default');

	deletePackageJson(foldername);

	if (features.includes('Tailwind')) {
		copyTemplateData('tailwind');
	}

	if (features.includes('Docker')) {
		copyTemplateData('docker');
	}
};
