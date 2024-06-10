const createError = require("http-errors");
const CategoryService = require("../Services/Category");

exports.getAllCategories = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    category = await CategoryService.getAllCategories(limit, skip);
    res.json({ data: category, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    await CategoryService.createCategory(req.body);
    res.json({ message: "Category Added Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if(!category) throw createError.NotFound()
    res.json({ data: category, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    if(!category) throw createError.NotFound()
    res.json({ message: "Category Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryService.deleteCategory(req.params.id);
    if(!category) throw createError.NotFound()
    res.json({ message: "Category Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
