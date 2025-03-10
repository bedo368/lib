import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransectionDto } from './dto/create_transection.dto';

@Controller('transection')
export class TransectionController {


  @Post()
  createTransection( @Body() createTransectionDto: CreateTransectionDto[]) {
    return {
      message: 'Transection created successfully',
      error: false,
    };
  }

  
}
