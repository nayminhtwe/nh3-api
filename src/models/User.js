const { DataTypes, where } = require("sequelize");
const sequelize = require("../config/db");
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");

const Otp = require("./Otp");

const { createError } = require("../utils/createError");
const generateTranscationId = require("../utils/generateTranscationId");
const { generateAccessAndRefreshToken } = require("../utils/generateTokens");

const User = sequelize.define(
  "app_users",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_approve: {
      type: DataTypes.TINYINT,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

// generate one time password
User.generateOTP = async (phone_number) => {
  const user = await User.findOne({ where: { phone_number } });
  if (user) throw createError("User already registered. Please login", 400);

  // validate otp is exists with phone number
  const OTPExists = await Otp.findOne({ where: { phone_number } });

  if (OTPExists) {
    await OTPExists.destroy()
    // throw createError("OTP with this phone number already exists", 400);
  }

  // generate a secret key
  const secret = speakeasy.generateSecret();

  // generate a otp code
  const otp_code = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    digits: 6,
  });

  // hashed the otp code to store the db
  const hashedOTP = await bcrypt.hash(otp_code, 10);

  // generate a transaction_id for one_time_passwords
  const transaction_id = generateTranscationId();

  // set the expire time for otp
  const expires_at = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    phone_number,
    otp_code: hashedOTP,
    transaction_id,
    enabled: true,
    expires_at,
  });

  return { transaction_id, otp_code };
};

User.reGenerateOTP = async (phone_number) => {
  const user = await User.findOne({ where: { phone_number } });
  if (!user) throw createError("User have not registered. Please register", 400);

  // validate otp is exists with phone number
  const OTPExists = await Otp.findOne({ where: { phone_number } });

  if (OTPExists) {
    await OTPExists.destroy()
    // throw createError("OTP with this phone number already exists", 400);
  }

  // generate a secret key
  const secret = speakeasy.generateSecret();

  // generate a otp code
  const otp_code = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    digits: 6,
  });

  // hashed the otp code to store the db
  const hashedOTP = await bcrypt.hash(otp_code, 10);

  // generate a transaction_id for one_time_passwords
  const transaction_id = generateTranscationId();

  // set the expire time for otp
  const expires_at = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({
    phone_number,
    otp_code: hashedOTP,
    transaction_id,
    enabled: true,
    expires_at,
  });

  return { transaction_id, otp_code };
};

User.register = async ({
  phone_number,
  otp_code,
  transaction_id,
  name,
  password,
}) => {
  const OTP = await Otp.findOne({ where: { phone_number, transaction_id } });

  if (OTP) {
    // if OTP is expired
    if (OTP.expires_at.getTime() < Date.now()) {
      await OTP.destroy();
      throw createError("OTP expired", 400);
    }

    // if OTP code and otp_code are not same
    if (!(await bcrypt.compare(otp_code, OTP.otp_code))) {
      throw createError("OTP code invalid", 400);
    }
  } else {
    // if OTP is not found
    throw createError("OTP not found", 404);
  }

  await OTP.destroy();

  const userExists = await User.findOne({ where: { phone_number } });

  if (userExists) {
    throw createError("User with this phone_number already exists", 400);
  }

  const user = await User.create({
    name,
    phone_number,
    password: await bcrypt.hash(password, 10),
  });

  const { access_token, refresh_token } = await generateAccessAndRefreshToken(
    user
  );
  

  await user.update({ where: { refresh_token } });

  return { user, access_token, refresh_token };
};


User.reset = async ({
  phone_number,
  otp_code,
  transaction_id,
  name,
  password,
}) => {
  const OTP = await Otp.findOne({ where: { phone_number, transaction_id } });

  if (OTP) {
    // if OTP is expired
    if (OTP.expires_at.getTime() < Date.now()) {
      await OTP.destroy();
      throw createError("OTP expired", 400);
    }

    // if OTP code and otp_code are not same
    if (!(await bcrypt.compare(otp_code, OTP.otp_code))) {
      throw createError("OTP code invalid", 400);
    }
  } else {
    // if OTP is not found
    throw createError("OTP not found", 404);
  }

  await OTP.destroy();

  const user = await User.findOne({ where: { phone_number } });

  if (!user) {
    throw createError("Please register first", 400);
  }

  const { access_token, refresh_token } = await generateAccessAndRefreshToken(
    user
  );
  

  await user.update({ where: { refresh_token } });

  return { user, access_token, refresh_token };
};
module.exports = User;
