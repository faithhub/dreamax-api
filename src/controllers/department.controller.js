import { Department, TeamMember } from "../db/models";
import Sequelize from "sequelize";
import { validateSchema } from "../validations/department.validations";
const Op = Sequelize.Op;

export default class {
  static async index() {
    let departments = await Department.findAll({
      where: {
        deleted: 0,
      },
    });
    const teamMembers = await TeamMember.findAll({
      where: {
        deleted: 0,
      },
    });

    let collateTeamMember;

    collateTeamMember = departments.map((el) => {
      const { id } = el;
      let teamMemberObject = {};
      let teamMember;

      teamMember = teamMembers.filter((element) => element.departmentId == id);

      teamMemberObject["id"] = el.id;
      teamMemberObject["storeId"] = el.storeId;
      teamMemberObject["name"] = el.name;
      teamMemberObject["email"] = el.email;
      teamMemberObject["status"] = el.status;
      teamMemberObject["labelColor"] = el.labelColor;
      teamMemberObject["description"] = el.description;
      teamMemberObject["deleted"] = el.deleted;
      teamMemberObject["createdAt"] = el.createdAt;
      teamMemberObject["updatedAt"] = el.updatedAt;
      teamMemberObject["teamMembers"] = teamMember.length;

      return teamMemberObject;
    });

    return { data: collateTeamMember };
  }

  static async create(req) {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error.details[0].message };
    }

    const { name } = req.body;
    const { email } = req.body;

    const checkName = await Department.count({
      where: { name },
    });

    if (checkName > 0) {
      return { error: "Department name already exists" };
    }

    const checkEmail = await Department.count({
      where: { email },
    });

    if (checkEmail > 0) {
      return { error: "Department email already exists" };
    }

    const createDepartment = await Department.create(req.body);

    if (!createDepartment) {
      return { error: "An error occur when creating a new department" };
    }

    return { department: createDepartment };
  }

  static async get(req) {
    const { id } = req.params;

    // const checkDepartment = await Department.findOne({
    //   where: {
    //     id,
    //   },
    // });

    // if (!checkDepartment) {
    //   return { error: "No department found for this id" };
    // }
    const department = await Department.findOne({
      where: {
        id,
        deleted: 0,
      },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("TeamMember.departmentId")),
            "teamMembers",
          ],
        ],
      },
      include: [
        {
          model: TeamMember,
          attributes: [],
        },
      ],
    });

    return { department: department };
  }

  static async edit(req) {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error.details[0].message };
    }
    const { id } = req.params;

    const checkDepartment = await Department.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkDepartment) {
      return { error: "No department found for this id" };
    }

    const { name } = req.body;
    const { email } = req.body;
    const updateBody = { ...req.body };

    const checkName = await Department.count({
      where: {
        name,
        id: { [Op.notIn]: [id] },
      },
    });

    if (checkName > 0) {
      return { error: "Department name already exists" };
    }

    const checkEmail = await Department.count({
      where: {
        email,
        id: { [Op.notIn]: [id] },
      },
    });

    if (checkEmail > 0) {
      return { error: "Department email already exists" };
    }

    const department = await Department.update(updateBody, {
      where: {
        id,
        deleted: 0,
      },
    });

    return { department: department };
  }

  static async delete(req) {
    const { id } = req.params;

    const checkDepartment = await Department.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkDepartment) {
      return { error: "No department found for this id" };
    }

    const department = await Department.update(
      { deleted: 1 },
      {
        where: {
          id,
        },
      }
    );

    return { department: department };
  }
}
