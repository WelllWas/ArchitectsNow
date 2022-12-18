import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) { }

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  async findAll() {
    return await this.requestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    return await this.requestsService.findOne(id);
  }

  @Get('findbycontract/:id/:contract/:status')
  async findByContract(@Param('id') id: any, @Param('contract') contract: any, @Param('status') status: any) {
    const data = {id, contract, status}
    return await this.requestsService.findByContract(data);
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateRequestDto: UpdateRequestDto) {
    return await this.requestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    return await this.requestsService.remove(id);
  }
}
