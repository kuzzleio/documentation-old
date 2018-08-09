//Register a new Metalsmith custom plugin
module.exports = () => {
  // Initialize options

  // Return a function that will be executed on files
  return (files, metalsmith, done) => {
    setImmediate(done);
  };
};
