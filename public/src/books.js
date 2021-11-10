function findAuthorById(authors, id) {
  return authors.find((obj) => obj.id == id);
}

function findBookById(books, id) {
  return books.find((obj) => obj.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksCheckedOut = books.filter((book) => {
    let [borrowed] = book.borrows;
    if (!borrowed.returned) {
      return book;
    }
  });
  let booksReturned = books.filter((book) => {
    let [borrowed] = book.borrows;
    if (borrowed.returned) {
      return book;
    }
  });
  let organizedByStatus = [];
  organizedByStatus.push(booksCheckedOut, booksReturned);
  return organizedByStatus;
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  return borrows.reduce((acc, key) => {
    let found = accounts.find((person) => person.id == key.id);
    if (acc.length < 10) {
      acc.push(
        (found = {
          id: found.id,
          returned: key.returned,
          picture: found.picture,
          age: found.age,
          name: found.name,
          company: found.company,
          email: found.email,
          registered: found.registered,
        })
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
