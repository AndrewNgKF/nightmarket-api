import mongoose from 'mongoose';
import { Router } from 'express';
import Nightmarket from '../model/nightmarket';
import Comment from '../model/comment';

import { authenticate } from '../middleware/authmiddleware';

export default ({ config, db}) => {
  let api = Router();

  //CREATE ->  /v1/nightmarket/add
  api.post('/add', authenticate, (req, res) => {
    let newNightmarket = new Nightmarket();
    newNightmarket.name = req.body.name;
    newNightmarket.geometry.coordinates = req.body.geometry.coordinates;


    newNightmarket.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Nightmarket saved yay'});
    });
  });

  //READ -> /v1/nightmarket/
  api.get('/', (req, res) => {
    Nightmarket.find({}, (err, nightmarkets) => {
      if (err) {
        res.send(err);
      }
        res.json(nightmarkets);
    });
  });

  //READ ONE -> /v1/nightmarket/:id
  api.get('/:id', (req, res) => {
    Nightmarket.findById(req.params.id, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      res.json(nightmarket);
    });
  });

  //UPDATE -> /v1/nightmarket/:id
  api.put('/:id', authenticate, (req, res) => {
    Nightmarket.findById(req.params.id, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      nightmarket.name = req.body.name;
      nightmarket.geometry.coordinates = req.body.geometry.coordinates;
      nightmarket.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Nightmarket Info Updated"});
      });
    });
  });

  //DELETE -> /v1/nightmarket/:id
  api.delete('/:id', authenticate, (req, res) => {
    Nightmarket.remove({
      _id: req.params.id
    }, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Nightmarket is Deleted"})
    })
  });

  // =====================================
    // COMMENTS
  // =====================================

  // CREATE -> /v1/nightmarket/comments/add/:id
  api.post('/comments/add/:id', (req, res) => {
    Nightmarket.findById(req.params.id, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      let newComment = new Comment();
      newComment.text = req.body.text;
      //Link comment to Nightmarket
      newComment.nightmarket = nightmarket._id;
      newComment.save((err, comment) => {
        if (err) {
          res.send(err);
        }
        nightmarket.comments.push(newComment);
        nightmarket.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Nightmarket Comment Saved'});
        });
      });
    });
  });

  // READ -> /v1/nightmarket/comments/:id
  api.get('/comments/:id', (req, res) => {
    Comment.find({nightmarket: req.params.id}, (err, comments) => {
      if (err) {
        res.send(err);
      }
      res.json(comments);
    });
  });

  //add UPDATE of comments

  //add DELETE of comments



  return api;
}
