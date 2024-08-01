const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "slider") {
      cb(null, path.join(__dirname, "../../public/images/sliders"));
    } else {
      cb(null, path.join(__dirname, "../../public/images/items"));
    }
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },
  fileFilter: (req, file, cb) => {
    const allowTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowTypes.includes(file.mimetype)) {
      const error = new Error(
        "Invalid File type. Only JPEG, PNG and GIF are allowed."
      );
      return cb(error, false);
    }

    cb(null, true);
  },
});

module.exports = { itemsUpload: upload };
