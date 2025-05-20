import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Listar todos os autores
export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    // Formatar os dados
    const formattedAuthors = authors.map((author) => ({
      ...author,
      books: author.books.map((ba) => ba.book),
    }));

    return NextResponse.json(formattedAuthors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

// Criar um novo autor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, biography } = body;

    const newAuthor = await prisma.author.create({
      data: {
        name,
        biography,
      },
    });

    return NextResponse.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error("Error creating author:", error);
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}
