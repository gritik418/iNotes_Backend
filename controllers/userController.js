import EmailVerification from "../models/emailVerificationModel.js";
import User from "../models/userModel.js";
import verificationTemplate from "../utils/emailVerificationTemplate.js";
import generateOTP from "../utils/generateOTP.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import vine, { errors } from "@vinejs/vine";
import loginSchema from "../validators/loginSchema.js";
import { ErrorReporter } from "../validators/ErrorReporter.js";
import signupSchema from "../validators/signupSchema.js";

vine.errorReporter = () => new ErrorReporter();

export const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const output = await vine.validate({
      schema: loginSchema,
      data,
    });

    const user = await User.findOne({
      $or: [{ email: output.email }, { username: output.email }],
    });

    if (
      !user ||
      !user.email_verified ||
      user.provider != "credentials" ||
      !output.password
    ) {
      return res.status(401).json({
        success: false,
        status: 400,
        message: "Invalid Credentials!!",
      });
    }

    const verify = await bcrypt.compare(output.password, user.password);

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
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error.messages);
    }
    return res.status(500).json({
      success: false,
      message: "Server Error",
      status: 400,
    });
  }
};

export const userSignUp = async (req, res) => {
  try {
    const data = req.body;
    const output = await vine.validate({
      schema: signupSchema,
      data,
    });

    const checkExisting = await User.findOne({
      $or: [{ email: output.email }, { username: output.username }],
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
    const hashedPassword = await bcrypt.hash(output.password, salt);

    const user = new User({
      first_name: output.first_name,
      last_name: output.lastname || "",
      username: output.username,
      email: output.email,
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
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error.messages);
    }
    return res.status(500).json({
      success: false,
      message: "Server Error",
      status: 400,
    });
  }
};
