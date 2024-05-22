import { useState } from 'react';
import './Book.css';
function Book(prop){
   
   let [bookData,updateBookData]=useState({id:prop.id,title:prop.title,author:prop.author,price:prop.price})

let [isUpdating,setUpdating]=useState(false);

   function isUpdatable(){
    isUpdating ? setUpdating(false):setUpdating(true);
   
}

// updating
function handleChange(event){
    let {name ,value}=event.target;
    updateBookData({...bookData,[name]:value}); 
    }


    function handleClick(idx){
        fetch(`http://localhost:8000/books/${idx}`,{
            method:"PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(bookData)
        }).then(()=>{
            const updatedBooks = prop.books.map(book =>
                book.id === idx ? { ...book, ...bookData } : book
            );
            prop.setBooks(updatedBooks);
        })
        // const updatedBooks = prop.books.map(book =>
        //     book.id === idx ? { ...book, ...bookData } : book
        // );
        // prop.setBooks(updatedBooks);
        // setIsUpdating(false);
   
    }


let data=<tr className='bookrow' key={prop.id} id='row'>
            <td>{prop.id}</td>
            <td>{prop.title}</td>
            <td>{prop.author}</td>
            <td>{prop.price}</td>
            <td> <button className="btn" onClick={()=>prop.removeBook(prop.id)}>Remove</button></td>
            <td> <button className="btn update" onClick={()=>isUpdatable()}>Update</button></td>
            </tr>


if(isUpdating){
   data= <tr className='bookrow' key={prop.id} id='row'>
                    <td><input type="text" name="id" value={bookData.id} placeholder={prop.id}  onChange={handleChange} disabled/></td>

                    <td><input type="text" name="title" value={bookData.title}  onChange={handleChange}/></td>

                    <td><input type="text" name="author" value={bookData.author} placeholder={prop.author} onChange={handleChange}/></td>

                    <td><input type="text" name="price" value={bookData.price} placeholder={prop.price} onChange={handleChange}/></td>

                    <td> <button className="btn" onClick={()=>prop.removeBook(prop.id)} disabled>Remove</button></td>

                    <td> <button className="btn update" onClick={()=>{isUpdatable() ; handleClick(prop.id)}}>Save</button></td>
                </tr>

}
    return(
      data
   
    );
}
export default Book;