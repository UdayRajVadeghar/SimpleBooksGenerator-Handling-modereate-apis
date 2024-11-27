import React from "react";
import { useState, useEffect } from "react";
import BookInfo from "./cards/BookInfo";

const App = () => {
  const [newBooks, setNewBooks] = useState([]);
  const [populateBooks, setPopulateBooks] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchBooks() {
    setLoading(true);
    try {
      let getBooksInfo = await fetch(
        "https://api.freeapi.app/api/v1/public/books"
      );

      getBooksInfo = await getBooksInfo.json();

      extractingInfo(getBooksInfo.data.data);
    } catch (error) {
      console.log(error, "Unable to fetch movies");
    } finally {
      setLoading(false);
    }
  }

  function extractingInfo(books) {
    let newArray = [];

    books.forEach((book) => {
      const info = {
        title: book.volumeInfo.title,
        publisher: book.volumeInfo.publisher,
        description: book.volumeInfo.description,
        rating: book.volumeInfo.averageRating || "Not determined",
      };
      newArray.push(info);
    });

    setNewBooks(newArray);
    setPopulateBooks(true);
  }

  return (
    <div className="">
      <div>
        <h1 className="p-4 text-3xl">Get Random Books Info</h1>
        <div className="bg-red-200 border-2 border-black w-20">
          <button onClick={() => fetchBooks()}>
            {loading ? "Loading..." : "Fetch the books"}
          </button>
        </div>
        {populateBooks && (
          <ul>
            {newBooks.map((book, index) => {
              return (
                <BookInfo
                  key={index}
                  title={book.title}
                  description={book.description.substring(0, 150)}
                  publisher={book.publisher}
                  rating={book.rating}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
