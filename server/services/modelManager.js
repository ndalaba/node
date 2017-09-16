const Model = require('../models').Model;
const Brand = require('../models').Brand;

class ModelManager {

    getAll(cb, err) {
        return Model.findAll({
            include: [{
                model: Brand,
            }],
            order: [['name', 'ASC']]
        }).then((models) => {
            cb(models);
        }).catch(error => err(error));
    }

    byId(id, cb, err) {
        return Model.findById(id).then(model => {
            cb(model);
        }).catch(error => err(error));
    }

    byBrand(brand_id, cb, err) {
        return Model.findAll({
            include: [{
                model: Brand,
            }],
            where: {
                brand_id: brand_id
            }, order: [['name', 'ASC']]
        }).then((models) => {
            cb(models);
        }).catch(error => err(error));
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

    addModel(data, brand_id, cb, err) {
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
                        bulkModels.push({name: name, brand_id: brand_id});
            });
            return Model.bulkCreate(bulkModels).then(() => {
                cb();
            }).catch(error => err(error));
        }).catch(error => err(error));
    }

    editModel(data, cb, err) {
        return this.byId(data.id, (model) => {
            return model.update(data).then(() => {
                cb();
            });
        }, err);
    }

}

module.exports = new ModelManager();