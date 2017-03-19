import mongoose from 'mongoose';
import { Router } from 'express';
import Nightmarket from '../model/nightmarket';

export default ({ config, db}) => {
  let api = Router();

  //CREATE ->  /v1/nightmarket/add
  api.post('/add', (req, res) => {
    let newNightmarket = new Nightmarket();
    newNightmarket.name = req.body.name;

    newNightmarket.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Nightmarket saved successfully yay'});
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
  api.put('/:id', (req, res) => {
    Nightmarket.findById(req.params.id, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      nightmarket.name = req.body.name;
      nightmarket.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Nightmarket Info Updated"});
      });
    });
  });

  //DELETE -> /v1/nightmarket/:id
  api.delete('/:id', (req, res) => {
    Nightmarket.remove({
      _id: req.params.id
    }, (err, nightmarket) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Nightmarket is Deleted"})
    })
  })

  return api;
}
