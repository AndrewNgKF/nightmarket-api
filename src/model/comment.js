import mongoose from 'mongoose';
import Nightmarket from './nightmarket';

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
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
module.exports = mongoose.model('Comment', CommentSchema);
