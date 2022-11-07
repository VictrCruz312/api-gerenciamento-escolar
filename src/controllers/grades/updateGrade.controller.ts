import { Request, Response } from "express";
import { Grades } from "../../entities/grades.entity";
import gradeUpdateService from "../../services/grades/updateGrade.service";

const gradeUpdateController = async (req: Request, res: Response) => {
 
    const grd: Grades = req.body
    const id: string = req.params.id
    const gradeUpdate = await gradeUpdateService(grd, id);
    
    return res.status(200).json(gradeUpdate);   

};

export default gradeUpdateController;