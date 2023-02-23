const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });

    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// yields all stored tags with associated product details

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({ where: {id: req.params.id} ,
      include: [
        { model: Product,
          through: ProductTag, }
      ],
    });

    const tag = tagData.get({ plain: true})
    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// yields the single tag stored details with associated product details

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// adds a new tag to the db

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, { where: {id: req.params.id} });

    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// updates a tag from the db

router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({ where: {id: req.params.id} });

    res.status(200).json(delTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);    
  }
});
// deletes a tag from the db

module.exports = router;
