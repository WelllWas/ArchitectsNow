export class Request {
    id:number;
    idClient:string;
    idArchitect:string;
    description:string;
    status:string;

    constructor(request?: Partial<Request>){
        this.idClient = request.idClient;
        this.idArchitect = request.idArchitect;
        this.description = request.description;
        this.status = request.status;
    }
}
