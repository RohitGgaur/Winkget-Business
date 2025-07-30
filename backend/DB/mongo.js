const mongoose = require('mongoose');
const url = "mongodb+srv://gaur0423:GcMs7YFd5pGnjJDa@cluster0.2fmso.mongodb.net/";

// ✅ Sirf tab connect kare jab testing mode na ho
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(url)
    .then(() => {
      console.log("✅ Mongoose connection successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = mongoose;
