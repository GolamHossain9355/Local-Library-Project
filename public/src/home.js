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
  return number.reduce((acc, key) => acc += key, 0);
}
function getMostPopularAuthors(books, authors) {
  return authors.reduce((acc, author) => {
    let authorBooks = books.filter(book => author.id == book.authorId) 
    let mapped = authorBooks.map(key => {
      return key.borrows.length
    })
    let allCounted = counted(mapped)
    acc.push(z = {
      name: `${author.name.first} ${author.name.last}`,
      count: allCounted
    })
    return acc
  }, []).sort((countA, countB) => countA.count > countB.count ? -1 : 1).slice(0 , 5)
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
