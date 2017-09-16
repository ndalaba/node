const Brand = require('../models').Brand;

class BrandManager {

    getAll(cb, err) {
        return Brand.findAll({
            order: [
                ['name', 'ASC']]
        }).then((brands) => {
            cb(brands);
        }).catch(error => err(error));
    }

    byId(id, cb, err) {
        return Brand.findById(id).then(brand => {
            cb(brand);
        }).catch(error => err(error));
    }

    byName(name) {
        return Brand.find({
            where: {
                name: name
            },
            order: [
                ['name', 'ASC']]
        });
    }

    deleteBrand(id, cb, err) {
        return Brand.destroy({
            where: {
                id: id
            }
        }).then(() => {
            cb()
        }).catch(error => err(error));
    }

    addBrand(data, cb, err) {
        let bulkBrands = [];
        let postedNames = data.split(',');
        let existingBrandName = [];
        Brand.findAll().then((brandDatas) => {
            brandDatas.forEach((br) => {
                existingBrandName.push(br.get('name'));
            });
            postedNames.forEach((name) => {
                if (name.trim() !== "")
                    if (existingBrandName.indexOf(name) === -1)
                        bulkBrands.push({name: name});
            });
            return Brand.bulkCreate(bulkBrands).then(() => {
                cb();
            }).catch(error => err(error));
        }).catch(error => err(error));
    }

    editBrand(data, cb, err) {
        return this.byId(data.id, (brand) => {
            return brand.update(data).then(() => {
                cb()
            });
        }, err);
    }


}

module.exports = new BrandManager();