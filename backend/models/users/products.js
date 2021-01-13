const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // ---------------- Login
    name: {
      type: String,
      unique: true
    },
    image: {
        type: String,
        default: false
    },
    price: {
        type: Number,
        default: false
    },
    description: {
        type: String,
        default: false
    }
  },
  {
    //Creado y usado el dia
    timestamps: true,
  }
);

module.exports = User = mongoose.model('products', UserSchema);