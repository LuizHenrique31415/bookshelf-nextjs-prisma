import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { DeleteButton } from "@/components/book/DeleteButton";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = params;

  // Fetch specific book by ID
  const book = await prisma.book.findUnique({
    where: { id },
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

  // If book doesn't exist, show 404 page
  if (!book) {
    notFound();
  }

  // Format data
  const authors = book.authors.map((ba) => ba.author);
  const categories = book.categories.map((bc) => bc.category);

  return (
    <div className="book-details-page">
      <div className="book-details-container">
        <div className="book-cover-container">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={300}
              height={450}
              className="book-cover-large"
            />
          ) : (
            <div className="book-cover-placeholder">
              <span>{book.title.substring(0, 1)}</span>
            </div>
          )}
        </div>

        <div className="book-info-container">
          <h1 className="book-title-large">{book.title}</h1>

          {authors.length > 0 && (
            <div className="book-authors-section">
              <h3 className="section-label">
                Author{authors.length > 1 ? "s" : ""}:
              </h3>
              <div className="authors-list">
                {authors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/author/${author.id}`}
                    className="author-link"
                  >
                    {author.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {book.isbn && (
            <div className="book-isbn">
              <span className="label">ISBN:</span> {book.isbn}
            </div>
          )}

          {categories.length > 0 && (
            <div className="book-categories-section">
              <h3 className="section-label">Categories:</h3>
              <div className="categories-list">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="category-link"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {book.description && (
            <div className="book-description-section">
              <h3 className="section-label">Description:</h3>
              <p className="book-description-full">{book.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="actions-container">
        <Button href="/" variant="back">
          Back to list
        </Button>

        <Button href={`/book/edit/${id}`} variant="edit">
          Edit
        </Button>

        <DeleteButton id={id} name={book.title} />
      </div>
    </div>
  );
}
