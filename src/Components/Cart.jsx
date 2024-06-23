import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../Store/cartSlice.jsx";

function Cart() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);

    const [productCount, setProductCount] = useState(
        products.reduce((counts, product) => {
            counts[product.id] = 1; // Default count for each product is 1
            return counts;
        }, {})
    )

    const increaseCount = (productId) => {
        setProductCount((prevCounts) => ({
            ...prevCounts,
            [productId]: prevCounts[productId] + 1,
        }))
    }

    const decreaseCount = (productId) => {
        if (productCount[productId] > 1) {
            setProductCount((prevCounts) => ({
                ...prevCounts,
                [productId]: prevCounts[productId] - 1,
            }))
        }
        else {
            removeProduct(productId)
        }
    }

    const removeProduct = (id) => {
        dispatch(remove(id));
        setProductCount((prevCounts) => {
            const newCounts = { ...prevCounts };
            delete newCounts[id];
            return newCounts;
        })
    }

    const calculateTotalPrice = () => {
        let total = 0;
        products.forEach((product) => {
            total += product.price * productCount[product.id];
        })

        return total
    }

    const cards = products.map((product) => (
        <div className="card-container-fluid" key={product.id}>
            <div className="card-products">
                <Card style={{ width: "18rem" }} className="cards">
                    <Card.Img
                        variant="top"
                        src={product.images}
                    />

                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            Current Price: <i className="fa fa-inr" /> {product.price}
                        </Card.Text>

                        <div className="InDe text-center">
                            <div className="price-total text-center">
                                <Card.Text className="card-text ">
                                    Total Price: <i className="fa fa-usd" /> {" "}
                                    {product.price * productCount[product.id] || product.price}
                                </Card.Text>
                            </div>

                            <div className="price-total">
                                <Button
                                    variant="dark"
                                    className="decrement"
                                    style={{ borderRadius: "10%" }}
                                    onClick={() => decreaseCount(product.id)}
                                >
                                    Decrease
                                </Button>

                                <Card.Text className="text">
                                   " {productCount[product.id] || 1} "
                                </Card.Text> 

                                <Button
                                    variant="dark"
                                    className="increment"
                                    style={{ borderRadius: "10%" }}
                                    onClick={() => increaseCount(product.id)}
                                >
                                    Increase
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="dark"
                            className="add mt-1"
                            onClick={() => removeProduct(product.id)}
                        >
                            Remove
                        </Button>

                    </Card.Body>
                </Card>
            </div>
        </div>
    ))

    return (
        <>
            <div className="text-dark">
                <span style={{ fontSize: 30 }}>My Cart</span> <br />
                <span style={{ fontSize: 30 }}>
                    Grand Total:<i class="fa fa-usd"></i> {calculateTotalPrice()}
                </span>

                {products.length === 0 && (
                    <div className="Noitems1">
                        <img src="/image/cart.png" alt="Cart Empty image" />
                        <p className="text-secondary fs-3 my-5">Shopping Cart is Empty</p>
                        <button className="btn1">
                            {" "}
                            <Link className="text-white" to="/">
                                Continue Shopping
                            </Link>
                        </button>

                        <button className="text-white my-4 btn1">
                            Checkout
                        </button>
                    </div>
                )}

                <div className="card-products mb-4">
                    {cards}
                </div>
                
            </div>
        </>
    )
}

export default Cart