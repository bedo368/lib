import { Transaction } from 'src/common/entities/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTransactionDto, } from '../../dto/create_transection.dto';
import { get } from 'http';
import { TransactionItem } from 'src/common/entities/transection_item.entity';
import { TransactionTypeEnum } from 'src/common/enums/transection.type.enum';
import { Book } from 'src/common/entities/book.entity';
import { User } from 'src/common/entities/user.enetiy';

export const createTransectionRepo = (dateaScource: DataSource) => {
  const baseRpoo: Repository<Transaction> =
    dateaScource.getRepository(Transaction);
    const transectionItemRpoo: Repository<TransactionItem> =
    dateaScource.getRepository(TransactionItem);

  return baseRpoo.extend({
    async createNewTransection(userId: string, createTransactionDto: CreateTransactionDto) {
      const transaction = new Transaction();
      
      // Set the main transaction fields
      transaction.total = createTransactionDto.total;
      transaction.transactionDate = new Date(Date.now());
      
      // Set the user, assuming the user exists in the DB
      transaction.user = { id: userId } as User;
    
      // Create and assign items to the transaction
      transaction.items = createTransactionDto.items.map((item) => {
        const transactionItem = new TransactionItem();
        transactionItem.quantity = item.quantity;
        transactionItem.book = { id: item.bookId } as Book;  // Quick assignment
        transactionItem.price = item.price;
        transactionItem.itemTotal = item.itemTotal;
        transactionItem.type = item.type;
    
        // If RENT type, set rentalDays
        if (item.type === TransactionTypeEnum.RENT) {
          transactionItem.rentalDays = item.rentalDays;
        }
    
        // Ensure the transaction field is set in TransactionItem
        transactionItem.transaction = transaction; // Link to the parent transaction
        
        return transactionItem;
      });
    
      // Save the transaction along with its items
      const savedTransaction = await baseRpoo.save(transaction);
      

      console.log(savedTransaction + "cc")
      
    
      return savedTransaction;
    },
    async getAllTransection() {
      return baseRpoo.find({
        relations: [
          // 'user',       // Include user if needed
          'items',       // Load transaction items
          'items.book'   // Load book for each item
        ],
      });
    },
    async deleteTransection(id: string) {
      
       await baseRpoo.delete(id);
       return id;
    },
  });
};
