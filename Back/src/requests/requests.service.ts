import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) { }

  async create(createRequestDto: CreateRequestDto) {
    try {
      const request = createRequestDto.requisition;
      const fullRequest = { ...request, status: "Active" }
      const newUser = await this.requestsRepository.save(fullRequest);
      return {
        statusCode: 201,
        body: newUser
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
      const list = await this.requestsRepository.find();
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

  async findOne(id: number) {
    try {
      const request = await this.requestsRepository.findOne({ where: { id } })
      if (request) {
        return {
          statusCode: 200,
          body: request
        }
      } else {
        return {
          statusCode: 404,
          body: "There is no request with this id"
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findByContract(data:any){
    let options;
    try{
      if(data.contract == "A"){
        if(data.status == "NoFilter"){
          options = {where: { idArchitect: data.id }}
        }else{
          options = {where: { idArchitect: data.id, status: data.status}}
        }
      }else{
        if(data.status == "NoFilter"){
          options = {where: { idClient: data.id }}
        }else{
          options = {where: { idClient: data.id, status: data.status}}
        }
      }
      const requests = await this.requestsRepository.find(options);
      return{
        statusCode:200,
        body: requests
      }
    }catch(e){
      return{
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    try {
      const request = updateRequestDto.requisition;
      const updatedRequet = await this.requestsRepository.update({id}, request)
      if (updatedRequet) {
        return {
          statusCode: 201,
          body: updatedRequet
        }
      } else {
        return {
          statusCode: 404,
          body: "There is no request with this id"
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.requestsRepository.delete(id)
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
