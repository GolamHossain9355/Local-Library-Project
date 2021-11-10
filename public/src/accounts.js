function findAccountById(accounts, id) {
  return accounts.find((keys) => keys.id == id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) => accA.name.last < accB.name.last ? -1 : 1
);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    if(book.borrows.find(borrow => borrow.id == account.id)) {
      acc.push(book)
    }
    return acc
  }, []).length
}

function booksCheckedOut(account, books) {
  return books.reduce((acc, key) => {
    let borrowsArray = key.borrows;
    if (borrowsArray.some(obj => !obj.returned && obj.id == account.id)) {
      acc.push((key = { ...key, borrows: key.borrows[0] }));
    }
    return acc;
  }, []);
}
function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = booksCheckedOut(account, books);
  return borrowedBooks.reduce((acc, key) => {
    let foundAuthor = authors.find((obj) => obj.id == key.authorId);
    acc.push((key = { ...key, author: foundAuthor }));
    return acc;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
