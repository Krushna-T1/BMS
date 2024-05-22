// import Data from './Data';
import Book from './Book';
import './App.css';
import { useEffect, useState } from 'react';
import AddBooks from './AddBooks'


function App() {


  let initialBook=[
    {id:1, title:"To Kill a Mockingbird", author:"Harper Lee", price: 800 },
    {id:2, title:"1984", author:"George Orwell", price: 750 },
    {id:3,title: "The Great Gatsby",author:"F. Scott Fitzgerald",price:1000 },
    {id: 4,title:"Pride and Prejudice", author: "Jane Austen", price: 650 },
    {id:5,title:"The Catcher in the Rye",author:"J.D. Salinger", price:850 }
];
  let [books,setBooks]=useState(initialBook);
  function removeBook(id) {
    
fetch(`http://localhost:8000/books/${id}`,{
  method :'DELETE'

}).then(() =>{
  let updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    console.log(books);
})

  }
 useEffect(()=>{ fetch('http://localhost:8000/books').then
  ((response)=>{
         return response.json();
  }).then((data)=>{
   setBooks(data);
  })
},[])
if (books === null) {
  return <p>Loading books...</p>;
}
  return (
 
    <div className='container'>
      <h3>Add New Book</h3>
    <div className='addbook'>
     <AddBooks setBooks={setBooks}books={books}></AddBooks></div>
     
      <div className='data'>
        <h3>Books List</h3>
        <table  >
          <thead>
          <tr >
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Remove</th>
            <th>Update</th>
            </tr>
            </thead>
            <tbody>{
             
   books.map(book=>{
    return<Book key={book.id} id={book.id} title={book.title} author={book.author}price={book.price} removeBook={removeBook} setBooks={setBooks} books={books} ></Book>
 
   })
  }
  </tbody>
  </table>
  </div>
  </div>

  );
}

export default App;
