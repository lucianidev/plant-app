const express = require('express')
const Router = express.Router();
const uuid = require('uuid');
const sequelize = require('../helpers/dbInit');
const path = require('path');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const checkFileType = require('../helpers/checkFileType');
const multer = require('multer');
const csrfMiddleware = require('../middleware/csrf');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + uuid.v4() + path.extname(file.originalname));
    },
    limits: {
        fileSize: 1024 * 1024 * 10, // 2MB
        files: 1 // Maximum number of files
    }
});
const upload = multer({ storage: storage });

const errors = [
    'please insert the name', // 0
    'please insert the description', // 1
    'please insert the id',// 2
    'the id must be a number',// 3
    'cannot find  plant', // 4
    'cannot find  id', // 5
    'CSRF token not working' // 6
]
// crea
Router.post("/create",upload.single('image', ) ,async (req, res) => {
    try {
        if (!req.body?.name || typeof (req.body?.name) != 'string') return res.render('create', {error : 'insert the name'});
        if (!req.body?.description || typeof (req.body?.description) != 'string') return res.render('create', {error : 'insert the description'});

        const plant = await models.plants.create({
            name: req.body?.name,
            descriptions: req.body?.description,
        });

        console.log(plant.dataValues.idplant)
        if (req.file) {
            const image = await models.photos.create({
                path : req.file.path,
                plant_id: plant.dataValues.idplant,
            });
        }

        res.redirect('/plants');
    } catch (error) {
        res.render('error');
    }
})

Router.get("/create" ,async (req, res) => {
    try {
        res.render('create', {error : ''});
    } catch (error) {
        res.render('error');
    }
})

Router.get("/", async (req, res) => {

    try {
        const plants = await models.plants.findAll({
            include : {
                model : models.photos,
                as : 'photos',
                required: false
            }
        })
        console.log(plants);
        console.log(req.query?.error)
        if(parseInt(req.query?.error) < 0 || parseInt(req.query?.error) > errors.length) return res.render('plants',{plantsData : plants, error : 'errore nel codice errore', csrf : req.session.csrf});
        if(parseInt(req.query?.error)) return  res.render('plants',{plantsData : plants, error : errors[req.query?.error] , csrf : req.session.csrf});
        res.render('plants',{plantsData : plants, error : '' , csrf : req.session.csrf});
    } catch (error) {
        res.render('error');
    }

})

Router.get("/plant", async (req, res) => {
    // search the query id

    if(!req.query?.id ) return  res.redirect('plants?error=2');
    // se il numero è NaN
    if(!parseInt(req.query?.id)) return res.redirect('plants?error=3');

    const id = req.query.id;
    console.log(req.query.id);
    const plants = await models.plants.findAll({

        include : {
            model : models.photos,
            as : 'photos',
            required: false
        },
        where : {
            idplant : id,
        }
    })
    console.log(plants)
    // se vuoto
    if(plants.length === 0) return res.redirect('plants?error=4');
    res.json(plants);
})

Router.get("/modify", (req, res) => {
    try {
        res.render('modify', {error : '', csrf : req.session.csrf});
    } catch (error) {
        res.render('error');
    }
})
Router.post("/modify",csrfMiddleware,upload.single('image', ) ,async (req, res) => {
    try {
        if(!req.query?.id ) return res.redirect('plants?error=2');
        // se il numero è NaN
        if(!parseInt(req.query?.id)) return res.redirect('plants?error=3');
        const id = req.query.id;
        console.log(id)
        const plant = await models.plants.update(
            {
                name: req.body?.name,
                descriptions: req.body?.description,
        },
            {
                where: {
                    idplant: id,
                },
            },
        );

        if(plant[0] === 0) return res.redirect('plants?id=4');
        if (!req?.file)  return res.json({id : id});
        // se non ci sta il file termina il route altrimenti modifica immagine

        const image = await models.photos.update(
            {
                path : req.file.path,
            },
            {
                where: {
                    plant_id: id,
                },
            },
        );
        if(image[0] === 0) {
            const image = await models.photos.create({
                path : req.file.path,
                plant_id: id,
            });
        }
        console.log(image)
        res.redirect('/plants');
    } catch (error) {
        res.render('error');
    }
})


Router.get("/delete",csrfMiddleware, async (req, res) => {
    // search the query id
try {
    if (!req.query?.id) return res.redirect('plants?id=2');
    // se il numero è NaN
    if (!parseInt(req.query?.id)) return res.redirect('plants?id=3');

    const id = req.query.id;
    const plants = await models.plants.destroy({
        where: {
            idplant: id,
        }
    })
    console.log(plants)
    // se non elimina
    if (plants === 0) return res.redirect('plants?id=4');

    res.redirect('/plants');
} catch (error) {
    res.render('error');
}
})



module.exports = Router;