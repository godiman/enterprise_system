const Staff = require('../models/staff')
module.exports = {

    staffRegistration: async (req, res) => {
        const {
            fName, email, address, dateOfBirth, gender, position, department, staffType, qualification, contractEndDate
        }= req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z\s]+$/;
            const addressPattern = /^[a-zA-Z\s\.\-\S]+$/;
            const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

            // Validate the fileds
            if (!namePattern.test(fName)) {
                throw Error('Name should only contain letters and space!');
            }
            if (!emailPattern.test(email)) {
                throw Error('Enter a valid email address');
            }
            if (!addressPattern.test(address)) {
                throw Error('Please Fill This Form Correctly');
            }
            if (!/[0-9\s\W]/.test(dateOfBirth)) {
                throw Error('Date of Birth is not Correctly filled');
            }
            if (!/[a-zA-Z\s\d]/.test(gender)) {
                throw Error('Gender Is not correctly filled');
            }
            if (!/[a-zA-Z\s\d]/.test(position)) {
                throw Error('Position is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(department)) {
                throw Error('Department of Birth is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(staffType )) {
                throw Error('Staff Type of Birth is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(qualification)) {
                throw Error('Qualification is not Correctly Filled');
            }
            if (!/[0-9\s\W]/.test(contractEndDate)) {
                throw Error('Contarct Date Ending is not Correctly Filled');
            }

            // Create Staff
            const staffCreated = await Staff.create({ 
                fName, email, address, dateOfBirth, gender, position, department, staffType, qualification, contractEndDate
            })

            return res.status(200).json({
                success: true,
                msg: 'Staff Added Successfully',
                redirectURL: '/admin/view-staffs' 
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
}