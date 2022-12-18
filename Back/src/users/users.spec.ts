import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/userTest.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

const userEntitiesList: User[] = [
  new User({ name: 'John', email: 'john@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A' }),
  new User({ name: 'Ash', email: 'Ash@hotmail.com', password: 'senhaTesteAsh', gender: 'M', phone: '119564023', age: '21', type: 'A' }),
  new User({ name: 'Sabin', email: 'Sabin@hotmail.com', password: 'senhaTesteSabin', gender: 'M', phone: '119564023', age: '21', type: 'A' }),
]

const newUserEntity = new User({ name: 'John', email: 'john@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A' })

const updatedUserEntity = new User({ name: 'John2', email: 'john2@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A' })


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUserEntity),
            login: jest.fn().mockResolvedValue(userEntitiesList[0]),
            findAll: jest.fn().mockResolvedValue(userEntitiesList),
            findByType: jest.fn().mockResolvedValue(userEntitiesList[0]),
            findOne: jest.fn().mockResolvedValue(userEntitiesList[0]),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
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

  describe('findByType', ()=>{
    it('should return a user by type', async ()=>{
      //Act
      const result = await controller.findByType('C')
      //Assert
      expect(result).toEqual(userEntitiesList[0]);
      expect(service.findByType).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'findByType').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findByType('C')).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      //Arrange
      const body: CreateUserDto = {
        user:{
        name: 'John', email: 'john@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A'
        }
      }
      //Act
      const result = await controller.create(body)
      // Assert
      expect(result).toEqual(newUserEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('login', () => {
    it('should login a user', async () => {
      //Arrange
      const body: LoginDto = {
        user:{
        email: 'john@hotmail.com', password: 'senhaTesteJohn'
        }
      }
      //Act
      const result = await controller.login(body)
      // Assert
      expect(result).toEqual(userEntitiesList[0]);
      expect(service.login).toHaveBeenCalledTimes(1);
    })

  it('should throw an exception', () => {
    //Arrange
    const body: LoginDto = {
      user:{
      email: 'john@hotmail.com', password: 'senhaTesteJohn'
      }
    }
    //Act
    jest.spyOn(service, 'login').mockRejectedValueOnce(new Error());
    //Assert
    expect(controller.login(body)).rejects.toThrowError()
  })
})


  describe('update', ()=> {
    it('should update a user successfully', async ()=>{
      //Arrange
      const body: UpdateUserDto = {
        user:{
        name: 'John2', email: 'john2@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A'
        }
      }
      //Act
      const result = await controller.update('1', body)

      //Assert
      expect(result).toEqual(updatedUserEntity);
      expect(service.update).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      //Arrange
      const body: UpdateUserDto = {
        user:{
        name: 'John2', email: 'john2@hotmail.com', password: 'senhaTesteJohn', gender: 'M', phone: '119564023', age: '21', type: 'A'
        }
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
  });

});
