export class User{
	constructor(
	   public id: number,
	   public nombre: string,
	   public apellido: string,
	   public role: string,
	   public email: string,
	   public password: string,
	   public image: string
	){}
}