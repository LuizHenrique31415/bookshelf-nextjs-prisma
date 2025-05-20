import React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

// Inter font configuration with latin subset
const inter = Inter({ subsets: ["latin"] });

// Application metadata
export const metadata = {
  title: "Book Library",
  description: "A website to explore books, inspired by Kindle's visual design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="site-header">
          <div className="container header-container">
            <Link href="/" className="site-logo">
              BookHub
            </Link>

            <nav className="main-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/book" className="nav-link">
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/author" className="nav-link">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/category" className="nav-link">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/search" className="nav-link">
                    Search
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="container main-container">{children}</div>

        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Book Library</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
