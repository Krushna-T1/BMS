import { useState } from 'react';
import './AddBooks.css';

function AddBooks(props) {
    const [newBook, setNewBook] = useState({ id: '', title: '', author: '', price: '' });

    function handleChange(e) {
        const { name, value } = e.target;
        setNewBook({...newBook,[name]:value});
    }

    function handleClick() {
        if (!newBook.id || !newBook.title || !newBook.author || !newBook.price) {
            alert('Please fill in all fields.');
            return;
        } else {
            fetch('http://localhost:8000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            })
            .then(() => {
                // Assuming props.setBooks is a function to update books state
                props.setBooks([...props.books, newBook]);
                console.log(props.books);
                // Clear input fields after adding the book
                setNewBook({ id: '', title: '', author: '', price: '' });
            })
          

            
        }
    }

    return (
        <table className='addtable'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>ADD BOOK</th>
                </tr>
            </thead>
            <tbody>
                <tr className='tr'>
                    <td><input type="text" name="id" value={newBook.id} onChange={handleChange}  className='id'/></td>
                    <td><input type="text" name="title" value={newBook.title} onChange={handleChange} /></td>
                    <td><input type="text" name="author" value={newBook.author} onChange={handleChange} /></td>
                    <td><input type="text" name="price" value={newBook.price} onChange={handleChange} /></td>
                    <td><button onClick={handleClick}>Add Book</button></td>
                </tr>
            </tbody>
        </table>
    );
}

export default AddBooks;
