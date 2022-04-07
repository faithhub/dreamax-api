import { Department, TeamMember } from "../db/models";
import Sequelize from "sequelize";
import { validateSchema } from "../validations/department.validations";

export default class {

  static async index() {
    const departments = await Department.findAll({
      // attributes: {
      //   include: [[Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")), "teamMembers"]]
      // },
      // include: [{
      //   model: TeamMember, attributes:[]
      // }]
    });
    return { data: departments }
  };

  static async create(req) {

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error };
    }

    const { name } = req.body;
    const { email } = req.body;

    const checkName = await Department.count({
      where: { name }
    })

    if (checkName > 0) {
      return { error: "Department name already exist" };
    }

    const checkEmail = await Department.count({
      where: { email }
    })

    if (checkEmail > 0) {
      return { error: "Department email already exist" };
    }

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
      }, attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")), "teamMembers"]]
      },
      include: [{
        model: TeamMember, attributes: []
      }]
    });
    return { data: department };
  };

  static async edit(req) {

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error };
    }
    const { name } = req.body;
    const { email } = req.body;

    const checkName = await Department.count({
      where: { name }
    })

    if (checkName > 0) {
      return { error: "Department name already exist" };
    }

    const checkEmail = await Department.count({
      where: { email }
    })

    if (checkEmail > 0) {
      return { error: "Department email already exist" };
    }
    
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
  };

  static async delete(req) {
    const { id } = req.params;
    const department = await Department.destroy({
      where: {
        id
      }
    });
    return { data: department };
  };

}
