const express = require("express");
const sharp = require("sharp");
const path = require("path");
const crypto = require("crypto");

const upload = require("./middlewares/multer");

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const secret = "MySecret";

convertFile = (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ error: err.message });
    } else if (req.file === undefined) {
      return res.json({ error: "You need to choose an image." });
    } else {
      let originalName =
        crypto
          .createHmac("sha256", secret)
          .update(req.file.originalname)
          .digest("hex") + path.extname(req.file.originalname);

      sharp(`./uploads/${originalName}`).toFile(
        `./convertedUploads/${Date.now()}.webp`,
        (err, info) => {
          if (err)
            return res.json({ error: "Sorry, the input file doesn't exist." });
          else return res.json({ status: "success", data: info });
        }
      );
    }
  });
};
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.post("/images", convertFile, (req, res, err) => {
  if (err) {
    return res.json({ err: "Error uploading file." });
  }
  res.json({ status: "success" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
