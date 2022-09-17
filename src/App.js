import './App.css';
import { useState, useEffect } from 'react'

// 4 - Custom hook
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([])

  const { data: items, httpConfig, loading, error } = useFetch(url)


  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  // 1 - Resgatando produto da API

  //Usando useCallback para carregamento dinamico que eu aprendi com a miz
  // const callDb = useCallback(() => {

  //   async function fetchData() {

  //     const res = await fetch(url)

  //     const data = await res.json()

  //     setProducts(data)
  //   }

  //   fetchData()

  // }, [])


  // useEffect da aula
  // useEffect(() => {

  //   async function fetchData() {

  //     const res = await fetch(url)

  //     const data = await res.json()

  //     setProducts(data)
  //   }

  //   fetchData()

  // }, [])



  // 2 - Adicionando Produtos

  const handleSubmit = async (e) => {

    e.preventDefault()

    const product = {
      name,
      price
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // })

    // 3 - Carregamento dinâmico

    // const addedProduct = await res.json()

    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // 5 - Refatorando post
    httpConfig(product, "POST")

    setName("")
    setPrice("")
  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(2)
  }


  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* 6 - Loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        <ul>
          {/* mudando o map de {products para um if que verifica se os items do custom hook contem realmente os items do db.json} */}
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - R$: {financial(product.price)}
            </li>
          ))}
        </ul>}
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
          {/* 7 - Loading no Post */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Adicionar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
