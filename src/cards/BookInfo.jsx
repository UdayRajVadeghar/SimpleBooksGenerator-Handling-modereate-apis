import React from "react";

const BookInfo = (props) => {
  const { title, publisher, description, rating } = props;

  return (
    <div className="p-4 border-black border-2">
      <div>
        <ul>
          <li>Title : {title}</li>
          <li>publisher : {publisher}</li>
          <li>description : {description}</li>
          <li>rating : {rating}</li>
        </ul>
      </div>
    </div>
  );
};

export default BookInfo;
