export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface SendResult {
  success: boolean;
}
