import mongoose from 'mongoose';
import Comment from './comment';
let Schema = mongoose.Schema;

let NightmarketSchema = new Schema ({
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
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Nightmarket', NightmarketSchema);
