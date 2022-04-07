import { Department, TeamMember } from "../db/models";
import { CreateDepartment } from "../validations/department.validations";
import Sequelize from "sequelize";

export default class {

  static async index() {
    const departments = await Department.findAll({
      where: {
        deleted: 0
      },
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")), "teamMembers"]]
      },
      include: [{
        model: TeamMember, attributes: []
      }]
    });
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
        id,
        deleted: 0
      }, attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")), "teamMembers"]]
      },
      include: [{
        model: TeamMember, attributes: []
      }]
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
        id,
        deleted: 0
      },
    });
    return { data: department };
  }

  static async delete(req) {
    const { id } = req.params;
    const department = await Department.update({ deleted: 1}, {
      where: {
        id
      },
    });
    return { data: department };
  }
}
