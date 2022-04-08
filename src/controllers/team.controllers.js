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
        deleted: 0,
      },
    });
    let collateTeamMember = [];

    teamMembers.forEach(async (el) => {
      const { id } = el;
      let assigned;
      let open;
      let closed;
      let reolved;
      let unreolved;

      assigned = await Ticket.count({
        where: id,
      });
      open = await Ticket.count({
        where: {
          deleted: 0,
          assignedTo: el.id,
          status: 1,
        },
      });
      closed = await Ticket.count({
        where: {
          deleted: 0,
          assignedTo: el.id,
          status: 0,
        },
      });
      reolved = await Ticket.count({
        where: {
          deleted: 0,
          assignedTo: el.id,
          status: 2,
        },
      });
      unreolved = await Ticket.count({
        where: {
          deleted: 0,
          assignedTo: el.id,
          status: 3,
        },
      });

      let teamMemberObject = {};
      teamMemberObject["assigned"] = assigned;
      teamMemberObject["open"] = open;

      console.log(teamMemberObject);

      collateTeamMember.push(teamMemberObject);
    });

    return { data: { collateTeamMember, teamMembers } };
  }

  static async create(req) {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      return { error: error };
    }

    const { username } = req.body;

    const checkUsername = await TeamMember.count({
      where: { username },
    });

    if (checkUsername > 0) {
      return { error: "The Team member username already exists" };
    }

    const createTeam = await TeamMember.create(req.body);
    await TeamSetting.create({
      adminId: createTeam.id,
      fields: userSettings,
    });

    if (!createTeam) {
      return { error: "An error occur when creating a new Team" };
    }

    return { data: createTeam };
  }

  static async get(req) {
    const { id } = req.params;
    const adminId = id;
    const assignedTo = id;

    const checkTeamMember = await TeamMember.findOne({
      where: {
        id,
        deleted: 0,
      },
    });

    if (!checkTeamMember) {
      return { error: "No team member found for this id" };
    }

    const assignedToTickets = await Ticket.count({
      where: {
        id: id,
        deleted: 0,
      },
    });

    const closedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "closed",
        deleted: 0,
      },
    });

    const openTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "open",
        deleted: 0,
      },
    });

    const reolvedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "resolved",
        deleted: 0,
      },
    });

    const unreolvedTickets = await Ticket.count({
      where: {
        assignedTo: adminId,
        status: "unresolved",
        deleted: 0,
      },
    });

    const teamMember = await TeamMember.findOne({
      where: {
        id,
        deleted: 0,
      },
      include: [
        {
          model: Department,
          attributes: ["id", "name", "status"],
        },
        {
          model: TeamSetting,
          attributes: ["id", "adminId", "fields"],
        },
        {
          model: FeedBack,
          attributes: ["id", "usercomment", "admincomment", "rating"],
        },
        {
          model: Ticket,
          attributes: [
            "id",
            "status",
            "userId",
            "assignedTo",
            "piority",
            "department",
            "comment",
            "ticketNo",
          ],
        },
      ],
    });

    const feedBackTotalsum = await FeedBack.sum("rating", {
      where: {
        adminId: adminId,
        deleted: 0,
      },
    });

    const totalFeedbackCount = await FeedBack.count({
      where: {
        adminId: adminId,
        deleted: 0,
      },
    });

    const averageRating = feedBackTotalsum / totalFeedbackCount;

    const sumAllTeamMemberTickets = await Ticket.findAll({
      raw: true,
      attributes: [
        [
          Sequelize.cast(
            Sequelize.fn("SUM", Sequelize.col("respondTime")),
            "float"
          ),
          "respondTime",
        ],
      ],
      where: {
        assignedTo: assignedTo,
        deleted: 0,
      },
    });

    const countAllTeamMemberTickets = await Ticket.count({
      where: {
        assignedTo: assignedTo,
        deleted: 0,
      },
    });

    const averageResponseTime = parseFloat(
      sumAllTeamMemberTickets[0].respondTime / countAllTeamMemberTickets
    ).toFixed(2);

    function convertTime(e) {
      e = e * 60 || 0;
      var h = Math.floor(e / 3600)
          .toString()
          .padStart(2, "0"),
        m = Math.floor((e % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        s = Math.floor(e % 60)
          .toString()
          .padStart(2, "0");
      return { hours: h, minutes: m, seconds: s };
      //return `${h}:${m}:${s}`;
    }

    return {
      data: {
        averageRating,
        averageResponseTime: convertTime(averageResponseTime),
        summary: {
          assignedToTickets,
          openTickets,
          closedTickets,
          reolvedTickets,
          unreolvedTickets,
        },
        teamMember,
      },
    };
  }

  static async edit(req) {
    const { error } = editSchema.validate(req.body);
    if (error) {
      return { error: error };
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
