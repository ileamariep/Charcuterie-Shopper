import axios from "axios";

export async function addOrder(total_price, status) {
    try {
        console.log(total_price, status)
        return await axios
          .post("/api/orders", {
            total_price,
            status,
          })
          .then(
            ({data}) => {
              return data;
            },
            (error) => {
              console.log(error);
            }
          );
      } catch (err) {
        console.error(err);
      }
}

export async function getSingleOrder(orderId) {
    try {
        const response = await fetch(`/api/orders/${orderId}/products`)

        const data = await response.json();


        return data

    } catch (error) {
        throw error;
    }
}