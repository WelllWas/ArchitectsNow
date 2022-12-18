import { Test, TestingModule } from '@nestjs/testing';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Request } from './entities/requestTest.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

const userEntitiesList: Request[] = [
  new Request({ idClient: '1', idArchitect: '2', description: 'Teste', status: 'Active' }),
  new Request({ idClient: '3', idArchitect: '4', description: 'Teste2', status: 'Active' }),
  new Request({ idClient: '5', idArchitect: '6', description: 'Teste3', status: 'Active' }),
]


const newRequestEntity = new Request({ idClient: '1', idArchitect: '2', description: 'Teste', status: 'Active'})

const updatedRequestEntity = new Request({  idClient: '1', idArchitect: '2', description: 'Teste2', status: 'Active' })


describe('RequestsController', () => {
  let controller: RequestsController;
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newRequestEntity),
            findAll: jest.fn().mockResolvedValue(userEntitiesList),
            findByContract: jest.fn().mockResolvedValue(userEntitiesList),
            findOne: jest.fn().mockResolvedValue(userEntitiesList[0]),
            update: jest.fn().mockResolvedValue(updatedRequestEntity),
            remove: jest.fn().mockResolvedValue(undefined)
          }
        }
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of users', async () => {
      //Act
      const result = await controller.findAll();
      //Assert
      expect(result).toEqual(userEntitiesList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findAll()).rejects.toThrowError()
    })
  })

  describe('findByContract', () => {
    it('should return a list of users', async () => {
      //Arrange
      const body= {
        id: 1, contract: "A", status:"Active"
      }
      //Act
      const result = await controller.findByContract(body.id, body.contract, body.status);
      //Assert
      expect(result).toEqual(userEntitiesList);
      expect(service.findByContract).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Arrange
      const body= {
        id: 1, contract: "A", status:"Active"
      }
      //Act
      jest.spyOn(service, 'findByContract').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findByContract(body.id, body.contract, body.status)).rejects.toThrowError()
    })
  })

  describe('getOne', ()=>{
    it('should return a single user', async ()=>{
      //Act
      const result = await controller.findOne('1')
      //Assert
      expect(result).toEqual(userEntitiesList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findOne('1')).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      //Arrange
      const body: CreateRequestDto = {
        requisition: {
        idClient: '1', idArchitect: '2', description: 'Teste'
        }
      }
      //Act
      const result = await controller.create(body)
      // Assert
      expect(result).toEqual(newRequestEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Arrange
      const body: CreateRequestDto = {
        requisition: {
        idClient: '1', idArchitect: '2', description: 'Teste'
        }
      }
      //Act
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.create(body)).rejects.toThrowError()
    })
  })

  describe('update', ()=> {
    it('should update a user successfully', async ()=>{
      //Arrange
      const body: UpdateRequestDto = {
        requisition: {
        idClient: '1', idArchitect: '2', description: 'Teste2'
        }, status: 'Active'
      }
      //Act
      const result = await controller.update('1', body)

      //Assert
      expect(result).toEqual(updatedRequestEntity);
      expect(service.update).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      //Arrange
      const body: UpdateRequestDto = {
        requisition: {
        idClient: '1', idArchitect: '2', description: 'Teste2'
        }, status: 'Active'
      }
      //Act
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.update('1',body)).rejects.toThrowError()
    })
  })

  describe('delete', ()=> {
    it('should delete a user', async()=> {
      //Act
      const result = await controller.remove('1');
      //Assert
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.remove('1')).rejects.toThrowError()
    })
  })

});
