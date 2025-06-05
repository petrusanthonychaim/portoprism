const { Stock, Sector, Profile } = require("../models/index.js");
const { Op } = require("sequelize");

class Controller {
  static async dashboard(req, res) {
    try {
      //RAW DATA
      let id = 2
      const stockByUser = await Stock.findAll({
        where: {
          ProfileId: { [Op.eq]: id },
        },
        include: [
          {
            model: Sector,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Profile,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      //---
      const profile = await Profile.findByPk(id)
      //console.log(allTable);

      res.render("userReport", { stockByUser,profile,id });
    } catch (error) {
      res.send(error);
    }
  }

    static async dashboard(req, res) {
    try {
      //RAW DATA
      let id = 2
      const stockByUser = await Stock.findAll({
        where: {
          ProfileId: { [Op.eq]: id },
        },
        include: [
          {
            model: Sector,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Profile,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      //---
      const profile = await Profile.findByPk(id)
      //console.log(allTable);

      res.render("userReport", { stockByUser,profile,id });
    } catch (error) {
      res.send(error);
    }
  }

}

module.exports = Controller;
