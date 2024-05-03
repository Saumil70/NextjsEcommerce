export type VotesType = {
  count: number;
  value: number;
}

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[]
}

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
}

export type ProductType = {
  productId: string;
  productName: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  imageData: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
}

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  imageData: string[];
  discount?: string;
  currentPrice?: number;
}

export type ProductFetch = {
  productId: string;
  productName: string;
  price: string;
  color: string;
  imageData: string[];
  discount?: string;
  currentPrice?: number;
}

export type ProductStoreType = {
  productId: string;
  productName: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
}

export type GtagEventType = {
  action: string;
  category: string; 
  label: string;
  value: string
}