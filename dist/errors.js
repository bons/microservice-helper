'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handle = handle;

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errors = require(_appRootPath2.default + '/errors');

/**
 * Generate custom errors.
 * @param {String} id Id to be shown.
 * @param {Error} [err] Error to be added as oldError in the return object.
 * @returns {Error} Custom Error instance.
 */
/**
 * Error handler module. In order to work , the project must have an error directory in the root folder.
 * @module
 *
 */
function handle(id, err) {
  var key = id.replace(/^#/, '');

  if (errors[key] === undefined) return handle('unknownError', err);

  var e = new Error(errors[key]);
  e.code = '#' + key;

  if (err) {
    e.stack = err.stack;

    if (err.isJoi) {
      handleJoi(err, e);
    } else {
      e.oldError = err;
    }
  }

  return e;
}

function handleJoi(joiError, e) {
  e.badParams = [];
  e.receivedMessage = joiError._object;
  joiError.details.forEach(function (detail) {
    e.badParams.push({
      key: detail.path,
      msg: detail.message,
      type: detail.type
    });
  });
}
//# sourceMappingURL=errors.js.map