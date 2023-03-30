import connectDb from "../../middleware/mongoose";
import AdminModel from "../../Model/AdminModel";
var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");
var CryptoJS = require("crypto-js");
import UserModel from "../../Model/UserModel";

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method == "POST") {

    if (req.body.type === "Admin") {
      let admin = await AdminModel.findOne({ email: req.body.email });

      if (admin) {
        let bytes = CryptoJS.AES.decrypt(admin.password, process.env.SECRET_KEY);
        let decpassword = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email == admin.email && req.body.password == decpassword) {
          var token = jwt.sign(
            { email: admin.email, name: admin.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
          );
          res.status(200).json({
            success: true,
            msg: "Admin Login Successfull!!! ",
            token,
            type: "Admin"
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ success: false, message: "Admin not found" });
      }
    } else if (req.body.type === "User") {
      let user = await UserModel.findOne({ email: req.body.email });

      if (user) {
        let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        let decpassword = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email == user.email && req.body.password == decpassword) {
          var token = jwt.sign(
            { email: user.email, name: user.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2m" }
          );
          res.status(200).json({
            success: true,
            msg: "User Login Successfull!!! ",
            token,
            type: "User"
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ success: false, message: "Admin not found" });
      }

    }
  } else {
    res
      .status(500)
      .json({ success: false, message: "This method is not alllowed" });
  }
};
export default connectDb(handler);
