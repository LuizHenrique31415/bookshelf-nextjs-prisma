import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BookCard from "@/components/book/BookCard";
import Button from "@/components/ui/Button";

export default async function BookPage() {
  // Fetch books from database
  const books = await prisma.book.findMany({
    include: {
      authors: {
        include: {
          author: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  // Format the data
  const formattedBooks = books.map((book) => ({
    ...book,
    authors: book.authors.map((ba) => ba.author),
    categories: book.categories.map((bc) => bc.category),
  }));

  return (
    <main>
      <div className="page-header">
        <h1 className="main-title">All Books</h1>
        <Button href="/book/new" variant="primary">
          Add Book
        </Button>
      </div>

      {formattedBooks.length === 0 ? (
        <div className="empty-books">
          <p>No books registered yet.</p>
        </div>
      ) : (
        <div className="books-grid">
          {formattedBooks.map((book) => (
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
      )}
    </main>
  );
}
