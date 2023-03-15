const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  var categories = await Category.findAll({
    include: [
      Product
    ]
  })
  res.send(JSON.stringify(categories, null, 2))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  var category = await Category.findAll({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  })
  res.send(JSON.stringify(category, null, 2))
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "new tag"
    }
  */
  Category.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      category_name: "new tag"
    }
  */
    Category.update(req.body, {where: {id: req.params.id}})
    .then((cat) => {
      res.status(200).json({id: req.params.id, category_name: req.body.category_name});
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send(`Successfully deleted category associated with id: ${req.params.id}`)
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
