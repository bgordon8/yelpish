const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelpish", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 45; i++) {
    const random3 = Math.floor(Math.random() * 4);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60a1836d937847076f2c2447",
      location: `${cities[random3].city}, ${cities[random3].city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "this is what is looks like when youre here",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random3].longitude, cities[random3].latitude],
      },
      images: [
        {
          url:
            "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          filename: "Yelpish/h33i8qrzpvqcai1opdta",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
