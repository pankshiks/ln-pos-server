const createError = require("http-errors");
const ShopService = require("../Services/Shop");

exports.getAllShops = async (req, res, next) => {
  try {
    const shops = await ShopService.getAllShops();
    res.json({ data: shops, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createShop = async (req, res, next) => {
    try {
      const { name, email, phone, address, country, vat, currency } = req.body
      await ShopService.createShop({ name, email, phone, address, country, vat, currency, image: req.file.buffer });
      res.json({ message: "Shop Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getShopById = async (req, res, next) => {
  try {
    const shop = await ShopService.getShopById(req.params.id);
    if(!shop) throw createError.NotFound()
    res.json({ data: shop, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    const { name, email, phone, address, country, vat, currency } = req.body
    const shop = await ShopService.updateShop(req.params.id, {name, email, phone, address, country, vat, currency, image: req.file.buffer });
    if(!shop) throw createError.NotFound()
    res.json({ message: "Shop Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const shop = await ShopService.deleteShop(req.params.id);
    if(!shop) throw createError.NotFound()
    res.json({ message: "Shop Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getShopLogo = async (req, res, next) => {
  try {
    const shops = await ShopService.getAllShops();
    res.json({ data: shops[0].image, status: "success" });
  } catch (err) {
    next(err)
  }
};

