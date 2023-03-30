import connectDb from "../../middleware/mongoose";
var nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
import AdminModel from "../../Model/AdminModel";
import UserModel from "../../Model/UserModel";

const handler = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method == "POST") {
        const { email } = req.body

        if (req.body.type === "Admin") {
            if (email) {
                const admininfo = await AdminModel.findOne({ email: email })
                console.log("user email", admininfo);
                if (admininfo) {
                    const secret = process.env.JWT_SECRET_KEY
                    const token = jwt.sign({ userID: admininfo._id }, secret, { expiresIn: '2m' })
                    const link = `${process.env.NEXT_PUBLIC_API_URL}/resetpassword?id=${admininfo._id}&token=${token}`
                    console.log("LINK", link)

                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'Saurabhsinh.zala.sapphire@gmail.com',
                            pass: 'phrpefrujfylaxts'
                        }
                    });
                    let mailOptions = {
                        from: '"Saurabh" <Saurabhsinh.zala.sapphire@gmail.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: 'Forget Password Send on  Email', // Subject line
                        // text: 'this is generated Password with node mailer', // plain text body
                        html: "Forget Password then click Here==>" + "        " + `<a href=${link}>Click here for reset Password</a>` // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        // console.log('Message %s sent: %s', info.messageId, info.response);
                        res.status(200).json({ message: 'Email Sent', success: true, token: token });
                    });
                }
                else {
                    res.status(400).json({ message: 'Bad Info', success: false, status: 'invalid email..' });
                }
            } else {
                res.status(400).json({ success: false, message: "Email not Found in DataBAse" })
            }
        } else if (req.body.type === "User") {
            if (email) {
                const userinfo = await UserModel.findOne({ email: email })
                console.log("user email", userinfo);
                if (userinfo) {
                    const secret = process.env.JWT_SECRET_KEY
                    const token = jwt.sign({ userID: userinfo._id }, secret, { expiresIn: '2m' })
                    const link = `${process.env.NEXT_PUBLIC_API_URL}/resetpassword?id=${userinfo._id}&token=${token}`
                    console.log("LINK", link)

                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'Saurabhsinh.zala.sapphire@gmail.com',
                            pass: 'phrpefrujfylaxts'
                        }
                    });
                    let mailOptions = {
                        from: '"Saurabh" <Saurabhsinh.zala.sapphire@gmail.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: 'Forget Password Send on  Email', // Subject line
                        // text: 'this is generated Password with node mailer', // plain text body
                        html: "Forget Password then click Here==>" + "        " + `<a href=${link}>Click here for reset Password</a>` // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        // console.log('Message %s sent: %s', info.messageId, info.response);
                        res.status(200).json({ success: true, message: 'Email Sent', token: token });
                    });
                }
                else {
                    res.status(400).json({ success: false, message: 'Bad Info', status: 'invalid email..' });
                }
            } else {
                res.status(400).json({ success: false, message: "Email not Found in DataBAse" })
            }
        }
    } else {
        res
            .status(500)
            .json({ success: false, message: "This method is not alllowed" });
    }
};
export default connectDb(handler);