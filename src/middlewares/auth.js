require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */

async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        msg: "authorzation header is missing!",
      });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(400).json({
        msg: "Token must be Bearer!",
      });
    }

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorization!",
      });
    }

    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!user) {
      return res.status(404).json({
        msg: "User not found!",
      });
    }

    const userData = await User.findByPk(user.id);

    user.percentage = userData.percentage
    user.is_approve = userData.is_approve

    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({
      msg: e.message,
    });
  }
}

module.exports = auth;
