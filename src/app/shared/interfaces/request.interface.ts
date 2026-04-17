export interface IRequest {
  id: string;
  complexId: string;
  create: Date;
  desc: string;
  reviewed: boolean;
  title: string;
  userId: string;
  status: RequestStatus;
}

export enum RequestStatus {
  APPROVED = 'APPROVED',
  REJECT = 'REJECT',
  INSPECTION = 'INSPECTION',
}