
const Stock = require('../models/stock');
const Package = require('../models/package');

module.exports = {
    index : async (req, res) => {

        const context = {}
        try {
            const allStocks = await Stock.find();    
            context['stocks'] = allStocks

            const allPackages = await Package.find();
            context['packages'] = allPackages

            res.render('./sale', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
        
    }
}