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
  for (let i = 0; i < 15; i++) {
    const random3 = Math.floor(Math.random() * 3);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60a1836d937847076f2c2447",
      location: `${cities[random3].city}, ${cities[random3].city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "this is what is looks like when youre here",
      price,
      geometry: {
        type: "Point",
        coordinates: [-105.604997408086, 39.190245999],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/db7s3pmgy/image/upload/v1622220946/Yelpish/box3nqxd0efqfiov31bg.jpg",
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
