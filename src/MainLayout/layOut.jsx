import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Component/Home";
import AddItem from "../Component/AddItem";
import UpdateProduct from "../Component/updateProduct";

const layOut = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children: [
            {
                path:'/',
                element:<Home></Home>,
                loader: () => fetch('http://localhost:3000/product'),
            },
            {
                path:'/add',
                element:<AddItem></AddItem>
            },
            {
                path:'/update/:id',
                element:<UpdateProduct></UpdateProduct>,
                loader: ({params}) => fetch(`http://localhost:3000/product/${params.id}`)
            }
        ]
    }
])

export default layOut;