import { DataSource } from "typeorm";
import { createTransectionRepo } from "./transection.repo";
import { TransectionRepoInterface } from "./transection.repo.interface";



export const TransectionProvierString = "TRANSECTION_REPOSITORY";

export const transectionProvider = {
  provide: TransectionProvierString,
  useFactory: (dataSource: DataSource):TransectionRepoInterface => {
    return createTransectionRepo(dataSource);
  },
  inject: [DataSource],
};