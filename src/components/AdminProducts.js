import React from "react";
import "./Admin.css";
import "./Shop.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
import AdminEdit from "./AdminEdit"

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
                    (resetIngredients) => (
                        <AdminEdit
                            key={resetIngredients.id}
                            resetIngredients={resetIngredients}
                        />
                    )
                )}
            </div>

        </>
    );
};

export default AdminProducts;