// import "./App.css";
// import React, { useState, useEffect } from "react";
// import { Header, Shop } from "./components";
// import { allIngredients } from "./api";

// function App() {

//   const [grabbedIngredients, setIngredients] = useState([]);

//   const retrieveIngredients = () => {

//     allIngredients()
//       .then(ingredient => {
//         setIngredients(ingredient);
//       })
//       .catch(error => {
//         // something something errors
//       });
//   }

//   useEffect(() => {

//     retrieveIngredients()

//   }, []);



//   return (
//     <div className="App">
//       <Header />

//       <Shop
//         grabbedIngredients={grabbedIngredients}
//         setIngredients={setIngredients}
//         reset={retrieveIngredients}
//       />

//     </div>
//   );
// }

// export default App;