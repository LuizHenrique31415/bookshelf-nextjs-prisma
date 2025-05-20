const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar categorias
    console.log("Criando categorias...");
    const ficCategory = await prisma.category.create({
      data: { name: "Ficção" },
    });
    const nonficCategory = await prisma.category.create({
      data: { name: "Não-Ficção" },
    });
    const fantasyCategory = await prisma.category.create({
      data: { name: "Fantasia" },
    });
    const scifiCategory = await prisma.category.create({
      data: { name: "Ficção Científica" },
    });
    const romanceCategory = await prisma.category.create({
      data: { name: "Romance" },
    });
    const mysteryCategory = await prisma.category.create({
      data: { name: "Mistério" },
    });

    // Criar autores
    console.log("Criando autores...");
    const rowling = await prisma.author.create({
      data: {
        name: "J.K. Rowling",
        biography: "Autora britânica, conhecida pela série Harry Potter",
      },
    });

    const orwell = await prisma.author.create({
      data: {
        name: "George Orwell",
        biography: "Escritor e jornalista britânico",
      },
    });

    const austen = await prisma.author.create({
      data: {
        name: "Jane Austen",
        biography: "Romancista inglesa do século XIX",
      },
    });

    const herbert = await prisma.author.create({
      data: {
        name: "Frank Herbert",
        biography: "Autor americano de ficção científica",
      },
    });

    const christie = await prisma.author.create({
      data: {
        name: "Agatha Christie",
        biography: "Escritora britânica de romances policiais",
      },
    });

    // Criar livros
    console.log("Criando livros...");
    const harryPotter = await prisma.book.create({
      data: {
        title: "Harry Potter e a Pedra Filosofal",
        description:
          "O primeiro livro da série Harry Potter que introduz o jovem bruxo Harry Potter.",
        imageUrl:
          "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg",
        isbn: "9788532511010",
      },
    });

    const ninety84 = await prisma.book.create({
      data: {
        title: "1984",
        description: "Um romance distópico que retrata um futuro totalitário.",
        imageUrl:
          "https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg",
        isbn: "9788535914849",
      },
    });

    const prideAndPrejudice = await prisma.book.create({
      data: {
        title: "Orgulho e Preconceito",
        description:
          "Um romance de costumes que satiriza a sociedade inglesa do século XIX.",
        imageUrl:
          "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
        isbn: "9788544001820",
      },
    });

    const dune = await prisma.book.create({
      data: {
        title: "Duna",
        description:
          "Uma épica aventura de ficção científica passada em um planeta desértico.",
        imageUrl:
          "https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg",
        isbn: "9788576571148",
      },
    });

    const murderOrient = await prisma.book.create({
      data: {
        title: "Assassinato no Expresso do Oriente",
        description:
          "Um dos mais famosos mistérios de Agatha Christie, estrelado por Hercule Poirot.",
        imageUrl:
          "https://m.media-amazon.com/images/I/71wQDKsiliL._AC_UF1000,1000_QL80_.jpg",
        isbn: "9788595086197",
      },
    });

    // Criar relacionamentos
    console.log("Estabelecendo relacionamentos...");

    // Harry Potter - autores
    await prisma.bookAuthor.create({
      data: {
        bookId: harryPotter.id,
        authorId: rowling.id,
      },
    });

    // Harry Potter - categorias
    await prisma.bookCategory.create({
      data: {
        bookId: harryPotter.id,
        categoryId: ficCategory.id,
      },
    });

    await prisma.bookCategory.create({
      data: {
        bookId: harryPotter.id,
        categoryId: fantasyCategory.id,
      },
    });

    // 1984 - autores
    await prisma.bookAuthor.create({
      data: {
        bookId: ninety84.id,
        authorId: orwell.id,
      },
    });

    // 1984 - categorias
    await prisma.bookCategory.create({
      data: {
        bookId: ninety84.id,
        categoryId: ficCategory.id,
      },
    });

    await prisma.bookCategory.create({
      data: {
        bookId: ninety84.id,
        categoryId: scifiCategory.id,
      },
    });

    // Orgulho e Preconceito - autores
    await prisma.bookAuthor.create({
      data: {
        bookId: prideAndPrejudice.id,
        authorId: austen.id,
      },
    });

    // Orgulho e Preconceito - categorias
    await prisma.bookCategory.create({
      data: {
        bookId: prideAndPrejudice.id,
        categoryId: ficCategory.id,
      },
    });

    await prisma.bookCategory.create({
      data: {
        bookId: prideAndPrejudice.id,
        categoryId: romanceCategory.id,
      },
    });

    // Duna - autores
    await prisma.bookAuthor.create({
      data: {
        bookId: dune.id,
        authorId: herbert.id,
      },
    });

    // Duna - categorias
    await prisma.bookCategory.create({
      data: {
        bookId: dune.id,
        categoryId: ficCategory.id,
      },
    });

    await prisma.bookCategory.create({
      data: {
        bookId: dune.id,
        categoryId: scifiCategory.id,
      },
    });

    // Assassinato no Expresso do Oriente - autores
    await prisma.bookAuthor.create({
      data: {
        bookId: murderOrient.id,
        authorId: christie.id,
      },
    });

    // Assassinato no Expresso do Oriente - categorias
    await prisma.bookCategory.create({
      data: {
        bookId: murderOrient.id,
        categoryId: ficCategory.id,
      },
    });

    await prisma.bookCategory.create({
      data: {
        bookId: murderOrient.id,
        categoryId: mysteryCategory.id,
      },
    });

    console.log("Seed concluído com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
