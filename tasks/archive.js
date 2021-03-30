const zip = require("zip-local");
const { paths } = require("./settings");

function archive() {
  zip.sync
    .zip(paths.build.main)
    .compress()
    .save(`${paths.build.main}/mm.smart-hub.lp.zip`);
  return Promise.resolve("Done!");
}

module.exports = archive;
