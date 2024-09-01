const {
    override,
    useBabelRc
} = require("customize-cra");

module.exports = override(
    // enable legacy decorators babel plugin
    useBabelRc()
);