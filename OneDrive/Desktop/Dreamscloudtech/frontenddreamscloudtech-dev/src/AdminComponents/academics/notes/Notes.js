
import React, { useState } from "react";
import { TextField, Button, Card, CardMedia, CardContent, Typography, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import './Library.css';

const initialBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.5, image: "https://m.media-amazon.com/images/I/41XMaCHkrgL._SY1000_.jpg", availability: 2, issued: [] },
  { id: 2, title: "To Kill Mockingbird", author: "Harper Lee", rating: 4.8, image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg", availability: 0, issued: [{ studentName: "John Doe", studentClass: "10A", rollNumber: "123", issueDate: "2024-09-10" }] },
  { id: 3, title: "1984", author: "George Orwell", rating: 4.7, image: "https://m.media-amazon.com/images/I/7180qjGSgDL._AC_UF1000,1000_QL80_.jpg", availability: 1, issued: [] },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", rating: 4.6, image: "https://m.media-amazon.com/images/I/91eKRbuhgaL._AC_UF1000,1000_QL80_.jpg", availability: 3, issued: [] },
];

function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [openIssuedListDialog, setOpenIssuedListDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [books, setBooks] = useState(initialBooks);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );

  const handleIssueBook = (book) => {
    setSelectedBook(book);
    setOpenIssueDialog(true);
  };

  const handleIssue = () => {
    if (selectedBook && selectedBook.availability > 0) {
      const currentDate = new Date();
      const formattedCurrentDate = formatDate(currentDate);
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              availability: book.availability - 1,
              issued: [...book.issued, { studentName, studentClass, rollNumber, issueDate: formattedCurrentDate }],
            };
          }
          return book;
        })
      );
      setOpenIssueDialog(false);
      setStudentName("");
      setStudentClass("");
      setRollNumber("");
    } else {
      alert("No availability left for this book.");
    }
  };

  const handleCloseIssueDialog = () => {
    setOpenIssueDialog(false);
  };

  const handleViewIssuedList = (book) => {
    setSelectedBook(book);
    setOpenIssuedListDialog(true);
  };

  const handleCloseIssuedListDialog = () => {
    setOpenIssuedListDialog(false);
  };

  // Function to format date to dd-mm-yyyy
  const formatDate = (date) => {
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Calculate due date (15 days after issue date)
  const calculateDueDate = (issueDate) => {
    const [day, month, year] = issueDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 15);
    return formatDate(date); // Return due date in dd-mm-yyyy format
  };

  // Function to send a reminder (For now it just alerts the user)
  const sendReminder = (studentName) => {
    alert(`Reminder sent to ${studentName} to return the book.`);
  };

  return (
    <Box sx={{ backgroundColor: "#EEF7FF", padding: "20px", minHeight: "100vh" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the Library
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          label="Search for books, authors..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '50%', backgroundColor: "#ffffff" }}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card sx={{ backgroundColor: "#ffffff", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.image}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h5">{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px", marginLeft: "20px" }}>
                    Rating: {book.rating} ⭐
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    Available: {book.availability}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    {book.availability > 0 ? (
                      <>
                        <Button variant="contained" onClick={() => handleIssueBook(book)} sx={{ marginRight: "10px" }}>
                          Issue Book
                        </Button>
                        <Button variant="outlined" onClick={() => handleViewIssuedList(book)}>
                          View Issued List
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" disabled>
                          Not Available
                        </Button>
                        <Button variant="outlined" onClick={() => handleViewIssuedList(book)} sx={{ marginLeft: "10px" }}>
                          View Issued List
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No books found.
          </Typography>
        )}
      </Grid>

      {/* Issue Book Dialog */}
      <Dialog open={openIssueDialog} onClose={handleCloseIssueDialog}>
        <DialogTitle>Issue Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            fullWidth
            variant="outlined"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Class"
            fullWidth
            variant="outlined"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Roll Number"
            fullWidth
            variant="outlined"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIssueDialog}>Cancel</Button>
          <Button onClick={handleIssue}>Issue</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openIssuedListDialog} onClose={handleCloseIssuedListDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          textAlign: "center" // Centers the text in the list items
        }}>Issued Books for {selectedBook?.title}</DialogTitle>
        <DialogContent>
          {selectedBook?.issued.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",


                textAlign: "center"
              }}
            >
              {selectedBook.issued.map((entry, index) => (
                <Box key={index} sx={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px", width: '100%' }}>
                  <Typography>
                    <strong>Student Name:</strong> {entry.studentName}
                  </Typography>
                  <Typography>
                    <strong>Class:</strong> {entry.studentClass} | <strong>Roll No.:</strong> {entry.rollNumber}
                  </Typography>
                  <Typography>
                    <strong>Issue Date:</strong> {entry.issueDate}
                  </Typography>
                  <Typography>
                    <strong>Due Date:</strong> {calculateDueDate(entry.issueDate)}
                  </Typography>
                  <Button variant="contained" onClick={() => sendReminder(entry.studentName)} sx={{ marginTop: "10px" }}>
                    Send Reminder
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
              No books have been issued.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIssuedListDialog}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default Notes;
