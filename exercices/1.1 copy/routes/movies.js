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
const durationOfFIlm = req?.query['minimum-duration'] ? Number(req.query['minimum-duration']) : undefined;
if(durationOfFIlm===undefined){
  res.json(MOVIES);
}
if(typeof durationOfFIlm !== 'number' || durationOfFIlm <=0){
  return res.sendStatus(400);
}
const moviesMinimumDuration = MOVIES.filter((film) => film.duration>=durationOfFIlm);
return res.json(moviesMinimumDuration);
});
router.get('/:id', function(req, res, next){
 const id = req.params.id
 console.log({id});
const movie = MOVIES.find((film) => film.id == req.params.id);

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
  if(!id || !title || !duration || !budget || !link){res.sendStatus(400)};
  const moviesCreated = {id,title,duration,budget,link};
  console.log({moviesCreated});
  MOVIES.push(moviesCreated);
  res.json(MOVIES);
});

router.delete('/:id', function(req, res){

  const movie = MOVIES.find((film) => film.id == req.params.id);

  if (movie<0) return res.sendStatus(404);

  if(movie===undefined) return res.sendStatus(400);

  const itemsRemoved = films.splice(movie,1);
  const itemRemoved = itemsRemoved[0];

  return res.json(itemRemoved);

});


router.patch('/:id', function(req, res){
  
  const title = req?.body?.title;
  const duration= req?.body?.duration;
  const budget= req?.body?.budget;
  const link = req?.body?.link;

  if(
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim())   ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
) return res.sendStatus(400);


  const movie = MOVIES.find((film) => film.id == req.params.id);

  if(movie<0) return res.sendStatus(404);
  
  const filmPriorToChange = MOVIES[movie];
  const objectContainingPropertiesToBeUptated = req.body;

  const uptatedFile = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUptated,


  }


  MOVIES[movie]= uptatedFile;

  return res.json(uptatedFile);

})


router.put('/:id', function (req, res){
  const title = req?.body?.title;
  const duration= req?.body?.duration;
  const budget= req?.body?.budget;
  const link = req?.body?.link;

  if(
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim())   ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
) return res.sendStatus(400);


const id = req.params.id;
const movie = MOVIES.find((film) => film.id == req.params.id);


if(movie < 0) {
  const newFilm = {id, title, link, duration, budget};
  MOVIES.push(newFilm);
  return res.json(newFilm);
}

const filmPriorToChange = MOVIES[movie];
  const objectContainingPropertiesToBeUptated = req.body;

  const uptatedFile = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUptated,


  }


  MOVIES[movie]= uptatedFile;

  return res.json(uptatedFile);
})


module.exports = router;