export type PackageJson = {
  name?: string;
  version?: string;
  liscence?: string;
  scripts?: {
    [name: string]: string;
  };
  dependencies?: {
    [dep: string]: string;
  };
  devDependencies?: {
    [dep: string]: string;
  };
  type?: string;
};
