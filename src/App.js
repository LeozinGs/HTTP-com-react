import './App.css';
import { useState, useEffect } from 'react'

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // 1 - Resgatando produto da API

  //Usando useCallback para carregamento dinamico
  // const callDb = useCallback(() => {

  //   async function fetchData() {

  //     const res = await fetch(url)

  //     const data = await res.json()

  //     setProducts(data)
  //   }

  //   fetchData()

  // }, [])

  useEffect(() => {

    async function fetchData() {

      const res = await fetch(url)

      const data = await res.json()

      setProducts(data)
    }

    fetchData()

  }, [])



  // 2 - Adicionando Produtos

  const handleSubmit = async (e) => {

    e.preventDefault()

    const product = {
      name,
      price
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })

    // 3 - Carregamento dinâmico

    const addedProduct = await res.json()

    setProducts((prevProducts) => [...prevProducts, addedProduct])

    setName("")
    setPrice("")
  }



  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome do produto:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço do produto:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Adicionar" />
        </form>
      </div>
    </div>
  );
}

export default App;
