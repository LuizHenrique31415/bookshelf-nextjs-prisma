import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obter um autor específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // Formatar os dados
    const formattedAuthor = {
      ...author,
      books: author.books.map((ba) => ba.book),
    };

    return NextResponse.json(formattedAuthor);
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json(
      { error: "Failed to fetch author" },
      { status: 500 }
    );
  }
}

// Atualizar um autor
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, biography } = body;

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        name,
        biography,
      },
    });

    return NextResponse.json(updatedAuthor);
  } catch (error) {
    console.error("Error updating author:", error);
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

// Excluir um autor
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Verificar se o autor existe
    const existingAuthor = await prisma.author.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // Excluir relações primeiro
    await prisma.bookAuthor.deleteMany({
      where: { authorId: id },
    });

    // Excluir o autor
    await prisma.author.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Author deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}
