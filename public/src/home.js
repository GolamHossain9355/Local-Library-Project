function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, key) => {
    let borrowedBook = key.borrows.some((obj) => !obj.returned);
    if (borrowedBook) {
      acc++;
    }
    return acc;
  }, 0);
}

function organizeBooksUnderGenres(books) {
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
  return newArray.sort((genreA, genreB) =>
    genreA[Object.keys(genreA)].length > genreB[Object.keys(genreB)].length
      ? -1
      : 1
  );
}
//console.log(organizeBooksUnderGenres(books))

function getMostCommonGenres(books) {
  let organizedBooks = organizeBooksUnderGenres(books);
  // console.log(organizedBooks);
  let betaVersion = organizedBooks.map((key) => {
    return (key = {
      name: Object.keys(key),
      count: key[Object.keys(key)].length,
    });
  });
  let alphaVersion = betaVersion.reduce((acc, key) => {
    acc.push(
      (key = {
        name: key.name[0],
        count: key.count,
      })
    );
    return acc;
  }, []);
  let finalVersion = [];
  for (let i = 0; i < 5; i++) {
    finalVersion.push(alphaVersion[i]);
  }
  return finalVersion;
}

function sortMostPopularToLeast(books) {
  return books.sort((bookA, bookB) =>
    bookA.borrows.length > bookB.borrows.length ? -1 : 1
  );
}

//forEach((obj, 5)) use this to reform this
function getMostPopularBooks(books) {
  let popularOrganized = sortMostPopularToLeast(books);
  let top5Books = [];
  for (let i = 0; i < 5; i++) {
    top5Books.push(
      (popularOrganized[i] = {
        name: popularOrganized[i].title,
        count: popularOrganized[i].borrows.length,
      })
    );
  }
  return top5Books;
}

function getBooksWithCountAndId(books) {
  let popularOrganized = sortMostPopularToLeast(books);
  let allBoooksOrganized = [];
  for (let i = 0; i < popularOrganized.length; i++) {
    allBoooksOrganized.push(
      (popularOrganized[i] = {
        authorId: popularOrganized[i].authorId,
        count: popularOrganized[i].borrows.length,
      })
    );
  }
  return allBoooksOrganized;
}

function counted(number) {
  return number.reduce((acc, key) => (acc += key), 0);
}

function getBooksWithCountAndId(books) {
  let popularOrganized = sortMostPopularToLeast(books);
  let allBoooksOrganizedAuthor = [];
  for (let i = 0; i < popularOrganized.length; i++) {
    allBoooksOrganizedAuthor.push(
      (popularOrganized[i] = {
        authorId: popularOrganized[i].authorId,
        count: popularOrganized[i].borrows.length,
      })
    );
  }
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
  let booksWithIdAndCount = getBooksWithCountAndId(books);
  let top5Authors = [];
  for (let i = 0; i < 5; i++) {
    top5Authors.push(booksWithIdAndCount[i]);
  }
  return top5Authors.reduce((acc, key) => {
    let foundAuthors = authors.find((obj) => obj.id == key.authorId);
    acc.push(
      (foundAuthors = {
        name: `${foundAuthors.name.first} ${foundAuthors.name.last}`,
        count: key.count,
      })
    );
    return acc;
  }, []);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
