import "./HelpPage.css";

import Navbar from "../components/Navbar";

function HelpPage() {
  return (
    <main id="help-page">
      <Navbar showBack backTo="/" />

      <h1>Help</h1>

      <section className="help-section">
        <h2>Using BookScout</h2>

        <p>
          BookScout helps you find Little Free Libraries and see which books are
          available at each location.
        </p>

        <p>
          Use the map to find libraries near you, select a library to view its
          books, and use the search and filter options to find specific books,
          authors or genres.
        </p>
      </section>

      <section className="help-section">
        <h2>Libraries</h2>

        <h3>Finding a library</h3>
        <p>
          Browse the map to find Little Free Libraries near you. Select a
          library marker to view its information and available books.
        </p>

        <h3>Adding a library</h3>
        <p>
          Select <strong>Add Library</strong> on the map and enter the library's
          information.
        </p>

        <h3>Removing a library</h3>
        <p>
          Select <strong>Remove Library</strong> on the map and select the
          library you want to remove.
        </p>
      </section>

      <section className="help-section">
        <h2>Books</h2>

        <h3>Finding a Book</h3>

        <p>
          Use the search bar on the map to search for a specific book or author.
          You can also filter by genre. The map will update to show only
          libraries that have books matching your search or selected genres.
        </p>

        <p>
          Select a library on the map to see the books in that library that
          match your search or selected filters.
        </p>

        <h3>Adding a book</h3>
        <p>
          Open a library and select <strong>Add Book</strong>. You can scan a
          book's barcode or enter the information manually.
        </p>

        <h3>Removing a book</h3>
        <p>
          Select <strong>Remove Book</strong> and choose the book you want to
          remove.
        </p>
      </section>

      <section className="help-section">
        <h2>Book Information</h2>

        <p>
          Book information is provided based on available book data and
          information submitted through BookScout.
        </p>

        <p>
          The books shown for a library may not always reflect what is
          physically there at the time you visit.
        </p>
      </section>

      <section className="help-section">
        <h2>Need More Help?</h2>

        <p>
          If you found an issue with BookScout or have a question,{" "}
          <a href="mailto:mnlawton@icloud.com">contact us here.</a>
        </p>
      </section>
    </main>
  );
}

export default HelpPage;
