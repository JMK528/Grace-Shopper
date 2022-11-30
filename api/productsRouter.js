const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct } = require('../db');

const { requireAdmin } = require('./utils');

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  console.log('in products route')
  try {
    const allProducts = await getAllProducts();
    console.log(allProducts,'allprods')
    if (!allProducts) {
      res.send('No products found.')
    }
    res.send(allProducts)

   
  } catch (err) {
    console.log('productsRouter.get-productsRouter.js FAILED', err)
    next(err)
  }
});

productsRouter.post('/create-product', requireAdmin, async (req, res, next) => {
  try {
    const product = await createProduct({
      title,
      description,
      price,
      count
      
    })

    if (product && requireAdmin) {
      res.send(product)
    }
  } catch (err) {
    console.log('productsRouter.post FAILED', err)
    next(err)
  }
});

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  const { title, description, price, count } = req.body;
  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (description) {
    updateFields.description = description
  }

  if (price) {
    updateFields.price = price;
  }

  if (count) {
    updateFields.count = count;

  }
  try {
    const updatedProduct = await updateProduct(productId, updateFields)

    if (updatedProduct) {
      res.send(updatedProduct)
    } else {
      res.send('Error updating product.')
    }
  } catch (err) {
    console.log('productsRouter.patch FAILED', err)
    next(err)
  }
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
  try {
    const product = await getProductById(productId)
    const deletedProduct = await deleteProduct(product.id, { active: false })

    if (deletedProduct) {
      res.send(deletedProduct, 'This product was deleted.')
    } else {
      res.send('Error deleting product.')
    }
  } catch (err) {
    console.log('productRouter.delete FAILED', err)
    next(err)
  }
});

module.exports = productsRouter;
