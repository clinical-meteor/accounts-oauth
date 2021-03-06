Package.describe({
  summary: "Common code for OAuth-based login services in clinical environments.",
  version: "1.1.55",
  name: 'clinical:accounts-oauth',
  git: 'https://github.com/clinical-meteor/accounts-oauth'
});

Package.onUse(function (api) {
  api.use('meteor-platform@1.2.6');

  api.use('underscore@1.0.10', ['client', 'server']);
  api.use('random@1.0.10', ['client', 'server']);
  api.use('check@1.2.5', ['client', 'server']);
  api.use('webapp@1.4.0', 'server');
  api.use('accounts-base@1.4.2', ['client', 'server']);
  api.use('ecmascript@0.9.0');

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('clinical:oauth@1.2.31');

  api.addFiles('oauth_common.js');
  api.addFiles('oauth_client.js', 'client');
  api.addFiles('oauth_server.js', 'server');
});


Package.onTest(function (api) {
  api.addFiles("oauth_tests.js", 'server');
});

// Npm.depends({
//   "lodash": "4.17.4"
// });