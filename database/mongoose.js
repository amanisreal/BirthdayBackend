const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://amanborkar995:wD3HhtRC8eLBHVVH@neko.wiehd.mongodb.net/?retryWrites=true&w=majority&appName=Neko`);

const connectDB = (url) => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(url)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));
  };
  
module.exports = connectDB;
