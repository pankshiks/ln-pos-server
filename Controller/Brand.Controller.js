const createError = require("http-errors");
const BrandService = require("../Services/Brand");

exports.getAllBrands = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    const brands = await BrandService.getAllBrands(limit, skip);
    res.json({ data: brands, status: 200 });
  } catch (err) {
    next(err)
  }
};

exports.createBrand = async (req, res, next) => {
    try {
      await BrandService.createBrand({
          name: req.body.name,
          image: req.file.buffer,
      });
      res.json({ message: "Brand Added Successfully", status: 201 });
    } catch (err) {
        next(err)
    }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await BrandService.getBrandById(req.params.id);
    if(!brand) throw createError.NotFound()
    res.json({ data: brand, status: 200 });
  } catch (err) {
    next(err)
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const brand = await BrandService.updateBrand(req.params.id, {
        name: req.body.name,
        image: req.file.buffer,
    });
    if(!brand) throw createError.NotFound()
    res.json({ message: "Brand Updated Successfully", status: 202 });
  } catch (err) {
    next(err)
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const brand = await BrandService.deleteBrand(req.params.id);
    if(!brand) throw createError.NotFound()
    res.json({ message: "Brand Deleted Successfully", status: 202 });
  } catch (err) {
    next(err)
  }
};
