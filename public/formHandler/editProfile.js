const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get form inputs
    const userName = updateForm.userName.value; 
    const email = updateForm.email.value;
    const address = updateForm.address.value;
    const dateOfBirth = updateForm.dateOfBirth.value;
    const gender = updateForm.gender.value;
    const position = updateForm.position.value;
    const department = updateForm.department.value;
    const staffType = updateForm.staffType.value;
    const contractEndDate = updateForm.contractEndDate.value;
    const amount = updateForm.amount.value;
    const image = updateForm.image;
   

    const uNameErr = document.querySelector('.uNameErr');
    const emailErr = document.querySelector('.emailErr');
    const addressErr = document.querySelector('.addressErr');
    const dobErr = document.querySelector('.dobErr');
    const genderErr = document.querySelector('.genderErr');
    const positionErr = document.querySelector('.positionErr');
    const departErr = document.querySelector('.departErr');
    const staffErr = document.querySelector('.staffErr');
    const contractErr = document.querySelector('.contractErr');
    const amtErr = document.querySelector('.amtErr');
    
    uNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    addressErr.innerHTML = '';
    dobErr.innerHTML = '';
    genderErr.innerHTML = '';
    positionErr.innerHTML = '';
    departErr.innerHTML = '';
    staffErr.innerHTML = '';
    contractErr.innerHTML = '';
    amtErr.innerHTML = '';
   
     // pattern construction
     const nameReg = /^[a-zA-Z\s]+$/; 
     const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const departmentPattern = /^[a-zA-Z\s]+$/;
     const positionPattern = /^[a-zA-Z0-9\s]+$/;
     const addressPattern = /^[a-zA-Z0-9\s]+$/;
     const staffReg = /^[a-zA-Z\s]+$/; 
     const dobPattern = /^[0-9\s\W]+$/; 
     const amtPattern = /^[0-9\s\W]+$/; 
 
     if (!nameReg.test(userName)) {
         uNameErr.innerHTML = 'Enter your Username';
         throw Error('Terminating')
     }
     if (!emailReg.test(email)) {
         emailErr.innerHTML = 'Enter your Email';
         throw Error('Terminating');
     }
     if (!addressPattern.test(address)) {
         addressErr.innerHTML = 'Enter a valid address'
         throw('Terminating')
     }
     if (!dobPattern.test(dateOfBirth)) {
         dobErr.innerHTML = 'DOB must not be empty'
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
     if (!staffReg.test(staffType)) {
         staffErr.innerHTML = 'Enter staff type'
         throw('Terminating')
     }
     if (!dobPattern.test(contractEndDate)) {
         contractErr.innerHTML = 'Fill when the contract will end'
         throw('Terminating')
     }
     if (!amtPattern.test(amount)) {
         amtErr.innerHTML = 'Fill the salary amount'
         throw('Terminating')
     }
    if (!image) {
        uNameErr.innerHTML = 'Please Select Image';
        throw Error('Terminating')
    }

    const formData = new FormData();

    formData.append('userName', userName);          
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

    
    fetch('/admin/update-profile', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                window.location.href = '/admin/profile';
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
    .catch(e => {
        console.log(e);
    })  
})       