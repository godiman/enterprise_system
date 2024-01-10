const editDepartment = document.getElementById('editDepartment')
editDepartment.addEventListener('submit', (e) =>{
    e.preventDefault()

    const departName = editDepartment.departName.value;
    const department_id = editDepartment.department_id.value;
    
         
    const nameErr = document.querySelector('.nameErr');
   

    nameErr.innerHTML = '';
    
   

    const namePattern = /^[a-zA-Z0-9\s]+$/;
     
    if (!namePattern.test(departName)) {
        nameErr.innerHTML = 'Enter Department name'
        throw('Terminating')
    }
    

     // ********** Post form data to backend **********
     const data = { departName, department_id };

    fetch('/admin/edit-department', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
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
                window.location.href = "/admin/departments";
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