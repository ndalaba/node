const crypto = require('crypto');
const User = require('../models').User;

class BrandManager {

    getAll(cb,err) {
        return User.findAll().then((users) => {
            cb(users);
        }).catch(error => err(error));
    }

    byId(id,cb,err) {
        return User.findById(id).then(user=>{
            cb(user);
        }).catch(error => err(error));;
    }

    byMail(email) {
        return User.find({
            where: {
                email: email
            }
        });
    }
    addUser(data,cb,err) {
        data.password = this.hash(data.plainPassword);
        return User.create(data).then(()=>{
            cb();
        }).catch(error => err(error));
    }
    editBrand(data) {
        return this.byId(data.id, user => {
            return user.update(data);
        });
    }
    
  
}

module.exports = new BrandManager();