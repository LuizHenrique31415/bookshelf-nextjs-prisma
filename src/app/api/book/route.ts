import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    // Formatar os dados para facilitar o uso no frontend
    const formattedBooks = books.map((book) => ({
      ...book,
      authors: book.authors.map((ba) => ba.author),
      categories: book.categories.map((bc) => bc.category),
    }));

    return NextResponse.json(formattedBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, isbn, authorId, categoryId } = body;

    // Criar o livro
    const newBook = await prisma.book.create({
      data: {
        title,
        description,
        imageUrl,
        isbn,
      },
    });

    // Se um ID de autor foi fornecido, criar a relação
    if (authorId) {
      await prisma.bookAuthor.create({
        data: {
          bookId: newBook.id,
          authorId,
        },
      });
    }

    // Se um ID de categoria foi fornecido, criar a relação
    if (categoryId) {
      await prisma.bookCategory.create({
        data: {
          bookId: newBook.id,
          categoryId,
        },
      });
    }

    // Buscar o livro com seus relacionamentos
    const bookWithRelations = await prisma.book.findUnique({
      where: { id: newBook.id },
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

    return NextResponse.json(bookWithRelations);
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
