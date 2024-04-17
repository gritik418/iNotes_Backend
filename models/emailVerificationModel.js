const { Schema, models, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const EmailVerificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    secretKey: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "10m",
    },
  },
  { timestamps: true }
);

EmailVerificationSchema.pre("save", async function (next) {
  if (this.isModified("secretKey")) {
    const salt = await bcrypt.genSalt(8);
    const hashedKey = await bcrypt.hash(this.secretKey, salt);
    this.secretKey = hashedKey;
    next();
  }
});

const EmailVerification =
  models.EmailVerification ||
  model("EmailVerification", EmailVerificationSchema);

module.exports = EmailVerification;
