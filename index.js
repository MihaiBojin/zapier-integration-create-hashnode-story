const core = require('zapier-platform-core');
const authentication = require('./authentication');
const createStoryCreate = require('./creates/create_story');
const packageDocument = require('./package.json');

module.exports = {
  version: packageDocument.version,
  platformVersion: core.version,
  authentication,
  creates: { [createStoryCreate.key]: createStoryCreate },
};
