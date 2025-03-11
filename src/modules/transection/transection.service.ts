import { Inject, Injectable } from '@nestjs/common';
import { TransectionRepoInterface } from './repositories/yugbyte_repo/transection.repo.interface';
import { TransectionProvierString } from './repositories/yugbyte_repo/transection.provider';

@Injectable()
export class TransectionService {
  constructor(
    @Inject(TransectionProvierString)
    private readonly transectionRepo: TransectionRepoInterface,
  ) {}

  async createNewTransection(userId: string, createTransectionDto: any) {
    return await this.transectionRepo.createNewTransection(
      userId,
      createTransectionDto,
    );
  }

  async getTransection(userId: string) {
    return await this.transectionRepo.getAllTransection(userId);
  }
}
