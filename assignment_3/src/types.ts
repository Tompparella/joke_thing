export type ApiResponse = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type JokeResponse = ApiResponse & {
  name: string;
  text: string;
  category: CategoryResponse;
  tags: TagResponse[];
};

export type CategoryResponse = ApiResponse & {
  name: string;
  description: string;
};

export type TagResponse = ApiResponse & {
  name: string;
  description: string;
};

export type CreateJoke = {
  name: string;
  text: string;
  categoryId: number;
  regionId: number;
  tags: number[];
}