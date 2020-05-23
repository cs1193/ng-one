const path = require('path');
const { existsSync } = require('fs');
const git = require('simple-git/promise');

const PACKAGENAME_PATTERN = /\b[\w-]+-[\w-]*\b/;

const isWorkingDirClean = () => {
  const gitP = git(process.cwd());
  return new Promise((resolve, reject) => {
    gitP
      .checkIsRepo()
      .then((isRepo) => {
        if (isRepo) {
          gitP()
            .status()
            .then((status) => {
              const { files } = status;
              resolve(files.length === 0);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const isGitRepository = () => {

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

const getSuggestedPackageName = (name) => {
  let suggestedName = name.replace('.', '-');
  suggestedName = name.replace('_', '-');
  return suggestedName;
};

const createNgOneApp = () => {

};

module.exports = {
  createNgOneApp,
  isWorkingDirClean,
  isDirectoryExists,
  isValidPackageName,
  getSuggestedPackageName,
  isNgOneWorkspaceFilePresent
};
