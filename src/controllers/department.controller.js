const { check, validationResult } = require("express-validator");
const { Department } = require("../db/models");
const { CreateDepartment } = require("../validations/department.validations")

export default class {

  static async index() {
    const departments = await Department.findAll({});
    return { data: departments }
  };

  static async create(req) {
    const createDepartment = await Department.create(req.body);
    if (!createDepartment) {
      return { error: "An error occur when creating a new department" };
    }
    return { data: createDepartment };
  };

  static async get(req) {
    const { id } = req.params;
    const department = await Department.findOne({
      where: {
        id
      }
    });
    return { data: department };
  };

  static async edit(req, res) {
    var { id } = req.params;
    const updateBody = {
      ...req.body,
    };
    const department = await Department.update(updateBody, {
      where: {
        id
      },
    });
    return { data: department };
  }

  static async delete(req) {
    const { id } = req.params;
    const department = await Department.destroy({
      where: {
        id
      }
    });
    return { data: department };
  }
}
