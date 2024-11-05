const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "slider") {
      cb(null, path.join(__dirname, "../../public/images/sliders"));
    } else if (file.fieldname === "main_categories") {
      cb(null, path.join(__dirname, "../../public/images/main_categories"));
    } else if (file.fieldname === "items") {
      cb(null, path.join(__dirname, "../../public/images/items"));
    } else {
      throw new Error("Invalid field name for file upload");
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

module.exports = { fileUpload: upload };
