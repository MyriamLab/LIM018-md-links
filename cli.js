#!/usr/bin/env node
const chalk = require('chalk');

const { hasArgv, hasPath, getOptions, getPath } = require('./supports/cli.support');
const { help, pathError, resultMessage, resultValidateMessage, resultStadsMessage } = require('./supports/constants.support');
const { mdLinks } = require('./index');

if (hasArgv('--help')) {
  console.log(chalk.cyan(help));
  return;
}

if (!hasPath()) {
  console.log(chalk.red(pathError));
  return;
}

const path = getPath();
const options = getOptions();

mdLinks(path, options)
  .then((result) => {
    if (hasArgv('--stats')) {
      const total = result.length;
      const unique = new Set(result.map((el) => el.href)).size;

      console.log(chalk.magenta(resultStadsMessage))
      console.log(`Total: ${total}`);
      console.log(`Unique: ${unique}`);

      if (hasArgv('--validate')) {
        const broken = result.filter(el => el.ok === 'fail').length;
        console.log(`Broken: ${broken}`)
      }
    } else {
      const message = hasArgv('--validate') ? resultValidateMessage : resultMessage;
      console.log(chalk.magenta(message));
      console.log(result);
    }
  }).catch((err) => {
    console.log(err);
    console.log(chalk.red(err));
  })




