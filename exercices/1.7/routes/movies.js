var express = require('express');
var router = express.Router();

const {parse, serialize} =  require('../utils/json');
const jsonDbPath = __dirname + "/../data/movies.json";


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
const durationOfFIlm = req?.query['minimum-duration'] ? Number(req.query['minimum-duration']) : undefined;
if(durationOfFIlm===undefined){
 res.sendStatus(404);
}
if(typeof durationOfFIlm !== 'number' || durationOfFIlm <=0){
  return res.sendStatus(400);
}
const films = parse(jsonDbPath, MOVIES);
const moviesMinimumDuration = films.filter((film) => film.duration>=durationOfFIlm);
return res.json(moviesMinimumDuration);
});





router.get('/:id', function(req, res, next){
 const id = req.params.id
 console.log({id});
const films = parse(jsonDbPath, MOVIES);
const movie = films.find((film) => film.id == req.params.id);


if(movie===undefined){
  return res.sendStatus(404);
}
if(movie<0){
  return res.sendStatus(400);
}
res.json(movie);
})



router.post('/', function(req, res, next){
  const id = req.body.id;
  const title = req.body.title;
  const duration= req.body.duration;
  const budget= req.body.budget;
  const link = req.body.link;
 const films = parse(jsonDbPath, MOVIES);


  if(!id || !title || !duration || !budget || !link){res.sendStatus(400)};
  const moviesCreated = {id,title,duration,budget,link};
  console.log({moviesCreated});
  films.push(moviesCreated);
  serialize(jsonDbPath, films);

  res.json(films);
});

router.delete('/:id', function(req, res){
  const films = parse(jsonDbPath, MOVIES);

  const movie = films.find((film) => film.id == req.params.id);

  if (movie<0) return res.sendStatus(404);

  if(movie===undefined) return res.sendStatus(400);

  const itemsRemoved = films.splice(movie,1);
  const itemRemoved = itemsRemoved[0];
  serialize(jsonDbPath, films);
  return res.json(itemRemoved);

});


router.patch('/:id', function(req, res){
  
  const title = req?.body?.title;
  const duration= req?.body?.duration;
  const budget= req?.body?.budget;
  const link = req?.body?.link;
  const films = parse(jsonDbPath, MOVIES);

  if(
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim())   ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
) return res.sendStatus(400);


  const movie = films.find((film) => film.id == req.params.id);

  if(movie<0) return res.sendStatus(404);
  
  const filmPriorToChange = films[movie];
  const objectContainingPropertiesToBeUptated = req.body;

  const uptatedFile = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUptated,


  }


  films[movie]= uptatedFile;
  serialize(jsonDbPath, films);
  return res.json(uptatedFile);

})


router.put('/:id', function (req, res){
  const title = req?.body?.title;
  const duration= req?.body?.duration;
  const budget= req?.body?.budget;
  const link = req?.body?.link;
  const films = parse(jsonDbPath, MOVIES);

  if(
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim())   ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
) return res.sendStatus(400);


const id = req.params.id;
const movie = films.find((film) => film.id == req.params.id);


if(movie < 0) {
  const newFilm = {id, title, link, duration, budget};
  films.push(newFilm);
  return res.json(newFilm);
}

const filmPriorToChange = films[movie];
  const objectContainingPropertiesToBeUptated = req.body;

  const uptatedFile = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUptated,


  }


  films[movie]= uptatedFile;
  serialize(jsonDbPath, films);
  return res.json(uptatedFile);
})
module.exports = router;