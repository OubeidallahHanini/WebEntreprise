const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }]
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = {Permission};
