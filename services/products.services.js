const { Product } = require("../models/products.model");

async function createProduct(params, callback) {
  if (!params.productName) {
    return callback(
      {
        message: "Product Name Required",
      },
      ""
    );
  }

  const productModel = new Product(params);
  productModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProducts(params, callback) {
  const productName = params.productName;
  var condition = productName
    ? { productName: { $regex: new RegExp(productName), $options: "i" } }
    : {};

  Product
    .find()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProductById(params, callback) {
  const productId = params.productId;

  Product
    .findById(productId)
    .then((response) => {
      if (!response) callback("Not found Product with id " + productId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateProduct(params, callback) {
  const productId = params._id;

  Product
    .findByIdAndUpdate(productId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback(`Cannot update Tutorial with id=${productId}. Maybe Tutorial was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteProduct(params, callback) {
  const productId = params.productId;

  Product
    .findByIdAndRemove(productId)
    .then((response) => {
      if (!response) callback(`Cannot delete Product with id=${productId}. Maybe Product was not found!`);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
