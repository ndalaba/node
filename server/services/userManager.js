const crypto = require('crypto');
const User = require('../models').User;

class UserManager {

    getAll(cb, err) {
        return User.findAll().then((users) => {
            cb(users);
        }).catch(error => err(error));
    }

    byId(id, cb, err) {
        return User.findById(id).then(user => {
            cb(user);
        }).catch(error => err(error));
    }

    byMail(email) {
        return User.find({
            where: {
                email: email
            }
        });
    }
    addUser(data, cb, err) {
        data.password = this.hash(data.plainPassword);
        return User.create(data).then(() => {
            cb();
        }).catch(error => err(error));
    }
    editUser(data) {
        if (data.plainPassword)
            data.password = this.hash(data.plainPassword);
        return this.byId(data.id, user => {
            return user.update(data);
        });
    }
    deleteUser(id, cb, err) {
        return User.destroy({
            where: {
                id: id
            }
        }).then(() => {
            cb()
        }).catch(error => err(error));
    }
    setPhoto(id, filename) {
        return this.byId(id).then(user => {
            return user.update({
                photo: filename
            });
        });
    }
    hash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

module.exports = new UserManager();