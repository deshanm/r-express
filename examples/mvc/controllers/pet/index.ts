"use strict";

/**
 * Module dependencies.
 */

var db = require("../../db");

exports.engine = "ejs";

exports.before = function (req, res, next) {
  var pet = db.pets[req.params.pet_id];
  if (!pet) return next("route");
  req.pet = pet;
  next();
};

exports.show = function (req, res, next) {
  res.render("show", { pet: req.pet });
};

exports.edit = function (req, res, next) {
  res.render("edit", { pet: req.pet });
};


type Res = any;
type Next = any;
interface Req {
  body: {
    pet: {
      name: string;
    };
  };
  pet: {
    name?: string;
    id?: string;
  };
}

exports.update = function (req: Req, res: Res, next: Next) {
  var body = req.body;
  req.pet.name = body.user.name;
  res.message("Information updated!");
  res.redirect("/pet/" + req.pet.id);
};
