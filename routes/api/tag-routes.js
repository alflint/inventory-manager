const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  var tags = await Tag.findAll({
    include: [
      Product
    ]
  })
  res.send(JSON.stringify(tags, null, 2))
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  var tag = await Tag.findAll({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  })
  res.send(JSON.stringify(tag, null, 2))
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "new tag"
    }
  */
 Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this...
    {
      tag_name: "new tag"
    }
  */
  Tag.update(req.body, {where: {id: req.params.id}})
    .then((tag) => {
      res.status(200).json({id: req.params.id, tag_name: req.body.tag_name});
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value]
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send(`Successfully deleted tag associated with id: ${req.params.id}`)
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
