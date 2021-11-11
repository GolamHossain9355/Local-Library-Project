function findAuthorById(authors, id) {
  return authors.find((obj) => obj.id == id);
}

function findBookById(books, id) {
  return books.find((obj) => obj.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksCheckedOut = []
  let booksReturned = []
  let organizedByStatus = []
  books.filter((book) => {
    let [borrowed] = book.borrows;
    if (!borrowed.returned) {
      return booksCheckedOut.push(book);
    } else {
      return booksReturned.push(book)
    }
  });
  organizedByStatus.push(booksCheckedOut, booksReturned)
  return organizedByStatus;
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  return borrows.reduce((acc, key) => {
    let found = accounts.find((person) => person.id == key.id);
    if (acc.length < 10) {
      acc.push(
        (found = {...found, returned: key.returned})
      );
    }
    return acc;
  }, []);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
