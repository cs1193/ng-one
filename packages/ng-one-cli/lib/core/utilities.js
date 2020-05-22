const spawn = require('cross-spawn');
const semver = require('semver');

const SUPPORTED_VERSION = '8.11.1';

const executeCommand = (command, args = [], options = {}) => {
  const child = spawn(command, args, options);
  return new Promise((resolve, reject) => {
    if (options.stdio && options.stdio !== 'inherit') {
      let outputData = '', errorData = '';

      child.stdout.on('data', (data) => {
        outputData += data;
      });

      child.stderr.on('error', (error) => {
        errorData += error;
      });
    }

    child.on('close', (code) => {
      if (code !== 0) {
        reject(`${command} ${args.join(' ')} failed with exit code ${code}`);
        return;
      }

      (options.stdio && options.stdio !== 'inherit') ? resolve(outputData) : resolve();a
    });
  });
}

const isSupportedVersion = () => {
  return semver.satisfies(process.version, `>=${SUPPORTED_VERSION}`);
};

module.exports = {
  executeCommand,
  isSupportedVersion
};
