const staff_Form = document.getElementById('staff_Form')
staff_Form.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const fName = staff_Form.fName.value;   
    const email = staff_Form.email.value; 
    const address = staff_Form.address.value; 
    const dateOfBirth = staff_Form.dateOfBirth.value;
    const gender = staff_Form.gender.value;
    const position = staff_Form.position.value; 
    const department = staff_Form.department.value;    
    const staffType = staff_Form.staffType.value;
    const contractEndDate = staff_Form.contractEndDate.value;
    const amount = staff_Form.amount.value;
    const image = staff_Form.image;    
      
     
    const nameErr = document.querySelector('.nameErr');
    const emailErr = document.querySelector('.emailErr');
    const addressErr = document.querySelector('.addressErr');
    const dobErr = document.querySelector('.dobErr');
    const genderErr = document.querySelector('.genderErr');
    const positionErr = document.querySelector('.positionErr');
    const departErr = document.querySelector('.departErr');
    const staffErr = document.querySelector('.staffErr');
    const contractErr = document.querySelector('.contractErr');
    const amtErr = document.querySelector('.amtErr');
   
    nameErr.innerHTML = '';
    emailErr.innerHTML = '';
    addressErr.innerHTML = '';
    dobErr.innerHTML = '';
    genderErr.innerHTML = '';
    positionErr.innerHTML = '';
    departErr.innerHTML = '';
    staffErr.innerHTML = '';
    contractErr.innerHTML = '';
    amtErr.innerHTML = '';
   


    const namePattern = /^[a-zA-Z\s]+$/;
    const departmentPattern = /^[a-zA-Z\s]+$/;
    const positionPattern = /^[a-zA-Z0-9\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const addressPattern = /^[a-zA-Z0-9\s]+$/;
    const dobPattern = /^[0-9\s\W]+$/; 
    const amtPattern = /^[0-9\s\W]+$/;


    

    if (!namePattern.test(fName)) {  
        nameErr.innerHTML = 'Enter full name'
        throw('Terminating')
    }
    if (!emailPattern.test(email)) {
        emailErr.innerHTML = 'Enter a valid email address'
        throw('Terminating')
    }
    if (!addressPattern.test(address)) {
        addressErr.innerHTML = 'Enter a valid address'
        throw('Terminating')
    }
    if (!dobPattern.test(dateOfBirth)) {
        dobErr.innerHTML = 'DOB must not be empty'
        throw('Terminating')
    }
    if (!namePattern.test(gender)) {
        genderErr.innerHTML = 'Select the gender'
        throw('Terminating')
    } 
    if (!positionPattern.test(position)) {
        positionErr.innerHTML = 'Empty position'
        throw('Terminating')
    }
    if (!departmentPattern.test(department)) {
        departErr.innerHTML = 'Empty department'    
        throw('Terminating')
    }
    if (!namePattern.test(staffType)) {
        staffErr.innerHTML = 'Enter staff type'
        throw('Terminating')
    }
    if (!dobPattern.test(contractEndDate)) {
        contractErr.innerHTML = 'Fill when the contract will end'
        throw('Terminating')
    }
    if (!amtPattern.test(amount)) {
        amtErr.innerHTML = 'Fill when the contract will end'
        throw('Terminating')
    }
    if (image == '') {
        namePattern.innerHTML = 'Please Select Image';
        throw Error('Terminating')
    }
    const formData = new FormData();

    formData.append('fName', fName);  
    formData.append('email', email);
    formData.append('address', address);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('gender', gender);
    formData.append('position', position);  
    formData.append('department', department);
    formData.append('staffType', staffType);
    formData.append('contractEndDate', contractEndDate);
    formData.append('amount', amount);
    formData.append('image', image.files[0]);

    

    fetch('/admin/register-staffs', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json'
        },
        body: formData
    })

    .then(res => res.json())
         .then(data => {
             if (data.success) {
                 $(document).ready(() => {
                     $('.toast-body').html(data.msg);
                     $('.toast').css('background-color', 'green');
                     $('.toast').toast('show');
                 });  
     
                 setInterval(() => {
                     window.location.href = "/admin/staffs";
                 }, 2000);
             }
             if (data.error) {
                 // Invoke the toast component
                 $(document).ready(() => {
                     $('.toast-body').html(data.error);
                     $('.toast').css('background-color', 'red');
                     $('.toast').css('color', 'red');
                     $('.toast').toast('show');
                 })
             }
         })
         .catch(error => {
             console.log(error);
         })       
    
})