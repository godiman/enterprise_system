const update_staff = document.getElementById('update_staff')
update_staff.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    
    const position = update_staff.position.value; 
    const department = update_staff.department.value;    
    const staffType = update_staff.staffType.value;
    const contractEndDate = update_staff.contractEndDate.value;
    const amount = update_staff.amount.value;
    const staff_id = update_staff.staff_id.value;
    const image = update_staff.image;

     
    
    const positionErr = document.querySelector('.positionErr');
    const departErr = document.querySelector('.departErr');
    const staffErr = document.querySelector('.staffErr');
    const contractErr = document.querySelector('.contractErr');
    const amtErr = document.querySelector('.amtErr');
   
    
    positionErr.innerHTML = '';
    departErr.innerHTML = '';    
    staffErr.innerHTML = '';
    contractErr.innerHTML = '';
    amtErr.innerHTML = '';
   


    const namePattern = /^[a-zA-Z\s]+$/;
    const departmentPattern = /^[a-zA-Z\s]+$/;
    const positionPattern = /^[a-zA-Z0-9\s]+$/;
    const dobPattern = /^[0-9\s\W]+$/; 
    const amtPattern = /^[0-9\s\W]+$/;

     
    if (!positionPattern.test(position)) {
        positionErr.innerHTML = 'Enter posotion'
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
        amtErr.innerHTML = 'Staff salary'
        throw('Terminating')
    }
    if (image == '') {
        namePattern.innerHTML = 'Please Select Image';
        throw Error('Terminating')
    }
    const formData = new FormData();

    
    formData.append('position', position);
    formData.append('department', department);   
    formData.append('staffType', staffType);
    formData.append('contractEndDate', contractEndDate);
    formData.append('amount', amount);
    formData.append('staff_id', staff_id);
    formData.append('image', image.files[0]);         

    fetch('/admin/update-staffs', {
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