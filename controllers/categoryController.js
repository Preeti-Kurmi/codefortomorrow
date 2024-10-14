const db = require('../config/db');
const dbQuery=require('../config/dbQuery')

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    const result = await dbQuery('INSERT INTO category (name) VALUES (?)', [name]);
    res.status(201).send({ message: 'Category created', categoryId: result.insertId });
};

// Get all categories
exports.getCategories = async (req, res) => {
    const categories = await dbQuery('SELECT * FROM category');
    res.status(200).send(categories);
};

// Update category
exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    await dbQuery('UPDATE category SET name = ? WHERE category_id = ?', [name, categoryId]);
    res.status(200).send({ message: 'Category updated' });
};

// Delete empty category
exports.deleteEmptyCategory = async (req, res) => {
    const { categoryId } = req.params;
    const services = await dbQuery('SELECT * FROM service WHERE category_id = ?', [categoryId]);

    if (services.length > 0) {
        return res.status(400).send({ message: 'Cannot delete category with services' });
    }

    await dbQuery('DELETE FROM category WHERE category_id = ?', [categoryId]);
    res.status(200).send({ message: 'Category deleted' });
};
