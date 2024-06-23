import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { add, remove } from "../Store/cartSlice.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const Product = () => {
    const CartProducts = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const isProductInCart = (productId) => {
        for (let x of CartProducts) {
            if (x.id === productId) {
                return true;
            }
        }
        return false;
    }

    console.log(CartProducts);

    const toggleCart = (product) => {
        if (isProductInCart(product.id)) {
            dispatch(remove(product.id))
        }
        else {
            dispatch(add(product))
        }
    }

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("/mocks/Data.json")
            .then((response) => response.json())
            .then((result) => setProducts(result.products))
            .catch((error) => console.log(error))
    }, [])

    const cards = products.map((product) => (
        <div className="card-container" key={product.id}>
            <div className="card-products">
                <Card style={{ padding: "5px" }} className="cards">
                    <Card.Img variant="top" src={product.images} />

                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            Price: <i className="fa fa-usd"></i> {product.price}
                        </Card.Text>

                        <Button
                            variant="primary"
                            className="add"
                            onClick={() => { toggleCart(product) }}
                        >
                            {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    ))

    return (
        <>
            <h1> Shopping Cart with React-Redux</h1>
            <div className="card-products">
                {cards}
            </div>
        </>
    )
}

export default Product