import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    include: {
      books: {
        include: {
          book: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="main-title">Authors</h1>
        <Button href="/author/new" variant="primary">
          Add Author
        </Button>
      </div>

      {authors.length === 0 ? (
        <div className="empty-books">
          <p>No authors registered yet.</p>
        </div>
      ) : (
        <div className="entity-list">
          {authors.map((author) => (
            <div key={author.id} className="entity-card">
              <h2 className="entity-name">{author.name}</h2>
              {author.biography && (
                <p className="entity-details">{author.biography}</p>
              )}
              <p className="entity-count">{author.books.length} book(s)</p>
              <Link href={`/author/${author.id}`} className="entity-link">
                View details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
