const Stock = require('../models/stock')
module.exports = {

    registerStock: async (req, res) => {
        const { 
            brand, category, pakagingType, wholePrice, unitPrice, wholeQty, unitQty, totalQtyInPackType
        } = req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z\s]+$/;

            // Validate the fileds
            if (!namePattern.test(brand)) {
                throw Error('Brand name should only contain letters and space!');
            }
            if (!/^[a-zA-Z]+$/.test(category)) {
                throw Error('Category Filed is not correctly filled'); 
            }
            if (!/^[a-zA-Z0-9\s-,]+$/.test(pakagingType)) {
                throw Error('Invalid Packaging Type format');
            }
            if (!/^[a-zA-Z0-9\s.,']+$/.test(wholePrice)) {
                throw Error('Invalid Whole Price Format');
            }
            if (!/^[a-zA-Z0-9\s.,']+$/.test(unitPrice)) {
                throw Error('Invalid unit price Format');
            }
            if (!/^[a-zA-Z0-9\s.,]+$/.test(wholeQty)) {
                throw Error('Invalid whole Qty Format');
            }
            if (!/^[a-zA-Z0-9\s]+$/.test(unitQty)) {
                throw Error('Invalid unit Qty Format');
            }
            if (!/^[a-zA-Z0-9\s]+$/.test(totalQtyInPackType)) {
                throw Error('Invalid total Qty in packaging type Format');
            }

            // Create Department
            const stockAdded = await Stock.create({ brand, category, pakagingType, wholePrice, unitPrice, wholeQty, unitQty, totalQtyInPackType })

            return res.status(200).json({
                success: true,
                msg: 'Stock Added Successfully',
                redirectURL: '/admin/view-stocks'
            });

        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
}