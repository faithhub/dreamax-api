import { Department, TeamMember } from "../db/models";
import Sequelize from "sequelize";
import { validateSchema } from "../validations/department.validations";
const Op = Sequelize.Op;

export default class {

  static async index() {
    const departments = await Department.findAll({
      where: {
        deleted: 0
      },
      // attributes: {
      //   include: [[Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")), "teamMembers"]]
      // },
      // include: [{
      //   model: TeamMember, attributes: []
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
      return { error: "Department name already exists" };
    }

    const checkEmail = await Department.count({
      where: { email }
    });

    if (checkEmail > 0) {
      return { error: "Department email already exists" };
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

  static async edit(req) {

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error };
    }

    var { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;
    const updateBody = { ...req.body };

    const checkName = await Department.count({
      where: {
        name,
        id: { [Op.notIn]: [id] }
      }
    });

    if(checkName > 0){
      return { error: "Department name already exists" };
    }

    const checkEmail = await Department.count({
      where: {
        email,
        id: { [Op.notIn]: [id] }
      }
    });

    if(checkEmail > 0){
      return { error: "Department email already exists" };
    }

    const department = await Department.update(updateBody, {
      where: {
        id,
        deleted: 0
      },
    });

    return { data: department };
  };

  static async delete(req) {
    const { id } = req.params;
    const department = await Department.update({ deleted: 1 }, {
      where: {
        id
      },
    });

    return { data: department };
  };

};
