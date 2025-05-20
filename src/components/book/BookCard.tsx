import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface BookCardProps {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  authors?: Author[];
  categories?: Category[];
}

export default function BookCard({
  id,
  title,
  description,
  imageUrl,
  authors = [],
  categories = [],
}: BookCardProps) {
  return (
    <div className="book-card">
      <Link href={`/book/${id}`} className="book-link">
        <div className="book-cover">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={150}
              height={225}
              className="book-image"
            />
          ) : (
            <div className="placeholder-cover">
              <span>{title.substring(0, 1)}</span>
            </div>
          )}
        </div>

        <div className="book-info">
          <h3 className="book-title">{title}</h3>

          {authors.length > 0 && (
            <p className="book-authors">
              {authors.map((author) => author.name).join(", ")}
            </p>
          )}

          {description && (
            <p className="book-description">
              {description.length > 100
                ? `${description.substring(0, 97)}...`
                : description}
            </p>
          )}

          {categories.length > 0 && (
            <div className="book-categories">
              {categories.map((category) => (
                <span key={category.id} className="category-tag">
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
