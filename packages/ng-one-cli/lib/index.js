global.Promise = require('bluebird');

const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

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
