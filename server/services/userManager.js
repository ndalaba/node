const crypto = require('crypto');
const User = require('../models').User;

class UserManager {

    getAll() {
        return User.findAll();
    }

    byId(id) {
        return User.findById(id);
    }

    byMail(email) {
        return User.find({
            where: {
                email: email
            }
        });
    }
    addUser(data) {
        data.password = this.hash(data.plainPassword);
        return User.create(data);
    }
    editUser(data) {
        if (data.plainPassword)
            data.password = this.hash(data.plainPassword);
        return this.byId(data.id).then(user => {
            return user.update(data);
        });
    }
    hash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

module.exports = new UserManager();