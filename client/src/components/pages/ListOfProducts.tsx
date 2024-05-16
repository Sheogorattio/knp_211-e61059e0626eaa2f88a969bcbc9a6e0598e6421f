import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";
import IProduct from "../../models/IProduct";

function ListOfProducts() {
  const [data, setData] = useState<Array<IProduct>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_PATH_TO_SERVER + "products"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="row">
        {data.map((el: IProduct) => {
          return (
            <div className="col-md-3" key={el.id}>
              <Card props={el} />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ListOfProducts;
