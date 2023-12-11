const express = require('express');
const adminCont = require('../controllers/adminCont');
const {auth} = require('../middlewares/authMiddlewares');
const {imgHandler} = require('../helpers/imgHandler')

const router = express.Router();   

router.get('/home', auth, adminCont.home);     
router.get('/departments', auth, adminCont.getDepartments);
router.get('/edit-department', auth, adminCont.get_EditDepartments);                 
router.get('/staffs', auth, adminCont.getStaffs);
router.get('/staff-details', auth, adminCont.get_staffDetails);
router.post('/register-staffs', auth, imgHandler, adminCont.staffRegistration);
router.post('/delete-staffs', auth, adminCont.delete_staff);
router.post('/update-staffs', auth, imgHandler, adminCont.updateStaffProfile);
router.get('/positions', auth, adminCont.getPositions);             
router.post('/register-departments', auth, adminCont.departmentReg);   
router.post('/edit-department', auth, adminCont.editDepartment);          
router.post('/delete-department', auth, adminCont.delete_department);
router.post('/register-position', auth, adminCont.registerPositions);
router.get('/edit-position', auth, adminCont.get_EditPosition); 
router.post('/edit-position', auth, adminCont.editPosition);   
router.post('/delete-position', auth, adminCont.delete_position);
router.get('/stocks', auth, adminCont.getStocks);
router.post('/register-stock', auth, adminCont.registerStock);   
router.post('/delete-stock', auth, adminCont.delete_stock);
router.get('/edit-stock', auth, adminCont.get_EditStock);
router.post('/edit-stock', auth, adminCont.editStock);   
router.get('/sales', auth, adminCont.getSales); 
router.post('/add-sale', auth, adminCont.addSales); 
router.get('/payroll', auth, adminCont.getPayroll);
router.get('/create-admin', auth, adminCont.get_creatNewAdmin);
router.post('/create-admin', auth, imgHandler, adminCont.creatNewAdmin);
router.get('/registered-admin', auth, adminCont.get_registeredAdmin);  
router.get('/admin-details', auth, adminCont.get_adminDetails);
router.post('/delete-admin', auth, adminCont.delete_admin);
router.get('/profile', auth, adminCont.getProfile);
router.post('/update-profile', auth, imgHandler, adminCont.updateProfile);
router.post('/change-password', auth, adminCont.change_password);
router.get('/register', adminCont.getRegistration);
router.get('/login', adminCont.getLogin);

module.exports = router;