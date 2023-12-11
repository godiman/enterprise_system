const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get form inputs
    const userName = updateForm.userName.value; 
    const email = updateForm.email.value;
    const phone = updateForm.phone.value;
    const image = updateForm.image;
   

    const uNameErr = document.querySelector('.uNameErr');
    const emailErr = document.querySelector('.emailErr');
    const phoneErr = document.querySelector('.phoneErr');
    

    uNameErr.innerHTML = '';
    emailErr.innerHTML = '';
    phoneErr.innerHTML = '';  
   

     // pattern construction
    const nameReg = /^[a-zA-Z\s]+$/; 
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;   
    const phoneReg = /^[0-9]+$/;



    if (!nameReg.test(userName)) {  
        uNameErr.innerHTML = 'Enter your Username';
        throw Error('Terminating')
    }
    if (!emailReg.test(email)) {
        emailErr.innerHTML = 'Enter your Email';
        throw Error('Terminating');    
    }
    if (!phoneReg.test(phone)) {
        phoneErr.innerHTML = 'Enter your Phone number';
        throw Error('Terminating');
    }
    if (!image) {
        uNameErr.innerHTML = 'Please Select Image';
        throw Error('Terminating')
    }

    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('phone', phone);
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