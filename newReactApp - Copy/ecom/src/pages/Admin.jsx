import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Admin = (props) => {
    const setProdsFromApp = props.setAllProds
    const [productsAdmin, setProductsAdmin] = useState('')
    useEffect(() => {
        setProductsAdmin(props.allproducts)



    }, [])
    const [logAdmin, setLogAdmin] = useState(true)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const LoginHandler = (e) => {
        setUserName(e.target.value)

    }
    const PasswordHandler = (e) => {

        setPassword(e.target.value)

    }

    const accessHandler = () => {
        if (userName === 'admin' && password === 'admin') {
            setLogAdmin(false)
        }
        else {
            alert('Username or/and Password is not correct')
        }

    }
    const [newCat, setNewCat] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newImage, setNewImage] = useState('')




    const addCatHandler = (e) => {
        setNewCat(e.target.value)
        console.log(e.target.value);

    }

    const addDescHandler = (e) => {
        setNewDesc(e.target.value)

    }

    const addTitleHandler = (e) => {
        setNewTitle(e.target.value)
    }

    const addPriceHandler = (e) => {
        setNewPrice(e.target.value)

    }

    const addImageHandler = (e) => {
        setNewImage(e.target.value)

    }

    const addNewProdHandler = () => {
        axios.post('https://63b4129c9f50390584a5def3.mockapi.io/user/products', {
            "category": newCat,
            "description": newDesc,
            "title": newTitle,
            "price": newPrice,
            "image": newImage,
            "count": 1
        })
        alert('New Product Has Been Added')
        const getData = async () => {
            const resp = await axios.get('https://63b4129c9f50390584a5def3.mockapi.io/user/products')
            setProdsFromApp(resp.data)
            setProductsAdmin(resp.data)

        }
        getData()

    }


    const deleteHandler=(id)=>{
axios.delete(`https://63b4129c9f50390584a5def3.mockapi.io/user/products/${id}`)
alert('Product has been deleted')
        const getData = async () => {
            const resp = await axios.get('https://63b4129c9f50390584a5def3.mockapi.io/user/products')
            setProdsFromApp(resp.data)
            setProductsAdmin(resp.data)

        }
        getData()


    }












    return (
        <div>
            {logAdmin ? <div>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" >
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input onChange={LoginHandler} type="text" id="typeEmailX" className="form-control form-control-lg" />
                                                <label className="form-label" >Username</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input onChange={PasswordHandler} type="password" id="typePasswordX" className="form-control form-control-lg" />
                                                <label className="form-label" >Password</label>
                                            </div>



                                            <button onClick={accessHandler} className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>



                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div> :
                <div>

                    <div className="addproddiv">
                        <h4>Add New Products</h4>
                        <input onChange={addCatHandler} className='addprodinput' type="text" placeholder='Category' />
                        <input onChange={addDescHandler} className='addprodinput' type="text" placeholder='Description' />
                        <input onChange={addTitleHandler} className='addprodinput' type="text" placeholder='Title' />
                        <input onChange={addPriceHandler} className='addprodinput' type="text" placeholder='Price' />
                        <input onChange={addImageHandler} className='addprodinput' type="text" placeholder='Image' />
                        <button onClick={addNewProdHandler} className='addtocard'>Add New Product</button>
                    </div>
                    <div className="adminprodlist">
                        <h4>Delete Products</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsAdmin.map(x => {
                                    return (<tr key={x.id}>
                                        <th scope="row">{x.id}</th>
                                        <td className="basketimgtd "><img src={x.image} alt="" /></td>
                                        <td>{x.title}</td>
                                        <td>{x.price} AZN</td>
                                        <td><button onClick={()=>deleteHandler(x.id)} className='btn btn-danger'>Delete</button></td>
                                    </tr>)



                                })}

                            </tbody>
                        </table>







                    </div>

                </div>}





        </div>
    )
}

export default Admin