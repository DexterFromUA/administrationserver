const News = require("../models").news;

module.exports = {
  getAll: (req, res) => {
    return News.findAndCountAll({
      order: [["createdAt", "DESC"]],
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => res.status(400).send(error));
  },
};
