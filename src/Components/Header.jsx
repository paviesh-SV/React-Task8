
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

function Header() {
    const CartProducts = useSelector((state) => state.cart)

    return (
        <>
            <Navbar className="NavB fixed-header" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="text-white fw-b">
                        <h1>PSV Store</h1>
                    </Navbar.Brand>

                <Navbar.Toggle className="bg-light" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/" className="text-white opt">
                            Products
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link as={Link} to="/cart" className="text-white opt">
                            My Cart ({CartProducts.length})
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header