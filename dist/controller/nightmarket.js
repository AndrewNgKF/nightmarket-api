'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _nightmarket = require('../model/nightmarket');

var _nightmarket2 = _interopRequireDefault(_nightmarket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  api.post('/add', function (res, req) {
    var newNightmarket = new _nightmarket2.default();
    newNightmarket.name = req.body.name;

    newNightmarket.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Nightmarket saved successfully yay' });
    });
  });
  return api;
};
//# sourceMappingURL=nightmarket.js.map