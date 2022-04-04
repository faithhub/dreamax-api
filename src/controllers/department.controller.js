const { check, validationResult } = require("express-validator");
const { Department } = require("../db/models");

export default class {
  static async create(req) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     status: "validation error",
    //     error: errors.mapped(),
    //   });
    // }
    console.log(req.body);
    const createDepartment = await Department.create({
      name: payload.name,
      email: payload.email,
      status: payload.status,
      labelColor: payload.labelColor,
      description: payload.description,
    });

    if (!createDepartment) {
      return { error: "An error occur when creating a new department" };
    }

    return { data: createDepartment };
  }

  static async edit(req, res) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     status: "validation error",
    //     error: errors.mapped(),
    //   });
    // }

    var { id } = req.params;
    const updateBody = {
      ...req.body,
    };
    const department = await Department.update(updateBody, {
      where: {
        id: id,
      },
    });
    return { data: department };
  }

  static async index() {
    const departments = await Department.findAll({});
    return { data: departments }
  };


  //     constructor() {
  //         // Fetch all Departments
  //         //Fetch Single Department
  //         this.fetchSingleDepartment = async function (req, res, next) {
  //             try {
  //                 var departmentId = req.params.id
  //                 const getDepartment = await fetchSingleDepartment(departmentId);
  //                 res.status(200).json(getDepartment);
  //             } catch (error) {
  //                 res.status(403).json({
  //                     message: error.message
  //                 })
  //             }
  //         };

  //         //Delete Department
  //         this.deleteSingleDepartment = async function (req, res, next) {
  //             try {
  //                 var departmentId = req.params.id
  //                 const deleteDepartment = await deleteSingleDepartment(departmentId);
  //                 res.status(200).json(deleteDepartment);
  //             } catch (error) {
  //                 res.status(403).json({
  //                     message: error.message
  //                 })
  //             }
  //         };
  //     }
}
