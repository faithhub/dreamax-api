import {TeamMember} from "../db/models"

export default class{
    static async indexDashboard(req, res, next){
        const {adminId} = req.params
        if(!adminId){
          return res.status(400).json({message: "Admin doesnt exist"});
        }
        const checkTeamMember = TeamMember.findOne({
            where: {
                id: adminId,
                deleted: 0
            }
        })
        if(!checkTeamMember){
           return res.status(400).json({message: "Team Member doesn't exist!!"})
        }
        next()
    }
}