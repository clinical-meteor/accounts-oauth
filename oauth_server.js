import { get } from 'lodash';

// Listen to calls to `login` with an oauth option set. This is where
// users actually get logged in to meteor via oauth.
Accounts.registerLoginHandler(function (options) {
  process.env.DEBUG && console.log('S21.1 Accounts.registerLoginHandler()', options);

  if (!options.oauth)
    return undefined; // don't handle

  check(options.oauth, {
    credentialToken: Match.OneOf(null, String),
    // When an error occurs while retrieving the access token, we store
    // the error in the pending credentials table, with a secret of
    // null. The client can call the login method with a secret of null
    // to retrieve the error.
    credentialSecret: Match.OneOf(null, String)
  });

  var result = OAuth.retrieveCredential(options.oauth.credentialToken,
                                        options.oauth.credentialSecret);

  process.env.DEBUG && console.log('S21.2 Accounts.registerLoginHandler().result', result)

  if (!result) {
    // OAuth credentialToken is not recognized, which could be either
    // because the popup was closed by the user before completion, or
    // some sort of error where the oauth provider didn't talk to our
    // server correctly and closed the popup somehow.
    //
    // We assume it was user canceled and report it as such, using a
    // numeric code that the client recognizes (XXX this will get
    // replaced by a symbolic error code at some point
    // https://trello.com/c/kMkw800Z/53-official-ddp-specification). This
    // will mask failures where things are misconfigured such that the
    // server doesn't see the request but does close the window. This
    // seems unlikely.
    //
    // XXX we want `type` to be the service name such as "facebook"
    // return { type: "oauth",
    //          error: new Meteor.Error(
    //            Accounts.LoginCancelledError.numericError,
    //            "No matching login attempt found when running OAuth.retreiveCredential().") };

    console.log('S21.3 No matching login attempt found when running OAuth.retreiveCredential().  Trying to skip...')
  } else if (result instanceof Error) {
    // We tried to login, but there was a fatal error. Report it back
    // to the user.
    throw result;
  } else if(result) {
    if (!_.contains(Accounts.oauth.serviceNames(), result.serviceName)) {
      // serviceName was not found in the registered services list.
      // This could happen because the service never registered itself or
      // unregisterService was called on it.
      return { type: "oauth",
               error: new Meteor.Error(
                 Accounts.LoginCancelledError.numericError,
                 "S21.4 No registered oauth service found for: " + result.serviceName) };

    }
    return Accounts.updateOrCreateUserFromExternalService(result.serviceName, result.serviceData, result.options);
  }
});
