import React from "react";
import { prisma } from "@/lib/prisma";
import BookCard from "@/components/book/BookCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || "";

  let formattedBooks: any[] = [];

  // If there's a query, search for books
  if (query) {
    // Search for books that match the query
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          {
            authors: {
              some: {
                author: {
                  name: { contains: query, mode: "insensitive" },
                },
              },
            },
          },
          {
            categories: {
              some: {
                category: {
                  name: { contains: query, mode: "insensitive" },
                },
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

    // Format data for component use
    formattedBooks = books.map((book) => ({
      ...book,
      authors: book.authors.map((ba) => ba.author),
      categories: book.categories.map((bc) => bc.category),
    }));
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1 className="main-title">
          {query ? `Results for "${query}"` : "Search Books"}
        </h1>
      </div>

      <SearchBar initialQuery={query} />

      {query ? (
        <>
          <div className="search-info">
            <p className="search-count">
              {formattedBooks.length} result(s) found
            </p>
          </div>

          {formattedBooks.length > 0 ? (
            <div className="books-grid">
              {formattedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <div className="empty-books">
              <p>No books found for this search.</p>
              <p>
                Try searching for another term or{" "}
                <Link href="/" className="link">
                  return to homepage
                </Link>
                .
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="search-instructions">
          <p>Type a term in the search box above to find books.</p>
          <p>You can search by title, author, or category.</p>
        </div>
      )}
    </div>
  );
}
