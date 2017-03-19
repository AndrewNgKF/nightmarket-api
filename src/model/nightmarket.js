import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let nightmarketSchema = new Schema ({
  name: String
});

module.exports = mongoose.model('Nightmarket', nightmarketSchema);
