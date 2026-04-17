import { RequestStatus } from ".";

export interface IUserApartment {
  id: string;
  complexId: string;
  houseId: string;
  number: number;
  status: RequestStatus;
  userId: string;
}