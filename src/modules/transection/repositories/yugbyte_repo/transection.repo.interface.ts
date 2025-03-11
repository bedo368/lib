import { Transaction } from "src/common/entities/transaction.entity";
import { CreateTransactionDto } from "../../dto/create_transection.dto";


export interface TransectionRepoInterface  {


   createNewTransection( userId:string, createTransectionDto: CreateTransactionDto) : Promise<Transaction> ;

   getAllTransection( userId: string) : Promise<Transaction[]> ;

   deleteTransection(id : string) : Promise<String> ;
   
}