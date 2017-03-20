'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var NightmarketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  geometry: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = _mongoose2.default.model('Nightmarket', NightmarketSchema);
//# sourceMappingURL=nightmarket.js.map