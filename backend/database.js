const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  function (err, res) {
    if (err) {
      console.log(err, 'Unable to connect to the server. check database.js');
    } else {
      console.log('DB is connected');
    }
  }
);

module.exports = mongoose;
