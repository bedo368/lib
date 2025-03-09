// task.repository.provider.ts
import { DataSource } from 'typeorm';
import { BookRepoInterface } from './book.repo.interface';
import { createBookRepo } from './book.repo';

// اختيار اسم رمزي للمزود (Token)
export const BOOKREPOProvider = 'BOOK_REPOSITORY';

// إنشاء المزود (Provider) لاستخدامه في الوحدات (Modules)
export const BookProvider = {
  provide: BOOKREPOProvider,
  useFactory: (dataSource: DataSource):BookRepoInterface => {
    return createBookRepo(dataSource);
  },
  inject: [DataSource],
};