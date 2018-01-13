const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Monitors Schema
const MonitorSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  reviews: [{
    reviewBody: {
      type: String,
      required: true
    },
    reviewDate: {
      type: Date,
      default: Date.now
    },
    reviewUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('monitors', MonitorSchema)