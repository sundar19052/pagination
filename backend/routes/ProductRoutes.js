const express = require("express");
const Product = require("../model/Product");

const router = express.Router();


router.get("/products", async (req, res) => {

    try {

        //query parameters

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search || "";

        const category = req.query.category || "";

        const sortBy = req.query.sortBy || "createdAt";

        const order = req.query.order || "desc";


        //Calculate skip

        const skip = (page - 1) * limit;


        //Create filter

        const filter = {};

        // Search by product name
        if (search) {

            filter.name = {
                $regex: search,
                $options: "i"
            };

        }

        // Filter by category
        if (category) {

            filter.category = category;
 
        }

        //Sorting

        const sort = {};

        sort[sortBy] = order === "desc" ? -1 : 1;


        //Count total products

        const totalProducts =
            await Product.countDocuments(filter);


        //Get paginated products

        const products = await Product
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);


        //Calculate total pages

        const totalPages =
            Math.ceil(totalProducts / limit);


        //Response

        res.status(200).json({

            success: true,

            pagination: {

                currentPage: page,

                limit: limit,

                totalProducts: totalProducts,

                totalPages: totalPages,

                hasNextPage: page < totalPages,

                hasPreviousPage: page > 1

            },

            products: products

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = router;