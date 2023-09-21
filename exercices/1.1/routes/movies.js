var express = require('express');
var router = express.Router();
const MOVIES = [
  {
    id: 1,
    title: "Le Seigneur des Anneaux : La Communauté de l'Anneau",
    duration: 178,
    budget: 93,
    link: "https://www.imdb.com/title/tt0120737/"
  },
  {
    id: 2,
    title: "Inception",
    duration: 148,
    budget: 160,
    link: "https://www.imdb.com/title/tt1375666/"
  },
  {
    id: 3,
    title: "La La Land",
    duration: 128,
    budget: 30,
    link: "https://www.imdb.com/title/tt3783958/"
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
console.log(MOVIES);
res.json(MOVIES);
});

module.exports = router;
