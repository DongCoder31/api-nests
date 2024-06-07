const productsServices = require("../services/products.services");
const upload = require("../middleware/upload.js");
const { Product } = require("../models/products.model");

// Create and Save a new Product
exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path = req.file ? req.file.path.replace(/\\/g, "/") : "";
      const colors = Array.isArray(req.body.colors) ? req.body.colors : [];
      const images = req.body.images || [];
      const model = {
        id: req.body.id,
        name: req.body.name,
        company: req.body.company,
        price: req.body.price,
        avatar: req.body.avatar,
        colors: colors,
        description: req.body.description,
        category: req.body.category,
        featured: req.body.featured === 'true',
        stock: req.body.stock,
        reviews: req.body.reviews,
        stars: req.body.stars,
        images: images,
      };

      console.log('Have create new');

      Product.create(model)
        .then(results => {
          res.status(200).send({
            message: "Success",
            data: results,
          });
        })
        .catch(error => {
          next(error);
        });
    }
  });
};


// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
  var model = {
    productName: req.query.productName,
  };
  console.log('Have find all new');

  productsServices.getProducts(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      results,
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };
  console.log('Have find new');

  productsServices.getProductById(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

// Update a Product by the id in the request
exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path = req.file ? req.file.path.replace(/\\/g, "/") : "";
      const colors = Array.isArray(req.body.colors) ? req.body.colors : [];
      const images = req.body.images || [];
      const model = {
        _id: req.body._id,
        id: req.body.id,
        name: req.body.name,
        company: req.body.company,
        price: req.body.price,
        avatar: req.body.avatar,
        colors: colors,
        description: req.body.description,
        category: req.body.category,
        featured: req.body.featured === 'true',
        stock: req.body.stock,
        reviews: req.body.reviews,
        stars: req.body.stars,
        images: images,
      };

      console.log('Have update new');

      productsServices.updateProduct(model, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });
    }
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };

  productsServices.deleteProduct(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};
