import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
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
        <h1 className="main-title">Categories</h1>
        <Button href="/category/new" variant="primary">
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-books">
          <p>No categories registered yet.</p>
        </div>
      ) : (
        <div className="entity-list">
          {categories.map((category) => (
            <div key={category.id} className="entity-card">
              <h2 className="entity-name">{category.name}</h2>
              <p className="entity-count">{category.books.length} book(s)</p>
              <Link href={`/category/${category.id}`} className="entity-link">
                View books in this category
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
