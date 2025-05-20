import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Listar todas as categorias
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    // Formatar os dados
    const formattedCategories = categories.map((category) => ({
      ...category,
      books: category.books.map((bc) => bc.book),
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Criar uma nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
