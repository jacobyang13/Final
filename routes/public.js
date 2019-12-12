import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');


router.get('/examplePost/authors', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    console.log(result);
    res.send({result})
  }
});

router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    console.log(result);
    res.send({result})
  }
});

// router.delete('/*', parseDelete, function (req, res) {
//   const result = req.handleDelete(publicStore);
//   if (typeof result !== 'undefined') {
//     res.send({result})
//   }
// });
// router.get('/hello', function (req, res) {  
//   res.send({message: "This is working!"})  
// });