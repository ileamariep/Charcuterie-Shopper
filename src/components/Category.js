import React, { useState } from "react";
import "./Category.css";

import { selectCategory } from "../api/ingredients";


const Category = ({ setIngredients, grabbedIngredients, reset }) => {


  const [category, setCategory] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (category === 'All') {
        reset()
      } else {
        await selectCategory(category);
      }



    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    setCategory(event.target.value);
  };


  return (

    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite flavor:
        <select value={category} onChange={handleChange}>
          <option value="All" selected>All</option>
          <option value="pets">Pets</option>
          <option value="general">General</option>
          <option value="beauty">Weightloss</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>

  );


};

export default Category;



