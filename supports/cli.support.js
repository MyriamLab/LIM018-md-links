const hasArgv = (argv) => {
  const index = process.argv.findIndex(item => item === argv);
  return index === -1 ? false : true;
}

const getArgv = (argv) => {
  return process.argv.find(elm => argv === elm);
}

const hasPath = () => {
  return process.argv[2] ? true : false;
}

const getPath = () => {
  return process.argv[2];
}

const getOptions = () => {
  const options = {};

  if (hasArgv('--validate')) {
    options.validate = true;
  }

  if (hasArgv('--stats')) {
    options.stats = true;
  }

  return options;
}

module.exports = { hasArgv, getArgv, getPath, hasPath, getOptions }