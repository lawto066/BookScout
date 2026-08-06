CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    library_id INTEGER REFERENCES libraries(id),
    title TEXT NOT NULL,
    author TEXT,
    publication_year INTEGER,
    genre TEXT,
    synopsis TEXT,
    isbn TEXT,
    cover_image TEXT
);

-- Dummy Data --
INSERT INTO books 
(library_id, title, author, publication_year, genre, synopsis, isbn, cover_image)
VALUES

-- Maddi's Little Library (library_id 1)
(29, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'A hobbit named Bilbo Baggins joins a quest to reclaim treasure guarded by a dragon.', '9780547928227', ''),
(29, 'Dune', 'Frank Herbert', 1965, 'Science Fiction', 'A young noble becomes involved in politics and survival on the desert planet Arrakis.', '9780441172719', ''),
(29, 'Charlotte''s Web', 'E.B. White', 1952, 'Children''s', 'A friendship between a pig and a spider changes the life of a farm.', '9780064400558', ''),
(29, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Historical Fiction', 'A mysterious millionaire throws extravagant parties during the Jazz Age.', '9780743273565', ''),
(29, 'The Martian', 'Andy Weir', 2011, 'Science Fiction', 'An astronaut stranded on Mars must use science and creativity to survive.', '9780553418026', ''),

-- Millie's Book Corner (library_id 2)
(30, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'A hobbit named Bilbo Baggins joins a quest to reclaim treasure guarded by a dragon.', '9780547928227', ''),
(30, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 1997, 'Fantasy', 'A young wizard discovers his magical heritage and attends Hogwarts.', '9780590353427', ''),
(30, 'The Silent Patient', 'Alex Michaelides', 2019, 'Mystery', 'A therapist investigates why a famous painter stopped speaking after a crime.', '9781250301697', ''),
(30, 'Educated', 'Tara Westover', 2018, 'Biography', 'A memoir about education, family, and personal transformation.', '9780399590504', ''),
(30, 'Gone Girl', 'Gillian Flynn', 2012, 'Thriller', 'A disappearance investigation reveals secrets between a married couple.', '9780553418361', ''),

-- Bear's Book Nook (library_id 3)
(31, 'Dune', 'Frank Herbert', 1965, 'Science Fiction', 'A young noble becomes involved in politics and survival on Arrakis.', '9780441172719', ''),
(31, 'Mistborn: The Final Empire', 'Brandon Sanderson', 2006, 'Fantasy', 'A group of rebels attempts to overthrow an immortal ruler.', '9780765311788', ''),
(31, 'The Hunger Games', 'Suzanne Collins', 2008, 'Young Adult', 'A teenager fights for survival in a dangerous televised competition.', '9780439023481', ''),
(31, 'The Shining', 'Stephen King', 1977, 'Horror', 'A family experiences terrifying events while isolated in a hotel.', '9780307743657', ''),
(31, 'The Martian', 'Andy Weir', 2011, 'Science Fiction', 'An astronaut stranded on Mars must survive using science.', '9780553418026', ''),

-- Maple's Reading Shelf (library_id 4)
(32, 'Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 1998, 'Fantasy', 'Harry returns to Hogwarts and discovers a hidden mystery.', '9780439064873', ''),
(32, 'Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 'A classic story of relationships, reputation, and marriage.', '9780141439518', ''),
(32, 'The Notebook', 'Nicholas Sparks', 1996, 'Romance', 'A romantic story about love remembered across a lifetime.', '9780446605236', ''),
(32, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'Mystery', 'A journalist investigates a decades-old disappearance.', '9780307454546', ''),
(32, 'Percy Jackson: The Lightning Thief', 'Rick Riordan', 2005, 'Young Adult', 'A teenager discovers he is connected to Greek mythology.', '9780786838653', ''),

-- Chase's Book Exchange (library_id 5)
(33, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'A hobbit joins a dangerous adventure across Middle-earth.', '9780547928227', ''),
(33, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy', 'A group of heroes attempts to destroy a powerful ring.', '9780618640157', ''),
(33, 'Project Hail Mary', 'Andy Weir', 2021, 'Science Fiction', 'An astronaut wakes alone in space on a mission to save humanity.', '9780593135204', ''),
(33, 'It', 'Stephen King', 1986, 'Horror', 'A group of friends confronts a terrifying supernatural creature.', '9781501142970', ''),
(33, 'Becoming', 'Michelle Obama', 2018, 'Biography', 'A memoir about life, family, and public service.', '9781524763138', ''),

-- Nolen's Neighborhood Library (library_id 6)
(34, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Historical Fiction', 'A mysterious millionaire throws extravagant parties during the Jazz Age.', '9780743273565', ''),
(34, 'The Alchemist', 'Paulo Coelho', 1988, 'Adventure', 'A young shepherd follows a journey to discover his purpose.', '9780061122415', ''),
(34, 'The Da Vinci Code', 'Dan Brown', 2003, 'Thriller', 'A mystery involving symbols, history, and secret societies.', '9780307474278', ''),
(34, 'The Outsiders', 'S.E. Hinton', 1967, 'Young Adult', 'A coming-of-age story about friendship and social conflict.', '9780142407332', ''),
(34, 'A Brief History of Time', 'Stephen Hawking', 1988, 'Nonfiction', 'An introduction to cosmology and the science of the universe.', '9780553380163', ''),

-- Kaleigh's Cozy Books (library_id 7)
(35, 'Dune', 'Frank Herbert', 1965, 'Science Fiction', 'A young noble becomes involved in politics on Arrakis.', '9780441172719', ''),
(35, 'The Road', 'Cormac McCarthy', 2006, 'Adventure', 'A father and son travel through a dangerous future landscape.', '9780307386458', ''),
(35, 'The Catcher in the Rye', 'J.D. Salinger', 1951, 'Drama', 'A teenager struggles with identity and growing up.', '9780316769488', ''),
(35, 'Dracula', 'Bram Stoker', 1897, 'Horror', 'A classic tale of vampires and mystery.', '9780486411095', ''),
(35, 'The Little Prince', 'Antoine de Saint-Exupéry', 1943, 'Children''s', 'A poetic story about friendship and imagination.', '9780156012195', ''),

-- Bella's Book Garden (library_id 8)
(36, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 1997, 'Fantasy', 'A young wizard discovers his magical heritage.', '9780590353427', ''),
(36, 'Mistborn: The Final Empire', 'Brandon Sanderson', 2006, 'Fantasy', 'A rebellion forms against an immortal ruler.', '9780765311788', ''),
(36, 'The Help', 'Kathryn Stockett', 2009, 'Historical Fiction', 'Women tell stories of life and change in 1960s Mississippi.', '9780399155345', ''),
(36, 'Atomic Habits', 'James Clear', 2018, 'Nonfiction', 'A guide to building better habits through small changes.', '9780735211292', ''),
(36, 'The Very Hungry Caterpillar', 'Eric Carle', 1969, 'Children''s', 'A caterpillar grows and transforms through a colorful journey.', '9780399226908', ''),

-- Riverbend Readers (library_id 9)
(37, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy', 'A group attempts to destroy a powerful ring.', '9780618640157', ''),
(37, 'The Silent Patient', 'Alex Michaelides', 2019, 'Mystery', 'A therapist investigates a mysterious crime.', '9781250301697', ''),
(37, 'The Shining', 'Stephen King', 1977, 'Horror', 'A family experiences supernatural events.', '9780307743657', ''),
(37, 'The Martian', 'Andy Weir', 2011, 'Science Fiction', 'An astronaut struggles to survive on Mars.', '9780553418026', ''),

-- Willow Creek Books (library_id 10)
(38, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'A hobbit joins a dangerous adventure.', '9780547928227', ''),
(38, 'Project Hail Mary', 'Andy Weir', 2021, 'Science Fiction', 'A lone astronaut must save humanity.', '9780593135204', ''),
(38, 'Gone Girl', 'Gillian Flynn', 2012, 'Thriller', 'A disappearance reveals hidden secrets.', '9780553418361', ''),
(38, 'Becoming', 'Michelle Obama', 2018, 'Biography', 'A memoir about life and leadership.', '9781524763138', '');