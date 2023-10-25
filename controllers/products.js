const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

  // throw new Error('testing async errors');
  const products = await Product.find({})
  res.status(200).json({ products })

  // This explained the products with feature true and the next link gives the products and the number 
  // const products = await Product.find({ featured: true })
  // res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'Products testing route' })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
