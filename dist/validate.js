'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePromisified = validatePromisified;
exports.validateElementPromisified = validateElementPromisified;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used to validate a basic type or schema
 * @module
 */
var JoiObjectId = (0, _joiObjectid2.default)(_joi2.default);

function _joiValidator(type) {
  if (type === 'ObjectId') return JoiObjectId;
  if (typeof _joi2.default[type] === 'function') return _joi2.default[type];
}
/**
 *
 * @param {Object} objectToValidate
 * @param {Object} schema - Can be a joi type object or a plain object where every key is assigned a joi type object
 * @returns {Promise}
 */
function validatePromisified(objectToValidate, schema) {
  return new Promise(function (resolve, reject) {
    _joi2.default.validate(objectToValidate, schema, { abortEarly: false }, function (err, result) {
      if (err) return reject(err);

      resolve(result);
    });
  });
}
/**
 *
 * @param {Object} elementToValidate
 * @param {String} type - Any of the classic basic primitive types
 * @returns {Promise}
 */
function validateElementPromisified(elementToValidate, type) {
  return new Promise(function (resolve, reject) {
    var v = _joiValidator(type);

    _joi2.default.validate(elementToValidate, v(), { abortEarly: false }, function (err, result) {
      if (err) return reject(err);

      resolve(result);
    });
  });
}
//# sourceMappingURL=validate.js.map