var express = require('express')
var router = express.Router()

var Hero = require("../models/model");

let heroesArry = [
    {
        id: 1,
        name: "Rumesh",
        superPower: ["Fighting"],
        age: 24
    },

    {
        id: 2,
        name: "Kamal",
        superPower: ["Running"],
        age: 24
    },
    {
        id: 3,
        name: "Nimal",
        superPower: ["Flying"],
        age: 24
    },
    {
        id: 4,
        name: "Sunil",
        superPower: ["Fishing"],
        age: 24
    }
];



router.get('/', async (req, res) => {

    await Hero.find({}).then(heroList => {

        return res.status(200).send(heroList)

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });

});

router.get('/:heroName', async (req, res) => {

    let heroName = req.params.heroName;

    await Hero.findOne({ name: heroName }).then(hero => {

        if (!hero) {

            return res.status(404).send({ Result: "Hero Not Found" });

        }

        return res.status(404).send(hero);

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });
});


router.put('/:heroName', (req, res) => {

    let heroName = req.params.heroName;

    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPowers = req.body.superPowers;
    if (!NewSuperPowers)
        return res.status(422).send({ InvalidInput: "superPowers Not Found in Request Body" });

    let NewBirthName = req.body.birthName;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "birth Name Not Found in Request Body" });

    let NewMovies = req.body.movies;
    if (!NewMovies)
        return res.status(422).send({ InvalidInput: "movies Not Found in Request Body" });

    Hero.findOne({ name: heroName }, (err, doc) =>{
        doc.name = NewName,
        doc.birthName = NewBirthName,
        doc.superPowers = NewSuperPowers,
        doc.deceased= false,
        doc.likeCount = 50,
        doc.movies = NewMovies
        doc.save();
    });

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

});

router.post('/', async (req, res) => {


    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPowers = req.body.superPowers;
    if (!NewSuperPowers)
        return res.status(422).send({ InvalidInput: "superPowers Not Found in Request Body" });

    let NewBirthName = req.body.birthName;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "birth Name Not Found in Request Body" });

    let NewMovies = req.body.movies;
    if (!NewMovies)
        return res.status(422).send({ InvalidInput: "movies Not Found in Request Body" });

    let heroToAdd = new Hero({
        name: NewName,
        birthName: NewBirthName,
        superPowers: NewSuperPowers,
        deceased: false,
        likeCount: 50,
        movies: NewMovies
    });

    await heroToAdd.save().then(createdHero => {

        res.status(200).send(createdHero);

    }).catch(err => {

        console.error(err);
        return res.status(500).send(err);

    });

});


router.delete('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    let index = heroesArry.indexOf(hero);
    heroesArry.splice(index, 1);

    return res.status(200).send(hero);

});

module.exports = router;