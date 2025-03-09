// task.repository.provider.ts
import { DataSource } from 'typeorm';
import { UserAuthInterface } from './user_auth_repo.interface';
import { createUserAuthRepo } from './user_auth.repo';

// اختيار اسم رمزي للمزود (Token)
export const AUTHREPO = 'AUTH_REPOSITORY';

// إنشاء المزود (Provider) لاستخدامه في الوحدات (Modules)
export const AuthRepoProvider = {
  provide: AUTHREPO,
  useFactory: (dataSource: DataSource):UserAuthInterface => {
    return createUserAuthRepo(dataSource);
  },
  inject: [DataSource],
};
