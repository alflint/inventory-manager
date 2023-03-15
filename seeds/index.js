const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedingProcess = {
  sequelize_sync: async function(){
    await sequelize.sync({ force: true });
  },
  seed_categories: async function(){
    await seedCategories();
  },
  seed_products: async function(){
    await seedProducts();
  },
  seed_tags: async function(){
    await seedTags();
  },
  seed_product_tags: async function(){
    await seedProductTags();
  }
}

const seedAll = async () => {
  console.log("\n----- BEGINNING SEEDING OF DATABASE-----\n");

  for (const [key, func] of Object.entries(seedingProcess)) {
    await func()
    console.log(`${key}: ✅`);
  }

  console.log("\n----- FINISHED SEEDING OF DATABASE -----\n");
};

module.exports = seedAll
