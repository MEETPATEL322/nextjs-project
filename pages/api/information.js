import connectDb from "../../middleware/mongoose";
import InfoModel from "../../Model/InfoModel";
var multer = require("multer");
// const bodyParser = require("body-parser");
const express = require("express");
var app = express();
app.use(express.static("public/static"));
// const app = express();
const path = require("path");
import fs from 'fs'
// const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// import cors from 'cors';

// const corsOptions = {
//   origin: true,
//   credentials: true,
//   referrerPolicy: 'strict-origin-when-cross-origin',
// };

// const corsMiddleware = cors(corsOptions);
export const config = {
  api: {
    bodyParser: false,
  },
};

//multer storage...
var Storage = multer.diskStorage({
  destination: "public/static",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});
var upload = multer({
  storage: Storage
  ,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  }
}).single("image");

const handler = async (req, res) => {



  if (req.method == "POST") {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // console.log("body", req.body.firstname);
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send(err.message);
      }
      console.log(req.file.filename);
      const {
        firstname,
        lastname,
        email,
        gender,
        education,
        languages,
        mobile,
        birthdate,
        maxValue,
        minValue,
        address,
      } = req.body;
      var info = new InfoModel({
        firstname,
        lastname,
        email,
        gender,
        salary: {
          minValue: req.body.minValue,
          maxValue: req.body.maxValue
        },
        mobile,
        birthdate,
        address, languages,
        education,
        image: req.file.filename,
      });
      info.save().then((data) => {
        if (data) {
          res.status(200).json({ success: true, message: "Information Added", data: data });
        } else {
          res.status(200).json({ success: false, message: "error in Information adding" });
        }
      });
    });
  } else if (req.method == "GET") {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.query.id) {
      let data = await InfoModel.findById({ _id: req.query.id });
      if (data) {
        res
          .status(200)
          .json({ success: true, message: "Getting Particular Information data successfully", data: data });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Error in Getting Particular Information data successfully", data: data });

      }

    } else {
      let data = await InfoModel.find();
      res
        .status(200)
        .json({ success: true, message: "Getting Information data successfully", data: data });
    }

  } else if (req.method == "DELETE") {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // console.log(req.query.id);
    const data = await InfoModel.findById({ _id: req.query.id });
    if (data) {
      let image = data.image
      console.log("image", image)
      if (image) {
        let path = "public/static/" + image;
        if (fs.existsSync(path)) {
          // path exists
          fs.unlinkSync(path);
          console.log("exists:", "public/static/" + image);

          await InfoModel.deleteOne({ _id: req.query.id }).then((data) => {
            if (data) {
              res
                .status(200)
                .json({ message: "Information Data Deleted", data: data });
            } else {
              res.status(400).json({ message: "error in Information deleting" });
            }
          });
        } else {
          console.log("DOES NOT exist:", "public/static" + image.data);
          res.status(400).send({ message: "DOES NOT exist: " })
        }
      } else {
        res.status(400).send({ message: "image not found " })

      }

    } else {
      res
        .status(400)
        .json({ message: "This Data is Not available in Database" });
    }
  } else if (req.method == "PUT") {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    console.log("Update Backend call")

    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).send(err.message);
      }
      const data = await InfoModel.findById({ _id: req.query.id });

      if (data) {

        let image = data.image
        console.log("image", image)
        if (image) {
          let path = "public/static/" + image;
          if (fs.existsSync(path)) {
            // path exists
            fs.unlinkSync(path);
            console.log("exists:", "public/static/" + image);
            const reqbody = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              mobile: req.body.mobile,
              gender: req.body.gender,
              email: req.body.email,
              address: req.body.address,
              birthdate: req.body.birthdate,
              languages: req.body.languages,
              education: req.body.education,
              salary: {
                minValue: req.body.minValue,
                maxValue: req.body.maxValue
              },
              image:
                req.file && req.file.filename ? req.file.filename : image,

            }

            await InfoModel.updateOne({ _id: req.query.id }, reqbody).then(
              (data) => {
                if (data) {
                  res
                    .status(200)
                    .json({ success: true, message: "Information Data Updated", data: data });
                } else {
                  res.status(400).json({ success: false, message: "error in Information updating" });
                }
              }
            );
          } else {
            console.log("DOES NOT exist:", "public/static" + image.data);
            res.status(400).send({ success: false, message: "DOES NOT exist: " })
          }
        } else {
          res.status(400).send({ success: false, message: "image not found " })

        }
      } else {
        res
          .status(400)
          .json({ success: false, message: "This Data is Not available in Database" });
      }

    })
  } else {
    res.status(500).json({ success: false, message: "This method is not alllowed" });
  }
};
export default connectDb(handler);



