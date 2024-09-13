export interface RegisterInterface {
  email: string;
  name: string;
  password: string;
  businessType: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface EmailInterface {
  email: string;
  data: any;
  template: string;
  subject: string;
}

export interface UpdateData {
  email: string;
  name: string;
  businessType: string;
}