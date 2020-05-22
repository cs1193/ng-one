const { existsSync } = require('fs');
const simpleGit = require('simple-git/promise');

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
  const ngOneFilePath = `${process.cwd()}/ng-one.json`;
  return existsSync(ngOneFilePath);
};

const createNgOneApp = () => {

};

module.exports = {
  createNgOneApp,
  isWorkingDirClean,
  isNgOneWorkspaceFilePresent
};
