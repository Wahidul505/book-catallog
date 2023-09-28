export type IOrderedBook = {
  bookId: string;
  quantity: number;
};

export type IOrderedBooks = {
  orderedBooks: IOrderedBook[];
};
