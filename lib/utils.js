"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Change a user's password
 * @param {object} user - the cognito user object
 * @param {string} oldPassword - the current password
 * @param {string} newPassword - the new password
*/
var changePassword = function changePassword(user, oldPassword, newPassword) {
  return new Promise(function (resolve, reject) {
    return user.changePassword(oldPassword, newPassword, function (err, result) {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * builds the federated identity pool login structure
 * @param {string} username - the username of the user
 * @param {string} jwtToken - a JWT Token from the session
 * @param {object} config - the cognito react config object
*/
var buildLogins = function buildLogins(username, jwtToken, config) {
  var loginDomain = "cognito-idp." + config.region + ".amazonaws.com";
  var loginUrl = loginDomain + "/" + config.userPool;
  var creds = {
    IdentityPoolId: config.identityPool,
    Logins: {},
    LoginId: username };
  creds.Logins[loginUrl] = jwtToken;
  return creds;
};

exports.changePassword = changePassword;
exports.buildLogins = buildLogins;