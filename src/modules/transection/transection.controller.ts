import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create_transection.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransectionService } from './transection.service';

@Controller('transection')
export class TransectionController {
  constructor(
     private  transectionService: TransectionService
  ) {}


  @Post()
  @UseGuards(AuthGuard())
  async createTransection( @Body() createTransectionDto: CreateTransactionDto , @Request() req :any) {

    const user = req.user ;
    console.log(user.id+"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv") 

    const transection = await this.transectionService.createNewTransection(user.id , createTransectionDto)
    console.log(transection.items + "ddfsfds")
    return {
      message: 'Transection created successfully',
      error: false,
      transection : {
        id : transection.id
        ,
        total : transection.total,
        transactionDate : transection.transactionDate
        ,
        items : transection.items.map((item) => ({
          id : item.id,
          quantity : item.quantity,
          bookId : item.book.id,
          price : item.price,
          itemTotal : item.itemTotal,
          type : item.type
        }))
        ,
        transactionId : transection.transactionId,
        user : transection.user
      }
    };
  }

  @Get()
  @UseGuards(AuthGuard())
  async getTransection( @Request() req :any) {
    const user = req.user ;
    console.log(user.id+"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv") 
    const transection = await this.transectionService.getTransection(user.id)
    return {
      message: 'Transection created successfully',
      error: false,
      data : transection
    };
  }

  
}
