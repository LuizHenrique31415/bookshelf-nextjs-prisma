import React from "react";
import BookCard from "./BookCard";

// Reuse BookCard interfaces
interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  isbn?: string | null;
  authors?: Author[];
  categories?: Category[];
}

interface BookListProps {
  books: Book[];
  title?: string;
}

export default function BookList({
  books,
  title = "All Books",
}: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <div className="empty-books">
        <h2>{title}</h2>
        <p>No books found.</p>
      </div>
    );
  }

  return (
    <div className="books-container">
      <h2 className="section-title">{title}</h2>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            imageUrl={book.imageUrl}
            authors={book.authors}
            categories={book.categories}
          />
        ))}
      </div>
    </div>
  );
}
