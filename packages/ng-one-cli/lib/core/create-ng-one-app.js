const path = require('path');
const { existsSync } = require('fs');
const simpleGit = require('simple-git/promise');

const PACKAGENAME_PATTERN = /\b[\w-]+-[\w-]*\b/;

const isWorkingDirClean = () => {
  new Promise((resolve, reject) => {
    simpleGit(process.cwd())
      .status()
      .then((status) => {
        const { files } = status;
        resolve(files.length === 0);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const isNgOneWorkspaceFilePresent = () => {
  const ngOneFilePath = path.resolve(`${process.cwd()}/ng-one.json`);
  return existsSync(ngOneFilePath);
};

const isDirectoryExists = (name) => {
  const directoryPath = path.resolve(`${process.cwd()}/${name}`);
  return existsSync(directoryPath);
}

const isValidPackageName = (name) => {
  const regex = new RegExp(PACKAGENAME_PATTERN, 'gi');
  return regex.exec(name);
};

const createNgOneApp = () => {

};

module.exports = {
  createNgOneApp,
  isWorkingDirClean,
  isDirectoryExists,
  isValidPackageName,
  isNgOneWorkspaceFilePresent
};
