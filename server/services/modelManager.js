const Model = require('../models').Model;

class ModelManager {

    getAll(cb, err) {
        return Model.findAll().then((models) => {
            cb(models);
        }).catch(error => err(error));
    }

    byId(id, cb, err) {
        return Model.findById(id).then(model => {
            cb(model);
        }).catch(error => err(error));
        ;
    }

    byBrand(brand_id) {
        return Model.find({
            where: {
                brand_id: brand_id
            }
        });
    }

    deleteModel(id, cb, err) {
        return Model.destroy({
            where: {
                id: id
            }
        }).then(() => {
            cb()
        }).catch(error => err(error));
    }

    addModel(data, cb, err) {
        let bulkModels = [];
        let postedNames = data.split(',');
        let existingModelName = [];
        Model.findAll().then((modelDatas) => {
            modelDatas.forEach((br) => {
                existingModelName.push(br.get('name'));
            });
            postedNames.forEach((name) => {
                if (name.trim() !== "")
                    if (existingModelName.indexOf(name) === -1)
                        bulkModels.push({name: name});
            });
            return Model.bulkCreate(bulkModels).then(() => {
                cb();
            }).catch(error => err(error));
        }).catch(error => err(error));
    }

    editModel(data) {
        return this.byId(data.id, () => {
            return Model.update(data);
        });
    }


}

module.exports = new ModelManager();