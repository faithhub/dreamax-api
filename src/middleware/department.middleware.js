import {Department} from "../db/models"
import { validateSchema } from "../validations/department.validations";


export default class{
    static async createDept(req, res, next){
        const {name, email} = req.body
        const { error } = validateSchema.validate(req.body);
        if(error){
          return  res.status(400).json({message: error.details[0].message})
        }

        const checkIfNameExist = Department.count({
            where: {
                name
            }
        })

        const checkIfEmailExist = Department.count({
            where: {
                email
            }
        })

        if(checkIfNameExist> 0){
           return res.status(400).json({message: "Name Already Exist in Table"})
        }

        if(checkIfEmailExist> 0){
           return res.status(400).json({message: "Email Address Already Exist in Table"})
        }
        next()
    }

    static async getDept(req,res,next){
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Department ID cannot be null"})
        }
        const checkIfDepartmentExist = await Department.findOne({
            where: {
                id
            }
        })
        if(!checkIfDepartmentExist){
            return res.status(404).json({message: `No department found for this id: ${id}`})
        }
        next()
    }

    static async getAll(req,res,next){
        const checkIfDepartmentExist = await Department.findAll({})
        if(checkIfDepartmentExist.length == 0){
            return res.status(404).json({message: `No department found`})
        }
        next()
    }

    static async editDept(req, res, next){
        const { error } = validateSchema.validate(req.body);
        if(error){
          return  res.status(400).json({message: error.details[0].message})
        }
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Department ID cannot be null"})
        }
        const checkIfDepartmentExist = await Department.findOne({
            where: {
                id
            }
        })
        if(!checkIfDepartmentExist){
            return res.status(404).json({message: `No department found for this id: ${id}`})
        }

        const {name, email} = req.body

       if(name === checkIfDepartmentExist.name){
           return res.status(400).json({message: "New name matches Old Name"})
       }

       if(email === checkIfDepartmentExist.email){
        return res.status(400).json({message: "New email matches Old email"})
        }
        next()
    }

    static async deleteDept(req,res,next){
        const {id} = req.body
        if(!id){
            return res.status(400).json({message: "ID must be provided!!"})
        }

        const checkIfDepartmentExist = Department.findOne({
            where: {
                id
            }
        })

        if(!checkIfDepartmentExist){
            return res.status(404).json({message: `No department found for this id: ${id}`})
        }
        next()
    }
}