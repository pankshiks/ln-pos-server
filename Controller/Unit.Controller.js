const createError = require("http-errors");
const UnitService = require("../Services/Unit");
const jwt = require('jsonwebtoken');

exports.getAllUnits = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    const units = await UnitService.getAllUnits(limit, skip);
    res.json({ data: units, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createUnit = async (req, res, next) => {
    try {
        const unit = await UnitService.createUnit(req.body);
        res.json({ message: "Unit Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getUnitById = async (req, res, next) => {
  try {
    const unit = await UnitService.getUnitById(req.params.id);
    if(!unit) throw createError.NotFound()
    res.json({ data: unit, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateUnit = async (req, res, next) => {
  try {
    const unit = await UnitService.updateUnit(req.params.id, req.body);
    if(!unit) throw createError.NotFound()
    res.json({ message: "Unit Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteUnit = async (req, res, next) => {
  try {
    const unit = await UnitService.deleteUnit(req.params.id);
    if(!unit) throw createError.NotFound()
    res.json({ message: "Unit Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
