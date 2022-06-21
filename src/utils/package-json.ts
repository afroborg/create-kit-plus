import chalk from 'chalk';
import { Feature } from '../models/feature';
import { PackageJson } from '../models/package-json';
import { writeFileSync } from 'fs';

type Default = {
  default: PackageJson;
};

const mergePackageJsons = (base: PackageJson, next: PackageJson) => ({
  ...base,
  ...next,
  dependencies: {
    ...base.dependencies,
    ...next.dependencies,
  },
  devDependencies: {
    ...base.devDependencies,
    ...next.devDependencies,
  },
});

export const buildPackageJson = async (
  features: Feature[],
  name: string
): Promise<PackageJson> => {
  let { default: base }: Default = await import(
    '../templates/default/package.json'
  );

  if (features.includes('Tailwind')) {
    const { default: tailwind }: Default = await import(
      '../templates/tailwind/package.json'
    );

    base = mergePackageJsons(base, tailwind);
  }

  if (features.includes('Docker')) {
    const { default: docker }: Default = await import(
      '../templates/docker/package.json'
    );

    base = mergePackageJsons(base, docker);
  }

  base.name = name;

  return base;
};

export const createPackageJson = (pj: PackageJson, path: string) => {
  writeFileSync(`${path}/package.json`, JSON.stringify(pj), {
    encoding: 'utf8',
  });
};
