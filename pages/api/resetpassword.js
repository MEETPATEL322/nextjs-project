import AdminModel from "../../Model/AdminModel";
import connectDb from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
import UserModel from "../../Model/UserModel";

const handler = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method == "POST") {
        let token = req.query.token
        console.log(token)

        try {
            if (req.body.type === "Admin") {
                jwt.verify(token, process.env.JWT_SECRET_KEY)
                var newpassword = req.body.newpassword;
                var confirmpassword = req.body.confirmpassword;
                // var   token  = req.params.token
                if (!newpassword || !confirmpassword) {
                    res.status(400).json({ msg: "Please ENter the New Password and Confirm Password" })
                }
                else {
                    if (newpassword === confirmpassword) {
                        let secpassword = CryptoJS.AES.encrypt(
                            newpassword,
                            process.env.SECRET_KEY
                        ).toString();
                        // var admin = new AdminModel({ password: secpassword });

                        await AdminModel.findByIdAndUpdate({ _id: req.query.id }, { password: secpassword }).then((data) => {
                            if (data) {
                                res.status(200).json({ success: true, message: "Admin Password Change Successfully" });

                            }
                            else {
                                res.status(200).json({ success: false, message: "Admin Password Change not Successfully" });

                            }
                        })



                        // bcrypt.hash(newpassword, 10, (err, psw) => {

                    }
                    else {
                        res.json({ message: "Newpassword not match with Confirmpassword", status: 'failed', success: false })
                    }
                }
            } else if (req.body.type === "User") {
                jwt.verify(token, process.env.JWT_SECRET_KEY)
                var newpassword = req.body.newpassword;
                var confirmpassword = req.body.confirmpassword;
                // var   token  = req.params.token
                if (!newpassword || !confirmpassword) {
                    res.status(400).json({ msg: "Please ENter the New Password and Confirm Password", success: false })
                }
                else {
                    if (newpassword === confirmpassword) {
                        let secpassword = CryptoJS.AES.encrypt(
                            newpassword,
                            process.env.SECRET_KEY
                        ).toString();
                        // var admin = new AdminModel({ password: secpassword });

                        await UserModel.findByIdAndUpdate({ _id: req.query.id }, { password: secpassword }).then((data) => {
                            if (data) {
                                res.status(200).json({ message: "User Password Change Successfully", success: true });

                            }
                            else {
                                res.status(200).json({ message: "User Password Change not Successfully" , success: false});
                            }
                        })
                    }
                    else {
                        res.json({ message: "Newpassword not match with Confirmpassword", status: 'failed', success: false })
                    }
                }

            }
        } catch (error) {
            // console.log(error)
            res.send({ message: "Your session has been Expired!", status: 'failed', success: false })
        }
    } else {
        res
            .status(500)
            .json({ success: false, message: "This method is not alllowed",success: false });
    }
};
export default connectDb(handler);