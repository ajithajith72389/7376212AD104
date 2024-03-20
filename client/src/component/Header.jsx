import React, { useRef, useState } from 'react'


function Header() {
  const list = [
    {
      id: 1,
      productName: "Laptop 1",
      price: "2222",
      rating : "4.7",
      discount : "63",
      avalability : "yes"
    },
    {
      id: 2,
      productName: "Laptop 13",
      price: "1244",
      rating: "4.5",
      discount: "45",
      avalability: "out-of-stock"
    },
    {
      id: 3,
      productName: "Laptop 3",
      price: "9102",
      rating: "4.5",
      discount: "45",
      avalability: "out-of-stock"
    },
    {
      id: 4,
      productName: "Laptop 11",
      price: "9102",
      rating: "4.44",
      discount: "98",
      avalability: "out-of-stock"
    },
    {
      id: 5,
      productName: "Laptop 11",
      price: "2652",
      rating: "4.12",
      discount: "70",
      avalability: "yes"
    },
    {
      id: 6,
      productName: "Laptop 4",
      price: "1258",
      rating: "3.8",
      discount: "33",
      avalability: "yes"
    },
    {
      id: 7,
      productName: "Laptop 13",
      price: "8686",
      rating: "3.22",
      discount: "24",
      avalability: "out-of-stock"
    },
    {
      id: 8,
      productName: "Laptop 14",
      price: "9254",
      rating: "3",
      discount: "56",
      avalability: "yes"
    }
  ]
  const [lists, setList] = useState(list)
  const [updateState, setUpdateState] = useState(-1)
  return (
    <div className='crud'>
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit}>
          <table>
            {
              lists.map((current) => (
                updateState === current.id ? <EditList current={current} lists={lists} setList={setList} /> :
                  <tr>
                    <td>{current.productName}</td>
                    <td>{current.price}</td>
                    <td>{current.rating}</td>
                    <td>{current.discount}</td>
                    <td>{current.avalability}</td>
                    <td>
                      <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                      <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                    </td>
                  </tr>
              ))
            }
          </table>
        </form>
      </div>
    </div>
  )

  function handleEdit(id) {
    setUpdateState(id)
  }
  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id)
    setList(newlist)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const productName = event.target.elements.productName.value
    const price = event.target.elements.price.value
    
    const newlist = lists.map((li) => (
      li.id === updateState ? { ...li, productName: productName, price: price, rating: rating, discount: discount, avalability: avalability } : li
    ))

    setList(newlist)
    setUpdateState(-1)
  }
}

function EditList({ current, lists, setList }) {
  function handInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) => (
      li.id === current.id ? { ...li, name: value } : li
    ))

    setList(newlist)
  }
  function handInputprice(event) {
    const value = event.target.value;
    const newlist = lists.map((li) => (
      li.id === current.id ? { ...li, price: value } : li
    ))

    setList(newlist)
  }
  return (
    <tr>
      <td><input type="text" onChange={handInputname} name='name' value={current.productName} /></td>
      <td><input type="text" onChange={handInputprice} name='price' value={current.price} /></td>
      <td><input type="text" onChange={handInputname} name='name' value={current.rating} /></td>
      <td><input type="text" onChange={handInputname} name='name' value={current.discount} /></td>
      <td><input type="text" onChange={handInputprice} name='price' value={current.avalability} /></td>
      <td><button type='submit'>Update</button></td>
    </tr>
  )
}

function AddList({ setList }) {
  const nameRef = useRef()
  const priceRef = useRef()

  function handleSubmit(event) {
    event.preventDefault();
    const productName = event.target.elements.productName.value;
    const price = event.target.elements.price.value;
    const newlist = {
      id: 3,
      productName,
      price
    }
    setList((prevList) => {
      return prevList.concat(newlist)
    })
    nameRef.current.value = ""
    priceRef.current.value = ""
    ratingRef.current.value=""
    discountRef.current.value=""
    avalabilityRef.current.value=""
  }
  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Enter Name" ref={nameRef} />
      <input type="text" name="price" placeholder="Enter Price" ref={priceRef} />
      <input type="text" name="rating" placeholder="Enter rating" ref={ratingRef} />
      <input type="text" name="discount" placeholder="Enter discount" ref={discountRef} />
      <input type="text" name="availability" placeholder="Enter availability" ref={avalabilityRef} />
      <button type="submit">Add</button>
    </form>
  )
}

export default Header;