const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // ---------------- Login
    email_verified: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
    },
    provider: {
      type: String,
      default: 'null',
    },
    language: {
      type: String,
      default: 'es',
    },
    // ---------------- Info del settings
    name: {
      type: String,
    },
    mcName: {
      type: String,
      unique: true,
    },
    born: {
      type: String,
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
    },
    document: {
      type: String,
      default: 0,
      unique: true,
    },
    link: {
      type: String,
    },
    social: {
      type: String,
    },
    // ---------------- Para Menos de 16

    tutorsName: {
      type: String,
      default: ' - ',
    },

    tutorsDocument: {
      type: String,
      default: ' - ',
    },

    views: {
      type: Number,
      default: 0,
    },
    // ---------------- Vista de favoritos

    // ---------------- Terminos y Condiciones
    termAgreed: {
      type: Boolean,
      default: true,
    },
    /*
     *iPinfo: {
     *	type: Object,
     *	default: {},
     *},
     */
  },
  {
    //Creado y usado el dia
    timestamps: true,
  }
);

module.exports = User = mongoose.model('users', UserSchema);
