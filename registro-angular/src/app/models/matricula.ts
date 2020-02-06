export class Matricula{
	constructor(
	   public id: number,
	   public user_id: number,
	   public docente_id: number,
	   public estudiante_id: number,
	   public materia_id: number,
	   public descripcion: string
	){}
}