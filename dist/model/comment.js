'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nightmarket = require('./nightmarket');

var _nightmarket2 = _interopRequireDefault(_nightmarket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  nightmarket: {
    type: Schema.Types.ObjectId,
    ref: 'Nightmarket',
    required: true
  }
});
module.exports = _mongoose2.default.model('Comment', CommentSchema);
//# sourceMappingURL=comment.js.map