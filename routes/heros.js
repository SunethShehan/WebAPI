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



router.get('/', (req, res) => {

    res.send(new Hero().find());

});

router.get('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    return res.status(200).send(hero);

});


router.put('/:heroId', (req, res) => {

    let heroId = req.params.heroId;

    let hero = heroesArry.find(h => h.id == heroId);

    if (!hero) {

        return res.status(404).send({ Result: "Hero Not Found" });

    }

    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPower = req.body.superPower;
    if (!NewSuperPower)
        return res.status(422).send({ InvalidInput: "superPower Not Found in Request Body" });

    let NewAge = req.body.age;
    if (!NewAge)
        return res.status(422).send({ InvalidInput: "age Not Found in Request Body" });


    heroesArry.find(h => h.id == heroId).name = NewName;
    heroesArry.find(h => h.id == heroId).superPower = NewSuperPower;
    heroesArry.find(h => h.id == heroId).age = NewAge;

    return res.status(200).send(heroesArry);

});

router.post('/', async (req, res) => {


    let NewName = req.body.name;
    if (!NewName)
        return res.status(422).send({ InvalidInput: "name Not Found in Request Body" });

    let NewSuperPower = req.body.superPower;
    if (!NewSuperPower)
        return res.status(422).send({ InvalidInput: "superPower Not Found in Request Body" });

    let NewAge = req.body.age;
    if (!NewAge)
        return res.status(422).send({ InvalidInput: "age Not Found in Request Body" });

    let heroToAdd = new Hero ({
        name: NewName,
        birthName: NewName,
        superPowers: [NewSuperPower],
        deceased: false, 
        likeCount: 50,
        movies: ["Superman"]
    });


    heroToAdd = await heroToAdd.save()

    heroToAdd.save()
    //heroesArry.push(newHero);

    return res.status(200).send(heroToAdd);

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