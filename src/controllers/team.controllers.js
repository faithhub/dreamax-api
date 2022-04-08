import {
  TeamMember,
  TeamSetting,
  Department,
  FeedBack,
  Ticket,
} from "../db/models";
import userSettings from "../constant/user-settings.json";
import Sequelize from "sequelize";
import { validateSchema, editSchema } from "../validations/team.validations";
const Op = Sequelize.Op;

export default class {

    static async index() {

        const teamMembers = await TeamMember.findAll({
            where: {
                deleted: 0
            }
        });
        const tickets = await Ticket.findAll({
            where: {
                deleted: 0
            }
        })
        let collateTeamMember;


       collateTeamMember =  teamMembers.map(el => {
            const { id } = el;
            let assigned;
            let open;
            let closed;
            let resolved;
            let unreolved;

            assigned = tickets.filter((element) => element.assignedTo == id )
            open = tickets.filter((element) => element.assignedTo == id && element.status == 'opened')
            closed = tickets.filter((element) => element.assignedTo == id && element.status == 'closed')
            resolved = tickets.filter((element) => element.assignedTo == id && element.status == 'resolved')
            unreolved = tickets.filter((element) => element.assignedTo == id && element.status == 'unresolved')

            let teamMemberObject = {};
            teamMemberObject["assigned"] = assigned.length;
            teamMemberObject["open"] = open.length;
            teamMemberObject["close"] = closed.length;
            teamMemberObject["resolved"] = resolved.length;
            teamMemberObject["unresolved"] = unreolved.length;
            teamMemberObject["department"] = el.department;
            teamMemberObject["name"] = el.firstName + '' + el.lastName;

            return teamMemberObject;

        });

        return { data: collateTeamMember }

    };

  static async edit(req) {
    const { error } = editSchema.validate(req.body);
    if (error) {
      return { error: error.details[0].message };
    }
    let { id } = req.params;
    const { username } = req.body;

    const checkTeamMember = await TeamMember.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkTeamMember) {
      return { error: "No team member found for this id" };
    }

    const checkUsername = await TeamMember.count({
      where: {
        username,
        id: { [Op.notIn]: [id] },
      },
    });

    if (checkUsername > 0) {
      return { error: "The Team member username already exists" };
    }

    const updateBody = {
      ...req.body,
    };

    const teamMember = await TeamMember.update(updateBody, {
      where: {
        id,
        deleted: 0,
      },
    });

    return { data: teamMember };
  }

  static async delete(req) {
    const { id } = req.params;

    const checkTeamMember = await TeamMember.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkTeamMember) {
      return { error: "No team member found for this id" };
    }

    const teamMember = await TeamMember.update(
      { deleted: 1 },
      {
        where: {
          id,
        },
      }
    );
    return { data: teamMember };
  }

  static async status(req) {
    let { id } = req.params;

    const checkTeamMember = await TeamMember.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkTeamMember) {
      return { error: "No team member found for this id" };
    }

    const { status } = {
      ...req.body,
    };

    const teamMember = await TeamMember.update(status, {
      where: {
        id,
        deleted: 0,
      },
    });
    return { data: teamMember };
  }
}
