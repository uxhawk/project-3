import axios from "axios";

export default {
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
  // getGoogleUser: function() {
  //   console.log('axios function');
  //   return axios.get('/auth/google');
  // }
    // Gets the user by the email in the login form
  getUserByEmail: function(email) {
    return axios.get('/api/user/' + email);
  },
};
