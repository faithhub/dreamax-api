const { Department } = require('../db/models');
// const { NotFoundException, BadRequestException } = require('../exceptions');

export default class{
    static async createNewDepartment(payload) {
        const createDepartment = await Department.create({
            name: payload.name,
            email: payload.email,
            status: payload.status,
            labelColor: payload.labelColor,
            description: payload.description
        })
    
        if (!createDepartment) {
            return {error: "An error occur when creating a new department"};
        }
    
        return { data: createDepartment };
    };

    static async editSingleDepartment (departmentId, payload) {
        const editDepartment = await Department.update(
            { name: payload.name, email: payload.email, labelColor: payload.labelColor, description: payload.description },
            {
                where: {
                    id: departmentId
                }
            }
        );
    
        if (!editDepartment) {
            return {error: "An error occur when updating department data"};
        }
    
        return { data: editDepartment };
    };

    static async getAllDepartments() {
        const getDepartment = await Department.findAll({});
    
        if (!getDepartment) {
            return {error: "An error occur when fetching all department"};
        }
    
        return { data: getDepartment };
    };

    static async fetchSingleDepartment(departmentId) {
        const getSingleDepartment = await Department.findOne({
            where: {
                id: departmentId
            }
        });
    
        if (!getSingleDepartment) {
            return {error: "No department found with this departmentId " + departmentId};
        }
    
        return { data: getSingleDepartment };
    };

    static async deleteSingleDepartment(departmentId) {
        const deleteDepartment = await Department.destroy({
            where: {
                id: departmentId
            }
        });
    
        if (!deleteDepartment) {
            return {error: "No department found with this departmentId " + departmentId};
        }
    
        return { data: deleteDepartment };
    };
};