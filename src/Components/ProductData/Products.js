import rawData from "./rowData"
import '../Styles/products.css'
import React, {useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Products() {





    // const history = useHistory();
    // const [password, passwordSet] = useState("")
    // const [email, emailSet] = useState("");
    // const [loading, setLoading] = useState(false);
    // const { login, user } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState([])
    const [counter, setCounter] = useState(0)



    const [cart,setCart]=useState([])


    // const getApiData = useAllProductsData();

    // let ans = getApiData()

    // let xans={}
    // xans = featureSelectors.useAllProducts()

    // console.log("anssss",xans)
    let imgUrl = []

    const showProducts = () => {
     

        let obj = rawData();



        // console.log("ans", ans)


        const handleClick1 = () => {
            setCounter(counter + 1)
        }

        const handleClick2 = () => {
            setCounter(counter - 1)
        }


        //----------------------new code
        let arrr = []
        let keysArr = Object.keys(obj)

        console.log("keys Arr", keysArr)

        keysArr.forEach((item) => {

            console.log("item", item)

            let arr = obj[item]

            arr.forEach((data) => {
                console.log("products", data)
                arrr.push(data);
            })
        })

        console.log("data", arrr)

        let xrr = []
        arrr.forEach((x) => (
            console.log("final data", x.id)
        ))

        setImageUrl(arrr)

        console.log("data", (imgUrl))

    }

    function addToCart() {

        
        setCounter(counter + 1)
    }

    const minusQuantity = (cart_id) => {
        setCounter(counter - 1)

        // setCart(cart=>{
        //     cart.map((item)=>{
        //         cart_id===item.id?{...item}:
        //     )
        // })
    }

    const addQuantity = () => {
        setCounter(counter + 1)
    }

    return (
        <div className="mainContainer">
            <div className='h1Box'>
                <h1 className='h1' onClick={() => showProducts()}>show products</h1>
            </div>



            <div className="productsContainer">

                {imageUrl && imageUrl.map((p, index) => (
                    <div className="imgContainer">
                        <img src={p.image} key={index} alt="img" />
                        <p className="productName">{p.name}</p>

                        <div className="pricePrdctNameContainer">
                            <spa>price</spa>
                            <p className="productName">{p.price}</p>
                        </div>
                        {counter <= 0 && <button className="addBtn" type="submit" keys={index} onClick={() => addToCart(index)}>Add to cart</button>}

                        {counter > 0 && <div className="quantityChangeContainer">

                            <div className="quantityChangeContainerButton" >
                                <span onClick={() => minusQuantity()}>-</span>
                                <p>{counter}</p>
                                <span onClick={() => addQuantity()}>+</span>
                            </div>
                        </div>
                        }
                    </div>
                ))
                }

            </div>

        </div>

    )
}

export default Products;


