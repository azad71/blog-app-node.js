const fs = require("fs");

const deleteImage = (imagePath, next) => {
  fs.unlink(imagePath, (error) => {
    if (error) {
      console.log(error.message);
      return next(error);
    }
  });
};

module.exports = deleteImage;
