import { Teachers } from "../../entities/teachers.entity";
import { TeachersRoom } from "../../entities/teachersRoom.entity";
import { ClassRoom } from "../../entities/classRoom.entity";
import AppDataSource from "../../data-source";
import { ITeacherClassroom } from "../../interfaces/teacher";
import { appError } from "../../errors/appError";

const createTeacherClassroomService = async (datas: ITeacherClassroom) => {
  const { idTeacher, idClassroom } = datas;
  const repositoryTeacher = AppDataSource.getRepository(Teachers);
  const repositoryClassroom = AppDataSource.getRepository(ClassRoom);
  const repositoryTeachersRoom = AppDataSource.getRepository(TeachersRoom);

  const validationTeacherId = await repositoryTeacher.findOneBy({
    id: idTeacher,
  });
  const validationClassroomId = await repositoryClassroom.findOneBy({
    id: idClassroom,
  });
  const teachersClassroom = await repositoryTeachersRoom.find();

  if (!validationTeacherId) {
    throw new appError("Teacher does not exists", 404);
  }
  if (!validationClassroomId) {
    throw new appError("Classroom does not exists", 404);
  }
  repositoryTeachersRoom.create(datas);
  await repositoryTeachersRoom.save(datas);

  return {
    status: 201,
    message: "Teachers Room sucesfully created",
    data: {
      teacher: validationTeacherId.name,
      class: validationClassroomId.name,
    },
  };
};
export default createTeacherClassroomService;
