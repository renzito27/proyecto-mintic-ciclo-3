import React, { useState } from 'react'
import apiBaseUrl from '../shared/utils/Api';

const AddProductPage = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const addProduct = async () => {
        const productData = {
            name: productName,
            price: price,
            stock: stock,
            description: description
        }
        const response = await fetch(`${apiBaseUrl}/add-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }
    return (
        <div className="container">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre producto</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setProductName(e.target.value)} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Cantidad</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setStock(e.target.value)} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Descripción</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="button" onClick={addProduct} class="btn btn-primary">Agregar producto</button>
            </form>
        </div>
    )
}

export default AddProductPage