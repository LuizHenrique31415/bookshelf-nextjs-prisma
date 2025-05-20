import React from "react";
import { prisma } from "@/lib/prisma";
import BookCard from "@/components/book/BookCard";
import SearchBar from "@/components/SearchBar";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || "";

  // If there's no query, show initial search page
  if (!query) {
    return (
      <div>
        <h1 className="main-title">Search Books</h1>
        <SearchBar />
        <p className="text-center mt-6">Enter a term to search for books.</p>
      </div>
    );
  }

  // Search for books that match the query
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        {
          authors: {
            some: {
              author: { name: { contains: query, mode: "insensitive" } },
            },
          },
        },
        {
          categories: {
            some: {
              category: { name: { contains: query, mode: "insensitive" } },
            },
          },
        },
      ],
    },
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
    <div>
      <h1 className="main-title">Search Results</h1>
      <SearchBar />

      <div className="search-results">
        <h2 className="section-title">
          {formattedBooks.length} result(s) for "{query}"
        </h2>

        {formattedBooks.length === 0 ? (
          <div className="empty-books">
            <p>No books found for this search.</p>
          </div>
        ) : (
          <div className="books-grid">
            {formattedBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
