let express = require('express');
let router = express.Router();
let isAdmin = require('../middlewares/isAdmin');
let config= require('../config/app.config');

let userManager = require('../services/userManager');
let uploader = require('../services/imageUploader');

router.use(isAdmin);
router.post('/photo/:id', uploader.upload('photos/').any(), (req, res) => {

  userManager.byId(req.params.id, user => {
    user.update({
      photo: 'photos/' + req.files[0].filename
    }).then(() => res.json({
      success: 1,
      message: "Photo profil modifiée",
      photo: 'photos/' + req.files[0].filename
    }));
  }, error => res.status(400).send(error));

});

router.get('/supprimer/:id', (req, res, next) => {
  userManager.deleteUser(req.params.id,()=>{
    res.json({
      success: 1,
      message: "Utilisateur supprimé"
    });
  }, error => res.status(400).send(error));
});

router.post('/modifier/:id', (req, res, next) => {
  //userManager.byId
  userManager.editUser(req.body).then(() => {
    res.json({
      success: 1,
      message: "Utilisateur modifié"
    });
  });
});

router.get('/modifier/:id', (req, res, next) => {
  if (req.xhr) {
    userManager.byId(req.params.id, user => res.json({success:1,user:user}), error => error => res.status(400).send(error));
  } else res.render('layout', {
    title: 'Modification utilisateur',
    description: "Modification utilisateur"
  });
});

router.get('/liste', (req, res, next) => {
  if (req.xhr) {
    userManager.getAll((users) => res.json({success:1,users:users}), (error) => res.status(400).send(error));
  } else
    res.render('layout', {
      title: 'Liste utilisateurs',
      description: "Liste utilisateurs"
    });
});

router.get('/ajouter', (req, res, next) => {
  res.render('layout', {
    title: 'Ajouter un utilisateur',
    description: "Ajouter un utilisateur"
  });
});
router.post('/ajouter', (req, res, next) => {
  UserManager.byMail(req.body.email).then(user => {
    if (!user) {
      userManager.addUser(req.body, () => res.json({
        success: 1,
        message: "Utilisateur enregistré"
      }), error => res.status(400).send(error));
    } else
      res.json({
        success: 0,
        message: "Adresse email déja enregistrée"
      });
  }).catch(error => res.status(400).send(error));

});

router.get('/roles', (req, res, next) => {
  res.send(config.roles);
});

module.exports = router;