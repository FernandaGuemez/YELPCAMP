const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "67ccc71fa0af53418f31b50c",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, veniam tempora odit architecto enim aperiam. Quos hic, illum ut ratione inventore reiciendis a provident sint quod est possimus facere? Nisi.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dc4uvdzbu/image/upload/v1743014603/YelpCamp/yzolp9zhsfbcs4yy4m6k.jpg",
          filename: "YelpCamp/yzolp9zhsfbcs4yy4m6k",
        },
        {
          url: "https://res.cloudinary.com/dc4uvdzbu/image/upload/v1743014604/YelpCamp/suaw9exn3xpemjkgqeve.jpg",
          filename: "YelpCamp/suaw9exn3xpemjkgqeve",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
