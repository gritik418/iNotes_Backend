const EmailVerification = require("../models/emailVerificationModel");
const User = require("../models/userModel");
const verificationTemplate = require("../utils/emailVerificationTemplate");
const generateOTP = require("../utils/generateOTP");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

exports.userLogin = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({
      $or: [{ email: data.email }, { username: data.email }],
    });

    if (
      !user ||
      !user.email_verified ||
      user.provider != "credentials" ||
      !data.password
    ) {
      return res.status(401).json({
        success: false,
        status: 400,
        message: "Invalid Credentials!!",
      });
    }

    const verify = await bcrypt.compare(data.password, user.password);

    if (!verify) {
      return res.status(401).json({
        success: false,
        status: 400,
        message: "Invalid Credentials!!",
      });
    }

    const token = await user.generateAuthToken({
      id: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      token: token,
      message: "Logged In Successfully..",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      status: 400,
    });
  }
};

exports.userSignUp = async (req, res) => {
  try {
    const data = req.body;

    const checkExisting = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (checkExisting) {
      if (checkExisting.email_verified) {
        return res.status(401).json({
          success: false,
          status: 400,
          message: "Account already exists!!",
        });
      }

      await User.findByIdAndDelete(checkExisting._id);
      await EmailVerification.findOneAndDelete({ userId: checkExisting._id });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = new User({
      first_name: data.first_name,
      last_name: data.lastname || "",
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const otp = generateOTP();

    const verificationToken = new EmailVerification({
      userId: savedUser._id,
      secretKey: otp,
    });

    await verificationToken.save();

    const mailOptions = {
      from: "iNotes@official.com",
      to: savedUser.email,
      subject: "Verify your Email Address",
      text: `Verify your Email Address to create an account with iNotes.\nThe otp for the email address is ${otp}.\nThe otp is valid only for 10 minutes.`,
      html: verificationTemplate(otp),
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Email sent.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      status: 400,
    });
  }
};
