const express = require('express');
const app = express();

app.use(express.json());

// Array to store the books
let books = [];

// Route to serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  // Check if required properties are provided
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  // Generate a unique ID for the book
  const id = Date.now().toString();

  // Create the book object
  const book = {
    id,
    title,
    author,
    publishedDate
  };

  // Add the book to the collection
  books.push(book);

  // Return the book object in the response
  res.json(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the book with the specified ID
  const index = books.findIndex(book => book.id === id);

  // If the book is not found, return an error
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Remove the book from the collection
  books.splice(index, 1);

  // Return success message
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
