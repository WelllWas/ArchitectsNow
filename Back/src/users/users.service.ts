import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
var bcrypt = require('bcryptjs');
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = createUserDto.user;
      const logUser = await this.usersRepository.findOne({ where: { email: user.email } });
      if (logUser) {
        return {
          statusCode: 409,
          body: "User with this email already exists"
        }
      } else {
        user.password = await bcrypt.hash(user.password, 10);
        const response = await this.usersRepository.save(user);
        return {
          statusCode: 201,
          body: response
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = loginDto.user;
      const logUser = await this.usersRepository.findOne({ where: { email: user.email } })
      if (!logUser) {
        return {
          statusCode: 404,
          body: "There is no user with this email"
        }
      } else {
        if (await bcrypt.compare(user.password, logUser.password)) {
          return {
            statusCode: 200,
            body: logUser
          }
        } else {
          return {
            statusCode: 401,
            body: "Wrong password"
          }
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findAll() {
    try {
      const list = await this.usersRepository.find();
      return {
        statusCode: 200,
        body: list
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findOne(id: any) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } })
      if (user) {
        return {
          statusCode: 200,
          body: user
        }
      } else {
        return {
          statusCode: 404,
          body: "There is no user with this id"
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findByType(contract: any) {
    try {
      const users = await this.usersRepository.find({
        where: {
          type: contract
        }
      })
      return {
        statusCode: 200,
        body: users
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersRepository.update({ id }, updateUserDto.user)
      if (updatedUser) {
        return {
          statusCode: 201,
          body: updatedUser
        }
      } else {
        return {
          statusCode: 404,
          body: "There is no user with this id"
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async remove(id: any) {
    try {
      const deletedUser = await this.usersRepository.delete(id)
      return {
        statusCode: 200,
        body: deletedUser
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }
}
