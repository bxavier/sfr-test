export interface IClient {
  id: number;
  name: string;
  documentNumber: string;
  birthDate: string | Date;
  registrationDate: string | Date;
  montlyIncome: number;
  email: string;
}
