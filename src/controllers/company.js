const companyModels = require("../models/company");
const uuid4 = require("uuid/v4");

module.exports = {
  getCompanies: (req, res) => {
    companyModels
      .getCompanies()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getCompany: (req, res) => {
    const { id } = req.params;
    companyModels
      .getCompany(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addCompany: (req, res) => {
    const data = req.body;
    data.id = uuid4();
    if (!req.file) {
      res.json({
        success: false,
        message: "No company logo uploaded or file format is not supported"
      });
      return;
    } else {
      const host = req.hostname;
      req.file.filename = data.name + req.file.filename;
      const filePath =
        req.protocol +
        "://" +
        host +
        ":" +
        process.env.PORT +
        "/" +
        req.file.path;
      data.logo = filePath;
    }

    companyModels
      .addCompany(data)
      .then(() => {
        res.json({
          message: "success",
          data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateCompany: async (req, res) => {
    const data = await req.body;
    const { id } = req.params;
    console.log(data);

    if (req.file) {
      const host = req.hostname;
      req.file.filename = data.name + req.file.filename;
      const filePath =
        req.protocol +
        "://" +
        host +
        ":" +
        process.env.PORT +
        "/" +
        req.file.path;
      data.logo = filePath;
    }

    companyModels
      .updateCompany(id, data)
      .then(() => {
        res.json({
          message: "success",
          data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteCompany: (req, res) => {
    const { id } = req.params;
    // TODO validate delete if is exist
    companyModels
      .deleteCompany(id)
      .then(result => {
        res.json({
          message: "success",
          id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
