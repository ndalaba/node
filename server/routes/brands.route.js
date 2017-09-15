let express = require('express');
let router = express.Router();
let isAdmin = require('../middlewares/isAdmin');

let brandManager = require('../services/brandManager');

//router.use(isAdmin)

router.get('/supprimer/:id', (req, res, next) => {
    brandManager.deleteBrand(req.params.id, () => {
        res.json({
            success: 1,
            message: "Marque supprimée"
        });
    }, error => res.status(400).send(error));
});

router.post('/modifier/:id', (req, res, next) => {
    brandManager.editBrand(req.body, () => {
        res.json({
            success: 1,
            message: "Marque modifié"
        });
    }, error => res.status(400).send(error));
});

router.get('/modifier/:id', (req, res, next) => {
    if (req.xhr) {
        brandManager.byId(req.params.id, brand => res.json(brand), error => error => res.status(400).send(error));
    } else res.render('layout', {
        title: 'Modification marque',
        description: "Modification marque"
    });
});

router.get('/liste', (req, res, next) => {
    if (req.xhr) {
        brandManager.getAll((brands) => res.json(brands), (error) => res.status(400).send(error));
    } else
        res.render('layout', {
            title: 'Liste marques',
            description: "Liste marques"
        });
});

router.get('/enregistrer/*', (req, res, next) => {
    res.render('layout', {
        title: 'Ajouter des marques',
        description: "Ajouter des marques"
    });
});

router.post('/ajouter', (req, res, next) => {
    brandManager.addBrand(req.body.name, () => res.json({
        success: 1,
        message: "Marques enregistrées"
    }), error => res.status(400).send(error));
});

module.exports = router;