export interface IUser {
    name: string;
    email: string;
    password: string;
    method?: "credentials" | "github" | "google";
    role?: "customer" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
  }
  