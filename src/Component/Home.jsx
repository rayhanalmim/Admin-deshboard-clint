import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
    const loadedProducts = useLoaderData();
    const [products, setProducts] = useState(loadedProducts);
    console.log(loadedProducts);

    const handleRemove = (id) => {
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://admit-dashboard-server-kjp82kj0d-rayhan-al-mims-projects.vercel.app/product/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (result.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = products.filter(product => product._id !== id);
                            setProducts(remaining);
                        }
                    })
            }
        })

    }

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.productName}
                            </th>
                            <td className="px-6 py-4">
                                {product.company}
                            </td>
                            <td className="px-6 py-4">
                                {product.category}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="pl-6 pr-2 py-4">
                                <Link to={`/update/${product._id}`} className="font-medium pr-3 text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <a onClick={() => handleRemove(product._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

    );
};

export default Home;