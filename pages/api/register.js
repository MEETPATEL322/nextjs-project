import connectDb from "../../middleware/mongoose";
import AdminModel from "../../Model/AdminModel";
var CryptoJS = require("crypto-js");
import UserModel from "../../Model/UserModel";

const handler = async (req, res) => {
  const { method } = req;
  // await connectDb();
  switch (method) {
    case "POST":
      try {
        if (req.body.type === "Admin") {
          const { email, password } = req.body;
          let secpassword = CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
          ).toString();
          var admin = new AdminModel({ email, password: secpassword });
          admin.save();
          res.status(200).json({ message: "Admin Data Added Successfully", success: true });

        }
        else if (req.body.type === "User") {
          const { email, password } = req.body;
          let secpassword = CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
          ).toString();
          var user = new UserModel({ email, password: secpassword });
          user.save();
          res.status(200).json({ message: "User Data Added Successfully", success: true });
        }

      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "This method is not alllowed", success: false });
      }
      break;
    default:
      res.status(400).json({ message: "Error server" });
      break;
  }
};

export default connectDb(handler);
