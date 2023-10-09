/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './.env.local' });

module.exports = {
  repoName: 'kvika-app',
  token: process.env.KVIKA_RELEASE_TOKEN,
  enableAlert: true,
  mainBranch: 'main',
};
