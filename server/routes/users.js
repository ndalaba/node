var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

/*var upload = multer({
  dest: __dirname + "../public/uploads/photos/"
});*/
var upload = multer().single('photo')

/*var filename;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "../public/uploads/photos/");
  },
  filename: function (req, file, callback) {
    filename = file.fieldname + "_" + Date.now() + "_" + file.originalname;
    callback(null, filename);
  }
});

var upload = multer({
  storage: Storage
});*/

let userManager = require('../services/userManager');

router.post('/photo/:id', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Image non conforme");
    } else {
      data = req.body;
      data.photo = filename;
      userManager.editUser(data).then(() => {
        return res.end({
          success: 1,
          message: "Image modifiée",
          photo: filename
        });
      });
    }

  });
});

router.post('/modifier/:id', (req, res, next) => {
  userManager.editUser(req.body).then(() => {
    res.send({
      success: 1,
      message: "Utilisateur modifié"
    });
  });
});

router.get('/modifier/:id', (req, res, next) => {
  if (req.xhr) {
    userManager.byId(req.params.id).then(user => {
      res.send(user);
    });
  } else res.render('layout', {
    title: 'Modification utilisateur',
    description: "Modification utilisateur"
  });
});

router.get('/liste', (req, res, next) => {
  if (req.xhr) {
    userManager.getAll().then(users => {
      res.send(users);
    });
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
  userManager.byMail(req.body.email).then(user => {
    if (!user) {
      console.log('user not exist');
      userManager.addUser(req.body).then(() => {
        console.log('user created');
        res.send({
          success: 1,
          message: "Utilisateur enregistré"
        });
      }).catch(error => res.status(400).send(error));
    } else
      res.send({
        success: 0,
        message: "Adresse email déja enregistrée"
      });
  }).catch(error => res.status(400).send(error));

});

router.get('/roles', (req, res, next) => {
  res.send(['ROLE_USER', 'ROLE_ADMIN']);
});

module.exports = router;