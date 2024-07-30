export type ProdStackParamList = {
    ProductHome: undefined;
    Search: undefined;
    ProductDetail: { productId: number };
  };


  export interface Todo {
    id: string;
    text: string;
    priority: Priority;
    priorityColor: string;
    category: string;
  }
  
  export type Priority = 'Low' | 'Medium' | 'High';

  export interface Post {
    id: number;
    title: string;
    body: string;
    uniqueId: string;
  }
  
  