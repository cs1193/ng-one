const main = async args => {
  console.log('init')
};

module.exports = {
  command: 'init',
  describe: 'Init a new ng-one scaffold',
  handler: main
};
