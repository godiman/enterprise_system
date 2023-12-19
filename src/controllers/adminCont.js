const Admin = require('../models/admin');
const Department = require('../models/department');
const Staff = require('../models/staff');
const Position = require('../models/position');
const Stock = require('../models/stock');
const Payroll = require('../models/payRoll'); 
const Package = require('../models/package');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');     

module.exports = {    

    home: async (req, res)  =>{
        const context = {}

        try {
            const allStock = await Stock.countDocuments()
            context['stocks'] = allStock

            const allStaffs = await Staff.countDocuments()
            context['staffs'] = allStaffs

            const allAdmin = await Admin.countDocuments()
            context['admins'] = allAdmin

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin
            return res.render('./adminViews/home', { context });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
       
    }, 

    getDepartments: async(req, res) => {
        const context = {}
        try {
            const allDepartments = await Department.find();
            context['departments'] = allDepartments

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin

            res.render('./adminViews/departments', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }     
    },

    departmentReg: async (req, res) => {
        const {departName} = req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z\s]+$/;

            // Validate the fileds
            if (!namePattern.test(departName)) {
                throw Error('Department name should only contain letters and space!');
            }
            

            // Create Department
            const admin = await Department.create({admin: req.admin,departName })

            return res.status(200).json({ 
                success: true,
                msg: 'Department Added Successfully',
              });
            
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    get_EditDepartments: async(req, res) => {   
        const context = {}
        try {
            const _departmentById = await Department.findOne({_id: req.query.department_id});
            context['department'] = _departmentById

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin

            return res.render('./adminViews/edit-department', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },

    editDepartment: async (req, res) => { 
        const { departName, department_id } = req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z\s]+$/;

            // Validate the fileds
            if (!namePattern.test(departName)) {  
                throw Error('Department name should only contain letters and space!'); 
            }

            // Create Department 
            const editedDepartment = await Department.findOneAndUpdate({_id: department_id}, {departName});

            console.log(editedDepartment); 

            return res.status(200).json({
                success: true,
                msg: 'Department Update Success',
            });
        }   catch (error) {
            console.log(error);          
            res.status(500).json({ error: error.message });
        }
    },

    delete_department: async (req, res) => {
        const { department_id } = req.body 
        try {
            if (!department_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deleteDepartment = await Department.findOneAndDelete({_id: department_id });
            console.log(_deleteDepartment); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Department Deleted Successfully',
                    redirectURL: '/admin/departments'
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },

    getStaffs: async (req, res) => {
        const context = {}
        try {
            const allStaffs = await Staff.find();
            context['staffs'] = allStaffs

            const allDepartments = await Department.find();
            context['departments'] = allDepartments

            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });       
            context['admin'] = admin

            res.render('./adminViews/staff.ejs', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
      
    },

    get_staffDetails: async(req, res) => {
        const context = {}
        try {

            const admin = await Admin.findOne({ _id: req.admin });           
            context['admin'] = admin
            
            const _staffById = await Staff.findOne({_id: req.query.staff_id});
            context['staff'] = _staffById

            const allDepartments = await Department.find();
            context['departments'] = allDepartments 

            const allPosition = await Position.find();
            context['positions'] = allPosition
        
            return res.render('./adminViews/staffDetails', {context});                 
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },

    staffRegistration: async (req, res) => {
        const {
            fName, email, address, dateOfBirth, gender, position, department, staffType, image, contractEndDate, amount
        }= req.body;
        console.log(req.files);

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
                throw Error('Please address must not be empty');
            }
            if (!/[0-9\s\W]/.test(dateOfBirth)) {
                throw Error('Date of Birth is not Correctly filled');
            }
            if (!/[a-zA-Z\s\d]/.test(gender)) {
                throw Error('Gender Is not correctly filled');
            }
            if (!/[a-zA-Z0-9\s\d]/.test(position)) {
                throw Error('Position is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(department)) {
                throw Error('Department  is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(staffType )) {
                throw Error('Staff Type is not Correctly Filled');
            }
            if (!/[0-9\s\W]/.test(contractEndDate)) {
                throw Error('Contarct Date Ending is not Correctly Filled');
            }
            if (!/[a-zA-Z0-9\s\W]/.test(amount)) {  
                throw Error('Add salary');
            }
            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError);
            }

            const image = req.file.filename;
  

            // Create Staff
            const staffCreated = await Staff.create({ 
                fName, email, address, dateOfBirth, gender, position, department, staffType, image, contractEndDate, amount
            })
            console.log(staffCreated);

            return res.status(200).json({
                success: true,
                msg: 'Staff Added Successfully',
                redirectURL: '/admin/staffs' 
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    delete_staff: async (req, res) => {
        const { staff_id } = req.body    
        try {
            if (!staff_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deleteStaff = await Staff.findOneAndDelete({_id: staff_id });
            console.log(_deleteStaff); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Staff Deleted Successfully',
                    redirectURL: '/admin/staffs'
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },

    updateStaffProfile: async (req, res) =>{
        const {
             position, department, staffType, staff_id, contractEndDate, image, amount
        }= req.body;
        console.log(req.body);            

        try {
            const dobPattern = /^[0-9\s\W]+$/;

            if (!/[a-zA-Z0-9\s\d]/.test(position)) {
                throw Error('Position is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(department)) {
                throw Error('Department is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(staffType )) {
                throw Error('Staff Type of Birth is not Correctly Filled');
            }
            if (!dobPattern.test(contractEndDate)) {        
                throw Error('Contarct Date Ending is not Correctly Filled');
            }
            if (!/[a-zA-Z0-9\s\W]/.test(amount)) {  
                throw Error('Add salary');
            }
            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError);  
            }  


            //  ========== Insert the user to the bd======
            const _updateProfile = await Staff.findOneAndUpdate({_id: staff_id},{position, department, staffType, contractEndDate, image, amount});
            console.log(_updateProfile);

          return res.status(200).json({ 
            success: true,
            msg: 'Staff profile updated successfully',  
            redirectURL: '/admin/staffs'
          });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        } 
    },
    
    getPositions: async (req, res) => {
        const context = {}
        try {
            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });        
            context['admin'] = admin

            res.render('./adminViews/position', {context})  
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
    },

    registerPositions: async (req, res) => {
        const { name } = req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z0-9\s]+$/;

            // Validate the fileds
            if (!namePattern.test(name)) {
                throw Error('Position name should only contain letters and space!');
            }

            // Create Department
            const positionCreated = await Position.create({name })

            return res.status(200).json({
                success: true,
                msg: 'Position Added Successfully',
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message }); 
        }
    },

    get_EditPosition: async(req, res) => {
        const context = {}
        try {
            const _positionById = await Position.findOne({_id: req.query.position_id});
            context['position'] = _positionById

            const admin = await Admin.findOne({ _id: req.admin });        
            context['admin'] = admin

            return res.render('./adminViews/edit-position', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },  

    editPosition: async (req, res) => { 
        const { name, position_id } = req.body;

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z0-9\s]+$/;

            // Validate the fileds
            if (!namePattern.test(name)) {  
                throw Error('Position name should only contain letters, number and space!'); 
            }

            // Create Department 
            const editedPosition = await Position.findOneAndUpdate({_id: position_id}, {name});

            console.log(editedPosition); 

            return res.status(200).json({
                success: true,
                msg: 'Position Update Success',
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    
    delete_position: async (req, res) => {
        const { position_id } = req.body 
        try {
            if (!position_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deletePosition = await Position.findOneAndDelete({_id: position_id });
            console.log(_deletePosition); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Position Deleted Successfully',
                    redirectURL: '/admin/positions'
                })
        } catch (error) { 
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },     

    getStocks: async (req, res) =>{     
        const context = {}
        try {
            const allStocks = await Stock.find();   
            context['stocks'] = allStocks

            const allPackages = await Package.find();
            context['packages'] = allPackages

            const admin = await Admin.findOne({ _id: req.admin });        
            context['admin'] = admin

            res.render('./adminViews/stocks', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
    }, 

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
            if (!namePattern.test(category)) {
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
            const stockAdded = await Stock.create({
                brand, 
                category, 
                pakagingType, 
                wholePrice, 
                unitPrice, 
                wholeQty, 
                unitQty, 
                totalQtyInPackType 
            })
            console.log(stockAdded);
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

    get_EditStock: async(req, res) => {   
        const context = {}
        try {
            const _stocktById = await Stock.findOne({_id: req.query.stock_id});
            context['stock'] = _stocktById

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin

            return res.render('./adminViews/edit-stock', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },
              
    editStock: async (req, res) => {
        const { 
            brand, category, pakagingType, stock_id, wholePrice, unitPrice, wholeQty, unitQty, totalQtyInPackType
        } = req.body;
        console.log(req.body);

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
            const editStock = await Stock.findOneAndUpdate({_id: stock_id},{ brand, category, pakagingType, wholePrice, unitPrice, wholeQty, unitQty, stock_id, totalQtyInPackType })
            console.log(editStock);         
            return res.status(200).json({
                success: true,
                msg: 'Stock Updated Successfully',
                redirectURL: '/admin/view-stocks'
            });

        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    delete_stock: async (req, res) => {
        const { stock_id } = req.body 
        try {
            if (!stock_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deleteStock = await Stock.findOneAndDelete({_id: stock_id });
            console.log(_deleteStock); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Stock Deleted Successfully',
                    redirectURL: '/admin/stocks'
                })
        } catch (error) { 
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },

    processSale: async (req, res) => {
        const { stockIds, quantities } = req.body.data;
    
        try {
            // Find and update each stock item in the database
            const updatedStocks = await Promise.all(stockIds.map(async (stockId, index) => {
                const quantityToDeduct = quantities[index];
    
                // Find the stock item in the database
                const stock = await Stock.findById(stockId);
                console.log(stock);
    
                if (!stock) {
                    throw new Error(`Stock with ID ${stockId} not found.`);
                }
    
                // Check if unitQty is sufficient
                if (stock.unitQty < quantityToDeduct) {
                    throw new Error(`Insufficient quantity for stock with ID ${stockId}.`);
                }
    
                // Subtract quantityToDeduct from unitQty
                stock.unitQty -= quantityToDeduct;
    
                // Save the updated stock item
                await stock.save();
    
                return stock;
            }));
    
            return res.status(200).json({
                success: true,
                msg: 'Sale processed successfully',
                updatedStocks,
                redirectURL: '/admin/view-stocks'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },  
    

    getPackage: async (req, res) =>{
        const context = {}
        try {
            const allPackages = await Package.find();
            context['packages'] = allPackages

            const admin = await Admin.findOne({ _id: req.admin });        
            context['admin'] = admin

            res.render('./adminViews/package', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
        
    },

    addPackage: async (req, res) => {
        const {pakagingType} = req.body;
        console.log(req.body);

        try {
            // Contruct Regex
            const namePattern = /^[a-zA-Z\s]+$/;

            // Validate the fileds
            if (!namePattern.test(pakagingType)) {  
                throw Error('Package type name should only contain letters and space!');
            }

            // Create Department
            const packageAdded = await Package.create({ pakagingType })
            console.log(packageAdded);
            return res.status(200).json({
                success: true,
                msg: 'Package Added Successfully',      
            
            });

        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    get_EditPackage: async(req, res) => {   
        const context = {}
        try {
            const _packageById = await Package.findOne({_id: req.query.package_id});
            context['package'] = _packageById

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin

            return res.render('./adminViews/edit-package', {context});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },

    editPackage: async (req, res) => {
        const {pakagingType, package_id } = req.body;
        console.log(req.body);

        try {
            // Contruct Regex
           const namePattern = /^[a-zA-Z\s]+$/;

           // Validate the fileds
           if (!namePattern.test(pakagingType)) {  
               throw Error('Package type name should only contain letters and space!');
           }
           
            

            // Update package
            const editPackage = await Package.findOneAndUpdate({_id: package_id},{pakagingType})
            console.log(editPackage);
            return res.status(200).json({
                success: true,
                msg: 'Package Type Updated Successfully',       
            
            });

        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    delete_package: async (req, res) => {
        const { package_id } = req.body 
        try {
            if (!package_id == mongoose.Schema.ObjectId) {     
                throw Error('Invalid Data')
            }
            const _deletepackage = await Package.findOneAndDelete({_id: package_id });
            console.log(_deletepackage); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Stock Deleted Successfully',
                    redirectURL: '/admin/package'
                })
        } catch (error) { 
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },

    getPayroll: async (req, res) =>{
        
        const context = {}
        try {
            const allStaffs = await Staff.find();
            context['staffs'] = allStaffs

            const allDepartments = await Department.find();
            context['departments'] = allDepartments

            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });         
            context['admin'] = admin

            res.render('./adminViews/payroll.ejs', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
       
    },

    getPaySalary: async (req, res) =>{
        
        const context = {}
        try {
            const allStaffs = await Staff.findOne({_id: req.query.staff_id});
            context['staff'] = allStaffs

            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });         
            context['admin'] = admin

            res.render('./adminViews/pay-salary.ejs', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
       
    },

    createPayroll: async (req, res) => {
        try {
          const {
            name,
            position,
            amount,
            allowance,
            paystackEmail,
            paystackAmount,
            employeeName,
            salary
          } = req.body;
      
          // Create a new Payroll object
          const newPayroll = new Payroll({
            staff: req.user._id, // Assuming you have a user object in the request (e.g., after authentication)
            position,
            workerSalery: amount,
            workerAllowance: allowance,
            // Add other fields as needed
          });
          console.log(newPayroll);
      
          // Save the Payroll object to the database
          const savedPayroll = await newPayroll.save();
      
          // You can perform additional actions or send a response as needed
          res.status(201).json({
            success: true,
            message: 'Payroll created successfully',
            data: savedPayroll,
          });
        } catch (error) {
          console.error('Error creating payroll:', error);
          res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      },
    
    get_creatNewAdmin: async (req, res) => {
        const context = {}
        try {

            const allDepartments = await Department.find();    
            context['departments'] = allDepartments

            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });       
            context['admin'] = admin

            res.render('./adminViews/create-admin.ejs', {context})
        } catch (error) {
            return res.status(500).json({error: error.message}) 
        }
      
    },
   
    creatNewAdmin: async (req, res) => {
        const {
            userName, email, address, dateOfBirth, gender, position, department, staffType, image, contractEndDate, amount, password
        } = req.body;
                   

        try {
            const namePattern = /^[a-zA-Z\s]+$/;
            const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
            const addressPattern = /^[a-zA-Z\s\.\-\S]+$/;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

            if (!namePattern.test(userName)) {
                throw Error('Name should only contain letters and space!');
            }
            if (!emailPattern.test(email)) {
                throw Error('Enter a valid email address'); 
            }
            if (!addressPattern.test(address)) {
                throw Error('Please address must not be empty');
            }
            if (!/[0-9\s\W]/.test(dateOfBirth)) {
                throw Error('Date of Birth is not Correctly filled');
            }
            if (!/[a-zA-Z\s\d]/.test(gender)) {
                throw Error('Gender Is not correctly filled');
            }
            if (!/[a-zA-Z0-9\s\d]/.test(position)) {
                throw Error('Position is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(department)) {
                throw Error('Department  is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(staffType )) {
                throw Error('Staff Type is not Correctly Filled');
            }
            if (!/[0-9\s\W]/.test(contractEndDate)) {
                throw Error('Contarct Date Ending is not Correctly Filled');
            }
            if (!/[a-zA-Z0-9\s\W]/.test(amount)) {  
                throw Error('Add salary');
            }
            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError);
            }
            if (!passwordPattern.test(password)) {
                throw Error('Password should carry at least one lowercase, uppercase, special charater, and number');
            }

            const image = req.file.filename;


            //  ========== Insert the user to the bd======
            const _createAdmin = await Admin.create({userName, email, address, dateOfBirth, gender, position, department, staffType, image, contractEndDate, amount, password })

            return res.status(200).json({
                success: true, 
                msg: 'Admin Created Successfully', 
                redirectURL: '/admin/registered-admin' 
            });
        }   catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    get_registeredAdmin: async (req, res)  =>{
        const context = {}

        try {

            const allAdmin = await Admin.find();
            console.log(allAdmin); 
            context['admins'] = allAdmin

            const allDepartments = await Department.find();
            context['departments'] = allDepartments

            const allPosition = await Position.find();
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin })         
            context['admin'] = admin
            return res.render('./adminViews/registered-admin', { context });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
       
    },
    
    get_adminDetails: async(req, res) => {
        const context = {}
        try {
            
            const _adminById = await Admin.findOne({_id: req.query.admin_id});
            context['admins'] = _adminById

            const allDepartments = await Department.find();
            context['departments'] = allDepartments

            const allPosition = await Position.find();    
            context['positions'] = allPosition

            const admin = await Admin.findOne({ _id: req.admin });           
            context['admin'] = admin
        
            return res.render('./adminViews/adminDetails', {context});                 
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
        
    },

    delete_admin: async (req, res) => {
        const { admin_id } = req.body    
        try {
            if (!admin_id == mongoose.Schema.ObjectId) {
                throw Error('Invalid Data')
            }
            const _deleteAdmin = await Admin.findOneAndDelete({_id: admin_id });
            console.log(_deleteAdmin); 
            return res.status(200).json( 
                {
                    success: true,
                    msg: 'Admin Deleted Successfully',
                    redirectURL: '/admin/registered-admin'
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message }) 
        }
    },    

    getProfile: async (req, res) =>{
        const context = {}

        try {
            const admin = await Admin.findOne({ _id: req.admin })
            // console.log(admin);           
            context['admin'] = admin
            return res.render('./adminViews/profile', { context });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    },   

    updateProfile: async (req, res) =>{
        
        const { userName, email,  address, dateOfBirth, gender, position, department, staffType, contractEndDate, amount, image } = req.body;
        console.log(req.body);          

        try {
            const namePattern = /^[a-zA-Z\s]+$/;
            const emailPattern = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
            const addressPattern = /^[a-zA-Z\s\.\-\S]+$/;

            if (!namePattern.test(userName)) {
                throw Error('Name should only contain letters and space!');
            }
            if (!emailPattern.test(email)) {
                throw Error('Enter a valid email address'); 
            }
            if (!addressPattern.test(address)) {
                throw Error('Please address must not be empty');
            }
            if (!/[0-9\s\W]/.test(dateOfBirth)) {
                throw Error('Date of Birth is not Correctly filled');
            }
            if (!/[a-zA-Z\s\d]/.test(gender)) {
                throw Error('Gender Is not correctly filled');
            }
            if (!/[a-zA-Z0-9\s\d]/.test(position)) {
                throw Error('Position is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(department)) {
                throw Error('Department  is not Correctly Filled');
            }
            if (!/[a-zA-Z\s\d]/.test(staffType )) {
                throw Error('Staff Type is not Correctly Filled');
            }
            if (!/[0-9\s\W]/.test(contractEndDate)) {
                throw Error('Contarct Date Ending is not Correctly Filled');
            }
            if (!/[a-zA-Z0-9\s\W]/.test(amount)) {  
                throw Error('Add salary');
            }
            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError);
            }
           

            // const image = req.file.filename;
           
            //  ========== Insert the user to the bd======
            const _updateProfile = await Admin.findOneAndUpdate({_id: req.admin},{userName, email,  address, dateOfBirth, gender, position, department, staffType, image, contractEndDate, amount, image});
            console.log(_updateProfile);
          return res.status(200).json({ 
            success: true,
            msg: 'Profile Updated successfully',   
          });
        }   catch (error) {
            console.log(error);   
            res.status(500).json({ error: error.message });
        } 
    },

    change_password: async (req, res) => {
        const { old_password, newPassword } = req.body;

        try {
            const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

            if (!pwdReg.test(newPassword)) {
                throw new Error('Password must contain uppercase, lowercasre and digit');
           }

            const admin = await Admin.findOne({_id: req.admin})

            if (admin) {
                const auth = await bcrypt.compare(old_password, admin.password)
                if (auth) {
                    const salt = await bcrypt.genSalt();

                    const _newPassword = await bcrypt.hash(newPassword, salt);

                    const chngedPassword = await Admin.findOneAndUpdate({ _id: req.admin }, { password: _newPassword })

                    return res.status(200).json({ success: true, msg: 'Password Changed Successfully', redirectURL: 'admin/profile' })
                }
                throw Error('Incorrect Password')   
            } else {
                throw Error('Admin Not Found')
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    getRegistration: async (req, res) =>{
        res.render('./adminViews/register')   
    },

    getLogin: async (req, res) => {
        res.render('./adminViews/login.ejs')
    },
}