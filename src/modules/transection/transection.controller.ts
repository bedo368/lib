import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create_transection.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransectionService } from './transection.service';
import { TransactionModel } from './models/transection_model';

@Controller('transection')
export class TransectionController {
  constructor(private transectionService: TransectionService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createTransection(
    @Body() createTransectionDto: CreateTransactionDto,
    @Request() req: any,
  ) {
    const user = req.user;
    console.log(
      user.id +
        'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    );

    const transection = await this.transectionService.createNewTransection(
      user.id,
      createTransectionDto,
    );
    console.log(transection.items + 'ddfsfds');
    return {
      message: 'Transection created successfully',
      error: false,
      transection: new TransactionModel(transection).tojson(),
    };
  }

  @Get()
  @UseGuards(AuthGuard())
  async getTransection(@Request() req: any) {
    const user = req.user;
    const transections = await this.transectionService.getTransection(user.id);
    console.log(
      user.id +
        'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    );

    const transectionsModels = transections.map((t) => {

      
      const tt = new TransactionModel(t);
      console.log(tt + "fdfdfdfdf");
      return tt.tojson(); 
    });
    return {
      message: 'Transection created successfully',
      error: false,
      data: transectionsModels,
    };
  }
}
