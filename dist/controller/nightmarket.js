'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _nightmarket = require('../model/nightmarket');

var _nightmarket2 = _interopRequireDefault(_nightmarket);

var _comment = require('../model/comment');

var _comment2 = _interopRequireDefault(_comment);

var _authmiddleware = require('../middleware/authmiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //CREATE ->  /v1/nightmarket/add
  api.post('/add', _authmiddleware.authenticate, function (req, res) {
    var newNightmarket = new _nightmarket2.default();
    newNightmarket.name = req.body.name;
    newNightmarket.geometry.coordinates = req.body.geometry.coordinates;

    newNightmarket.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Nightmarket saved yay' });
    });
  });

  //READ -> /v1/nightmarket/
  api.get('/', function (req, res) {
    _nightmarket2.default.find({}, function (err, nightmarkets) {
      if (err) {
        res.send(err);
      }
      res.json(nightmarkets);
    });
  });

  //READ ONE -> /v1/nightmarket/:id
  api.get('/:id', function (req, res) {
    _nightmarket2.default.findById(req.params.id, function (err, nightmarket) {
      if (err) {
        res.send(err);
      }
      res.json(nightmarket);
    });
  });

  //UPDATE -> /v1/nightmarket/:id
  api.put('/:id', _authmiddleware.authenticate, function (req, res) {
    _nightmarket2.default.findById(req.params.id, function (err, nightmarket) {
      if (err) {
        res.send(err);
      }
      nightmarket.name = req.body.name;
      nightmarket.geometry.coordinates = req.body.geometry.coordinates;
      nightmarket.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Nightmarket Info Updated" });
      });
    });
  });

  //DELETE -> /v1/nightmarket/:id
  api.delete('/:id', _authmiddleware.authenticate, function (req, res) {
    _nightmarket2.default.remove({
      _id: req.params.id
    }, function (err, nightmarket) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Nightmarket is Deleted" });
    });
  });

  // =====================================
  // COMMENTS
  // =====================================

  // CREATE -> /v1/nightmarket/comments/add/:id
  api.post('/comments/add/:id', function (req, res) {
    _nightmarket2.default.findById(req.params.id, function (err, nightmarket) {
      if (err) {
        res.send(err);
      }
      var newComment = new _comment2.default();
      newComment.text = req.body.text;
      //Link comment to Nightmarket
      newComment.nightmarket = nightmarket._id;
      newComment.save(function (err, comment) {
        if (err) {
          res.send(err);
        }
        nightmarket.comments.push(newComment);
        nightmarket.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Nightmarket Comment Saved' });
        });
      });
    });
  });

  // READ -> /v1/nightmarket/comments/:id
  api.get('/comments/:id', function (req, res) {
    _comment2.default.find({ nightmarket: req.params.id }, function (err, comments) {
      if (err) {
        res.send(err);
      }
      res.json(comments);
    });
  });

  //add UPDATE of comments

  //add DELETE of comments


  return api;
};
//# sourceMappingURL=nightmarket.js.map