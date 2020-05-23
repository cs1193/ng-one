const chalk = require('chalk');
const logSymbols = require('log-symbols');

const {
  isDirectoryExists,
  isValidPackageName,
  isNgOneWorkspaceFilePresent
} = require('../core/create-ng-one-app');


const main = async args => {
  try {
    const { name, module } = args;

    if (!isValidPackageName(name)) {
      console.error(`\n${chalk.red(logSymbols.error)} Invalid package name, suggested name ${getSuggestedPackageName()}.\n`);
      return;
    }

    if (isDirectoryExists(name)) {
      console.error(`\n${chalk.red(logSymbols.error)} A directory named ${name} exists. Please provide a different name.\n`);
      return;
    }

  } catch(e) {
    console.error(`\n${chalk.red(logSymbols.error)} Unable to create a ${chalk.bold('ng-one')} app / module, failed due to ${e}\n`)
  }
};

module.exports = {
  command: 'new <name>',
  describe: 'To create a new ng-one app / module scaffold.',
  handler: main,
  builder: (yargs) => {
    yargs.option('module', {
      describe: 'To generate a module this flag is provided'
    });
  }
};
