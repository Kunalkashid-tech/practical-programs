export interface UserData {
    name: string;
    age: number;
    email: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
  }
  