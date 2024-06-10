const StatService = require("../Services/Stats");

exports.getAllStats = async (req, res, next) => {
  try {
    const stats = await StatService.getStats();
    res.json({ data: stats, status: "success" });
  } catch (err) {
    next(err)
  }
};
