import { UserAuthInterface } from 'src/modules/auth/repositories/yugbyte_repo/user_auth_repo.interface';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHREPO } from 'src/modules/auth/repositories/yugbyte_repo/auth.provider';
import { UserRole } from 'src/common/enums/user.role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTHREPO) private readonly userRepo: UserAuthInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { headers, body, user } = request;

    console.log('Headers:', headers); // طباعة الهيدر قبل الطلب
    console.log('Body:', body); // طباعة محتوى الطلب قبل تنفيذه

    // التحقق من دور المستخدم في قاعدة البيانات
    const dbUser = await this.userRepo.getUserById(user.id);
    console.log('User from DB:', dbUser);

    return roles.includes(dbUser.role); // التحقق من الصلاحيات
  }
}
