import React from "react";
import "./Admin.css";
import "./Shop.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

// import { getSomething } from "../api";

const AdminProducts = ({ grabbedIngredients,
    setIngredients,
    resetIngredients,
    setResetIngredients, }) => {


    return (
        <>
            <div>Add Product</div>
            <div id="product-container">
                {resetIngredients.map(
                    ({ id, name, description, price, category, img, imgAlt }) => (
                        <div key={id} className="product-card">
                            <div className="image-container">
                                {img ? (
                                    <img src={window.location.origin + img} alt={imgAlt} height="200" width="100" />
                                ) : (
                                    <img
                                        src="/images/default.png"
                                        alt="defualt"
                                        height="200"
                                        width="100"
                                    />
                                )}
                            </div>
                            <div className="product-info">
                                <div className="product-title">
                                    <h1 className="product-name">{name}</h1>
                                    <h2 className="product-category">{category}</h2>
                                </div>
                                <p className="product-description">{description}</p>
                                <div className="product-price">{price}</div>
                            </div>
                            <div className="admin-product-buttons">
                                <Button
                                    type="submit"
                                    className="view"
                                //   onClick={() => handleViewClick(id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="submit"
                                    className="view"
                                //   onClick={() => handleViewClick(id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </div>

        </>
    );
};

export default AdminProducts;