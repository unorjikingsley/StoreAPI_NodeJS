const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

  // throw new Error('testing async errors');
  const products = await Product.find({ price: { $gt: 30 }}).sort('price').select('name price');
  res.status(200).json({ products })

  // This explained the products with feature true and the next link gives the products and the number 
  // const products = await Product.find({ featured: true })
  // res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  // find filtered products 
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {   // get all the items with a particular alphabet
    queryObject.name = { $regex: search, $options: 'i' }
  }

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  // select certain fields 
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = fields.sort(fieldsList)
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '?>=': '$gt',
      '=': '$gt',
      '<': '$gt',
      '<=': '$gt',
    }

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // get total number of items or any numeric value
  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit)

  // console.log(queryObject.query)

  // ..... 
  // const products = await Product.find(queryObject);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length })
}



module.exports = {
  getAllProductsStatic,
  getAllProducts,
}
