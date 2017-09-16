let express = require('express');
let router = express.Router();
let isAdmin = require('../middlewares/isAdmin');

let modelManager = require('../services/modelManager');

router.use(isAdmin)

router.get('/supprimer/:id', (req, res, next) => {
    modelManager.deleteModel(req.params.id, () => {
        res.json({
            success: 1,
            message: "Marque supprimée"
        });
    }, error => res.status(400).send(error));
});

router.post('/modifier/:id', (req, res, next) => {
    modelManager.editModel(req.body, () => {
        res.json({
            success: 1,
            message: "Model modifié"
        });
    }, error => res.status(400).send(error));
});

router.get('/modifier/:id', (req, res, next) => {
    if (req.xhr) {
        modelManager.byId(req.params.id, model => res.json({
            success: 1,
            model: model
        }), error => error => res.status(400).send(error));
    } else res.render('layout', {
        title: 'Modification model',
        description: "Modification model"
    });
});

router.get('/marques/:id', (req, res, next) => {
    if (req.xhr) {
        modelManager.byBrand(req.params.id, (models) => {
            return res.json({success: 1, models: models})
        }, (error) => res.status(400).send(error))
    } else res.redirect('/models/liste');
});

router.get('/liste', (req, res, next) => {
    if (req.xhr) {
        modelManager.getAll((models) => res.json({success: 1, models: models}), (error) => res.status(400).send(error));
    } else
        res.render('layout', {
            title: 'Liste models',
            description: "Liste models"
        });
});

router.get('/ajouter', (req, res, next) => {
    res.render('layout', {
        title: 'Ajouter des models',
        description: "Ajouter des models"
    });
});

router.post('/ajouter', (req, res, next) => {
    modelManager.addModel(req.body.name, req.body.brand_id, () => res.json({
        success: 1,
        message: "Models enregistrées"
    }), error => res.status(400).send(error));
});

module.exports = router;