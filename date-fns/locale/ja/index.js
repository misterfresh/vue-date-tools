"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./_lib/formatDistance/index.js"));

var _index2 = _interopRequireDefault(require("./_lib/formatLong/index.js"));

var _index3 = _interopRequireDefault(require("./_lib/formatRelative/index.js"));

var _index4 = _interopRequireDefault(require("./_lib/localize/index.js"));

var _index5 = _interopRequireDefault(require("./_lib/match/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary Japanese locale.
 * @language Japanese
 * @iso-639-2 jpn
 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
 * @author Yamagishi Kazutoshi [@ykzts]{@link https://github.com/ykzts}
 * @author Luca Ban [@mesqueeb]{@link https://github.com/mesqueeb}
 */
var locale = {
  code: 'ja',
  formatDistance: _index.default,
  formatLong: _index2.default,
  formatRelative: _index3.default,
  localize: _index4.default,
  match: _index5.default,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};
var _default = locale; // throw new Error('ja locale is currently unavailable. Please check the progress of converting this locale to v2.0.0 in this issue on Github: TBA')

exports.default = _default;
module.exports = exports.default;