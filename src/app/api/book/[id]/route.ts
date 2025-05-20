import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obter um livro específico por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

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

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Formatar os dados para facilitar o uso no frontend
    const formattedBook = {
      ...book,
      authors: book.authors.map((ba) => ba.author),
      categories: book.categories.map((bc) => bc.category),
    };

    return NextResponse.json(formattedBook);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

// Atualizar um livro existente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, imageUrl, isbn, authorId, categoryId } = body;

    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id },
      include: {
        authors: true,
        categories: true,
      },
    });

    if (!existingBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Atualizar o livro
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        isbn,
      },
    });

    // Se um novo autor foi fornecido, atualizar a relação
    if (authorId) {
      // Opcional: Remover autores existentes primeiro
      // await prisma.bookAuthor.deleteMany({
      //   where: { bookId: id },
      // });

      // Verificar se a relação já existe
      const existingRelation = await prisma.bookAuthor.findUnique({
        where: {
          bookId_authorId: {
            bookId: id,
            authorId,
          },
        },
      });

      // Criar a relação se não existir
      if (!existingRelation) {
        await prisma.bookAuthor.create({
          data: {
            bookId: id,
            authorId,
          },
        });
      }
    }

    // Similar para categorias
    if (categoryId) {
      const existingRelation = await prisma.bookCategory.findUnique({
        where: {
          bookId_categoryId: {
            bookId: id,
            categoryId,
          },
        },
      });

      if (!existingRelation) {
        await prisma.bookCategory.create({
          data: {
            bookId: id,
            categoryId,
          },
        });
      }
    }

    // Buscar o livro atualizado com seus relacionamentos
    const bookWithRelations = await prisma.book.findUnique({
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

    return NextResponse.json(bookWithRelations);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// Excluir um livro
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Excluir relações primeiro
    await prisma.bookAuthor.deleteMany({
      where: { bookId: id },
    });

    await prisma.bookCategory.deleteMany({
      where: { bookId: id },
    });

    // Excluir o livro
    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
