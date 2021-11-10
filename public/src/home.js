function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, key) => {
    if (key.borrows.some((obj) => !obj.returned)) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  let organized = books.reduce((acc, key) => {
    if (acc[key.genre]) {
      acc[key.genre].push(
        (key = {
          id: key.id,
          genre: key.genre,
        })
      );
    } else {
      acc[key.genre] = [
        (key = {
          id: key.id,
          genre: key.genre,
        }),
      ];
    }
    return acc;
  }, {});
  let newArray = [];
  for (let key in organized) {
    newArray.push(
      (key = {
        [key]: organized[key],
      })
    );
  }
  newArray.sort((genreA, genreB) => genreA[Object.keys(genreA)].length > genreB[Object.keys(genreB)].length ? -1 : 1);
  return newArray.map((key) => {
    return (key = {
      name: Object.keys(key)[0],
      count: key[Object.keys(key)].length,
    });
  }).slice(0, 5)
}

function sortMostPopularToLeast(books) {
  return books.sort((bookA, bookB) =>
    bookA.borrows.length > bookB.borrows.length ? -1 : 1
  );
}

function getMostPopularBooks(books) {
  let popularOrganized = sortMostPopularToLeast(books);
  return popularOrganized.map(obj => {
    return obj = {
      name: obj.title,
      count: obj.borrows.length
    }
  }).slice(0, 5)
}

function counted(number) {
  return number.reduce((acc, key) => (acc += key), 0);
}

function getBooksWithCountAdded(books) {
  let allBoooksOrganizedAuthor = books.map(book => {
    return book = {
      authorId: book.authorId,
      count: book.borrows.length
    }
  })
  let authorBookCounted = allBoooksOrganizedAuthor.reduce((acc, key) => {
    if (acc[key.authorId]) {
      acc[key.authorId].push(key.count);
    } else {
      acc[key.authorId] = [key.count];
    }
    return acc;
  }, {});
  let newarray = [];
  for (let key in authorBookCounted) {
    newarray.push(
      (key = {
        authorId: key,
        count: counted(authorBookCounted[key]),
      })
    );
  }
  return newarray.sort((authorA, authorB) =>
    authorA.count > authorB.count ? -1 : 1
  );
}

function getMostPopularAuthors(books, authors) {
  let booksWithIdAndCount = getBooksWithCountAdded(books);
  return booksWithIdAndCount.reduce((acc, key) => {
    let foundAuthors = authors.find((obj) => obj.id == key.authorId);
    acc.push(
      (foundAuthors = {
        name: `${foundAuthors.name.first} ${foundAuthors.name.last}`,
        count: key.count,
      })
    );
    return acc;
  }, []).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
