const createError = require("http-errors");
const CategoryService = require("../Services/Category");

exports.getAllCategories = async (req, res, next) => {
  try {
    categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err)
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    await CategoryService.createCategory(req.body);
    res.status(201).json({ message: "Category Added Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if(!category) throw createError.NotFound()
    res.status(200).json({ data: category });
  } catch (err) {
    next(err)
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    if(!category) throw createError.NotFound()
    res.status(202).json({ message: "Category Updated Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryService.deleteCategory(req.params.id);
    if(!category) throw createError.NotFound()
    res.status(202).json({ message: "Category Deleted Successfully" });
  } catch (err) {
    next(err)
  }
};
