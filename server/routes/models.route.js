let express = require('express');
let router = express.Router();
let isAdmin = require('../middlewares/isAdmin');

let modelManager = require('../services/modelManager');

//router.use(isAdmin)

router.get('/supprimer/:id', (req, res, next) => {
  modelManager.deleteModel(req.params.id,()=>{
    res.json({
      success: 1,
      message: "Marque supprimée"
    });
  }, error => res.status(400).send(error));
});

router.post('/modifier/:id', (req, res, next) => {
  modelManager.editModel(req.body).then(() => {
    res.json({
      success: 1,
      message: "Marque modifié"
    });
  });
});

router.get('/modifier/:id', (req, res, next) => {
  if (req.xhr) {
    modelManager.byId(req.params.id, model => res.json(model), error => error => res.status(400).send(error));
  } else res.render('layout', {
    title: 'Modification marque',
    description: "Modification marque"
  });
});

router.get('/liste', (req, res, next) => {
  if (req.xhr) {
    modelManager.getAll((models) => res.json(models), (error) => res.status(400).send(error));
  } else
    res.render('layout', {
      title: 'Liste marques',
      description: "Liste marques"
    });
});

router.get('/ajouter', (req, res, next) => {
  res.render('layout', {
    title: 'Ajouter des marques',
    description: "Ajouter des marques"
  });
});

router.post('/ajouter', (req, res, next) => {
    modelManager.addModel(req.body.name, () => res.json({
        success: 1,
        message: "Marques enregistrées"
    }), error => res.status(400).send(error));
});

module.exports = router;