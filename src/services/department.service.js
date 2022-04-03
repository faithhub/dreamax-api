const { Department } = require('../db/models');
const { NotFoundException, BadRequestException } = require('../exceptions');

const createNewDepartment = async function (payload) {
    const createDepartment = await Department.create({
        name: payload.name,
        email: payload.email,
        status: payload.status,
        labelColor: payload.labelColor,
        description: payload.description
    })

    if (!createDepartment) {
        throw new BadRequestException("An error occur when creating a new department");
    }

    return { data: createDepartment };
};

const editSingleDepartment = async function (departmentId, payload) {
    const editDepartment = await Department.update(
        { name: payload.name, email: payload.email, labelColor: payload.labelColor, description: payload.description },
        {
            where: {
                id: departmentId
            }
        }
    );

    if (!editDepartment) {
        throw new BadRequestException("An error occur when updating department data");
    }

    return { data: editDepartment };
};

const getAllDepartments = async function () {
    const getDepartment = await Department.findAll({});

    if (!getDepartment) {
        throw new BadRequestException("An error occur when fetching all department");
    }

    return { data: getDepartment };
};

const fetchSingleDepartment = async function (departmentId) {
    const getSingleDepartment = await Department.findOne({
        where: {
            id: departmentId
        }
    });

    if (!getSingleDepartment) {
        throw new NotFoundException("No department found with this departmentId " + departmentId);
    }

    return { data: getSingleDepartment };
};

const deleteSingleDepartment = async function (departmentId) {
    const deleteDepartment = await Department.destroy({
        where: {
            id: departmentId
        }
    });

    if (!deleteDepartment) {
        throw new NotFoundException("No department found with this departmentId " + departmentId);
    }

    return { data: deleteDepartment };
};

module.exports = { getAllDepartments, createNewDepartment, fetchSingleDepartment, deleteSingleDepartment, editSingleDepartment };