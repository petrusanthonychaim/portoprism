const { Stock, Sector, Profile } = require("../models/index.js");
const { Op } = require("sequelize");


class Controller {
  static async dashboard(req, res) {
    try {
      // const loginUser = req.session.userId dont forget to put login usher in the output
      //RAW DATA
      let id = 0;
      const profile = await Profile.findAll ({})
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

      res.render("userReport", { stockByUser, profile, id });
    } catch (error) {
      res.send(error);
    }
  }

static async redashboard(req, res) {
  try {
    //RAW DATA
    // let {id} = req.query

  let { ProfileId } = req.body;
   
      const stockByUser = await Stock.findAll({
        where: {
          ProfileId: { [Op.eq]: ProfileId },
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
      const profile = await Profile.findByPk(ProfileId);

      res.render("userReport", { stockByUser,profile,ProfileId });
      // res.redirect ('/')
      // res.send(ProfileId);
    } catch (error) {
      res.send(error);
    }
  }

  
  static async editStock(req, res) {
    try {
      //RAW DATA

      // let { ProfileId } = req.body;
      const { id } = req.params
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
      const profile = await Profile.findByPk(id);
      //console.log(allTable);

      res.render("editStock.ejs", { stockByUser, profile, id });
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteStock(req, res) {
    try {
      const { id } = req.params;
      const stockByUser = await Stock.findByPk(+id);

      if (!stockByUser) throw "Book not found!";

      await Stock.destroy({
        where: {
          id: +id,
        },
      });
      res.redirect(`/stocks/${stockByUser.ProfileId}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async addForm(req, res) {
    try {
      const { id } = req.params
      const stocks = await Stock.findAll();
      const sectors = await Sector.findAll();
      // res.send(authors)
      res.render("addForm.ejs", { stocks, sectors, id });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveFormAdd(req, res) {
    try {
      const { id } = req.params
      const { code, stockName, price, shares, SectorId } = req.body;
      const transactiondate = new Date();

      await Stock.create({
        code,
        stockName,
        price: +price,
        shares: +shares,
        ProfileId: +id,
        SectorId: +SectorId,
        transaction_date: transactiondate
      });
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let err = [];
        err = error.errors.map((el) => {
          return el.message;
        });
        res.send(err);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async buyStockById(req, res) {
    try {
      const { id } = req.params;
      const stock = await Stock.findByPk(+id);

      // res.send (stock)

      await Stock.increment(
        { shares: 1 },
        {
          where: {
            id: +id,
          },
        }
      );

      res.redirect(`/stocks/${stock.ProfileId}`);

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  
}

//deleteStock
module.exports = Controller;

//addForm
//rewriteStock
