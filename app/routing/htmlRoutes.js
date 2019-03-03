// var express = require("express");
// var router = express.Router();
var path = require("path");



module.exports = function (router) {
    router.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    router.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));

    });
}