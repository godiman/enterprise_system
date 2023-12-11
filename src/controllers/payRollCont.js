const PayRoll = require('../models/payRoll');

module.exports = {
    payRoll: async (req, res) => {
        const { workerSalery, workerAllowance } = req.body;

        try {
            // Contruct Regex
            const salaryPattern = /^[0-9\s\D]+$/;

            // Validate the fileds
            if (!salaryPattern.test(workerSalery)) {
                throw Error('Invalid Salary Format');
            }

            // Create payRoll
            const payRollCreated = await PayRoll.create({ workerSalery, workerAllowance })

            return res.status(200).json({
                success: true,
                msg: 'PayRoll Created Successfully',
                redirectURL: '/admin/view-payRoll'
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
}