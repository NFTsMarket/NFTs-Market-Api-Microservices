import { Document, Model } from "mongoose";
import { GetEntityByIdInput } from "../classes/get-entity-by-id.class";

export interface BaseRepositoryType<T extends Document = any> {
  entity: T;
  entityModel: Model<T>;
  createEntityInput: any;
  updateEntityInput: any;
  deleteEntityInput: any | GetEntityByIdInput;
}
