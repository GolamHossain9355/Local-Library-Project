function findAccountById(accounts, id) {
  return accounts.find((keys) => keys.id == id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) =>
    accA.name.last < accB.name.last ? -1 : 1
  );
}
//
function getTotalNumberOfBorrows(account, books) {
  let selectedId = account.id;
  return books.reduce((acc, book) => {
    let allBorrowed = book.borrows.reduce((acc2, borrowId) => {
      if (borrowId.id == selectedId) {
        acc2.push(borrowId);
      }
      return acc2;
    }, []);
    return acc + allBorrowed.length;
  }, 0);
}

function booksCheckedOut(account, books) {
  const selectedId = account.id;
  return books.reduce((acc, key) => {
    let borrowsArray = key.borrows;
    let borrowedBooks = borrowsArray.some((obj) => {
      if (!obj.returned && obj.id == selectedId) {
        return true;
      }
    });
    if (borrowedBooks) {
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
