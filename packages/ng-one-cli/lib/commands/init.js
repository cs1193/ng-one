const path = require('path');

const chalk = require('chalk');
const logSymbols = require('log-symbols');

const {
  isWorkingDirClean,
  getSuggestedPackageName,
  isNgOneWorkspaceFilePresent
} = require('../core/create-ng-one-app');

const main = async args => {
  try {
    const { module } = args;
    const name = path.basename(process.cwd());

    if (isNgOneWorkspaceFilePresent()) {
      console.error(`\n${chalk.red(logSymbols.error)} This is already an ${chalk.bold('ng-one')} app. You can't init an another app in an ${chalk.bold('ng-one')} app.\n`)
    }

    if (!await isWorkingDirClean()) {
      console.error(`\n${chalk.red(logSymbols.error)} The current directory is not clean, please stash or reset and ${chalk.bold('ng-one init')}\n`);
      return;
    }

    if (!isValidPackageName(name)) {
      console.error(`\n${chalk.red(logSymbols.error)} Invalid package name, suggested name ${getSuggestedPackageName()}.\n`);
      return;
    }

    console.log('valid');

  } catch(e) {
    console.error(`\n${chalk.red(logSymbols.error)} Unable to init a ${chalk.bold('ng-one')} app / module, failed due to ${e}\n`)
  }
};

module.exports = {
  command: 'init',
  describe: 'To generate a ng-one app / module scaffold in working directory.',
  handler: main,
  builder: (yargs) => {
    yargs.option('module', {
      describe: 'To generate a module this flag is provided'
    });
  }
};
