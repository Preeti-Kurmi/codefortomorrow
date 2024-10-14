const db = require('../config/db');
const dbQuery=require('../config/dbQuery')


exports.createService = async (req, res) => {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    const result = await dbQuery('INSERT INTO service (category_id, name, type) VALUES (?, ?, ?)', [categoryId, name, type]);
    const serviceId = result.insertId;

    for (let option of priceOptions) {
        await dbQuery('INSERT INTO price_options (service_id, duration, price, type) VALUES (?, ?, ?, ?)',
            [serviceId, option.duration, option.price, option.type]);
    }

    res.status(201).send({ message: 'Service created', serviceId });
};

exports.getServicesByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const services = await dbQuery('SELECT * FROM service WHERE category_id = ?', [categoryId]);
    res.status(200).send(services);
};


exports.updateService = async (req, res) => {
    const { serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    await dbQuery('UPDATE service SET name = ?, type = ? WHERE service_id = ?', [name, type, serviceId]);

  
    for (let option of priceOptions) {
        await dbQuery('UPDATE price_options SET duration = ?, price = ?, type = ? WHERE service_id = ? AND price_option_id = ?',
            [option.duration, option.price, option.type, serviceId, option.price_option_id]);
    }

    res.status(200).send({ message: 'Service updated' });
};


exports.deleteService = async (req, res) => {
    const { serviceId } = req.params;
    await dbQuery('DELETE FROM service WHERE service_id = ?', [serviceId]);
    await dbQuery('DELETE FROM price_options WHERE service_id = ?', [serviceId]);
    res.status(200).send({ message: 'Service deleted' });
};
