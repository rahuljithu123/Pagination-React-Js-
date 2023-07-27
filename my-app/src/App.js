import {useState,useEffect} from "react"
import './App.css';

function App() {
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
  const fetchProducts= async()=>{
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page*10-10}`
    );
    const data= await res.json();
    if(data && data.products){
      setProducts(data.products)
      setTotalPages(data.total/10)
    }
  };

  console.log(products)

  useEffect(()=>{
    fetchProducts();
  },[page])

  const selectPageHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=totalPages
      // products.length/10
       && selectedPage!==page)
    setPage(selectedPage)
  }



  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {     // slice(page * 10 - 10, page * 10);
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page>1 ? "" : "pagination__disable"}
          >
            ◀️
          </span>
          {[...Array(totalPages
            // products.length / 10
            )].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages
                   // products.length / 10
               ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
