const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });

    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// yields all stored categories with associated product details

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    const category = categoryData.get({ plain: true });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// yields the single category details

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// creates new categories

router.put('/:id', async (req, res) => {
  try {
  const updateCategory = await Category.update(req.body, { where: {id: req.params.id} });

    res.status(200).json(updateCategory);    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// uses the id passed through in the request to target a row and updates the specified fields for that object

router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({ where: {id: req.params.id} });

    res.status(200).json(delCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);    
  }
});
// deletes the object where the id matches the id passed through on the request

module.exports = router;
