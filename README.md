# BookScout

BookScout is a web application designed primarily for mobile devices that helps users discover and interact with 
Little Free Libraries in their community. Users can browse nearby libraries on an interactive map, view available 
books, and manage library inventories through simple add and remove workflows.

## Screenshots

| Home / Map | Library | Book Details |
|------------|----------|--------------|
| ![](docs/map-page.png) | ![](docs/library-page.png) | ![](docs/book-page.png) |


## Overview

BookScout is designed to make Little Free Libraries easier to use by allowing users to view library locations and 
browse available books before visiting.

Users can:

- View nearby Little Free Libraries
- View library information and available books
- Browse details about individual books
- Add and remove books from a library's inventory


## Features

### Library Discovery
- Interactive map displaying Little Free Library locations
- Select or add a library directly from the map

### Library Inventory
- View a library's name and location
- Browse available books with cover images
- Horizontally scrolling book collection

### Book Details
- Ability to view the:
  - Cover image
  - Title
  - Author
  - Publication year
  - Genre
  - Synopsis

### Inventory Management
- Add Book confirmation workflow
- Remove Book mode with confirmation before deletion


## User Experience

BookScout was designed around several user personas identified during project planning.

Joann:
An 80-year-old retiree who enjoys walking to Little Free Libraries and finding books within her favorite genres.

David:
A father of two who looks for children's books to read with his family and regularly donates books back to the community.

Alex:
A college student searching for fantasy and science fiction books while taking advantage of free community resources.

Thomas:
A book collector who enjoys browsing inventories in search of additions to his personal collection.

Susan:
A Little Free Library steward responsible for maintaining and organizing a neighborhood library's inventory.

These personas guided many interface decisions, emphasizing simplicity, large touch targets, and minimizing unnecessary navigation for users.

---

## Technologies Used (so far)

- React
- React Router Dom
- React Leaflet (Map)
- Vite
- CSS


## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

## Future Improvements

Planned features include:

- ISBN barcode scanning
- Automatic book information lookup
- Library watch lists
- Persistent database storage
- Inventory history and statistics
- Larger Base Size initial Libraries
- Statistics showing library activity
- Search and filtering by title, author, or genre
- Favorite/watch lists for libraries
- User accounts? (LFL Owners?)

## Developer Notes

This early version of the project currently uses dummy data to demonstrate the application's interface and functionality. 
Future development will focus on database integration, ISBN scanning, and real-time inventory updates as mentioned above.