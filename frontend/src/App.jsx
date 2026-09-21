import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(1);

    const [limit] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [totalProducts, setTotalProducts] = useState(0);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [sortBy, setSortBy] = useState("createdAt");

    const [order, setOrder] = useState("desc");


    // Fetch products
    const getProducts = async () => {

        try {

            const response = await axios.get(
                "https://pagination-backend-u925.onrender.com/api/products",
                {
                    params: {
                        page,
                        limit,
                        search,
                        category,
                        sortBy,
                        order
                    }
                }
            );


            setProducts(response.data.products);

            setTotalPages(
                response.data.pagination.totalPages
            );

            setTotalProducts(
                response.data.pagination.totalProducts
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getProducts();

    }, [page, search, category, sortBy, order]);


    // Search
    const handleSearch = (e) => {

        setSearch(e.target.value);

        // Go back to first page
        setPage(1);

    };


    // Category
    const handleCategory = (e) => {

        setCategory(e.target.value);

        setPage(1);

    };


    // Previous page
    const previousPage = () => {

        if (page > 1) {

            setPage(page - 1);

        }

    };


    // Next page
    const nextPage = () => {

        if (page < totalPages) {

            setPage(page + 1);

        }

    };


    return (

        <div>

            <h1>Product List</h1>


            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={handleSearch}
            />


            {/* CATEGORY */}

            <select
                value={category}
                onChange={handleCategory}
            >

                <option value="">
                    All Categories
                </option>

                <option value="Electronics">
                    Electronics
                </option>

                <option value="Clothing">
                    Clothing
                </option>

                <option value="Accessories">
                    Accessories
                </option>

            </select>


            {/* SORT */}

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >

                <option value="createdAt">
                    Latest
                </option>

                <option value="price">
                    Price
                </option>

                <option value="name">
                    Name
                </option>

            </select>


            <br />
            <br />


           
	 {/* ORDER */}

            <button
                onClick={() => {

                    setOrder(
                        order === "asc"
                            ? "desc"
                            : "asc"
                    );

                    setPage(1);

                }}
            >

                Sort: {order}

            </button>


            <h3>
                Total Products: {totalProducts}
            </h3>


            {/* PRODUCTS */}

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Price</th>

                        <th>Category</th>

                        <th>Stock</th>

                    </tr>

                </thead>


                <tbody>

                    {products.map((product) => (

                        <tr key={product._id}>

                            <td>
                                {product.name}
                            </td>

                            <td>
                                ₹{product.price}
                            </td>

                            <td>
                                {product.category}
                            </td>

                            <td>
                                {product.stock}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>


            <br />


            {/* PAGINATION */}

            <div>

                <button
                    onClick={previousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>

                {Array.from(
                    { length: totalPages },
                    (_,index) => index + 1
                ).map((pageNumber) => (

                    <button
                        key={pageNumber}
                        onClick={() =>
                            setPage(pageNumber)
                        }
                        style={{
                            margin: "0 5px",

                            fontWeight:
                                page === pageNumber
                                    ? "bold"
                                    : "normal",
                            color: page === pageNumber
                                    ? "white"
                                    : "black",
                            backgroundColor: page === pageNumber
                                    ? "red"
                                    : "gray"
                        }}
                    >

                        {pageNumber}

                    </button>

                ))}


                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>

            </div>


            <p>

                Page {page} of {totalPages}

            </p>

        </div>

    );

}

export default App;