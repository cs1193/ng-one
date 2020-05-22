global.Promise = require('bluebird');

const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

const {
  isSupportedVersion
} = require('./core/utilities');

if (!isSupportedVersion()) {
  throw new Error(`\n${chalk.red(logSymbols.error)} The current node version is not supported by ${chalk.bold('ng-one')}. Use NodeJS >= 8.11.1 and above.\n`);
  process.exit(1);
}

module.exports = require('yargs')
  .usage(`${chalk.bold('ng-one')} subcommand [options]`)
  .commandDir('./commands')
  .demandCommand()
  .help('help')
  .version(pkg.version)
  .example(
    `
      ${chalk.bold('ng-one')} new <example-angularjs-app>
      ${chalk.bold('ng-one')} generate component <example-component>
      ${chalk.bold('ng-one')} serve --open
    `
  )
  .fail((message, error, yargs) => {

  })
  .epilogue(
    `For more information on ${chalk.bold('ng-one')}, see ${pkg.homepage}`
  )
  .argv;
