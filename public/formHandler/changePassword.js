const change_password = document.getElementById('change_password');
change_password.addEventListener('submit', (e) => {
    e.preventDefault();

    const old_password = change_password.old_password.value;
    const newPassword = change_password.newPassword.value;    
    const password2 = change_password.password2.value;

    const old_passwordErr = document.querySelector('.old_passwordErr')
    const newpasswordErr = document.querySelector('.newpasswordErr')
    const password2Err = document.querySelector('.password2Err'); 

    const msg = document.querySelector('.msg')


    old_passwordErr.innerHTML = '';
    newpasswordErr.innerHTML = '';
    password2Err.innerHTML = '';

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!passwordPattern.test(old_password)) {
        old_passwordErr.innerHTML = 'Enter a valid password'
        throw Error('Terminating')
    }
    if (!passwordPattern.test(newPassword)) {
        newpasswordErr.innerHTML = 'Enter a valid password'
        throw Error('Terminating')
    }
    if (password2 !== newPassword) {
        password2Err.innerHTML = 'Password does not match'
        throw Error('Terminating')
    }
    const data = { old_password, newPassword }

    console.log(data);

    fetch('/admin/change-password', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                msg.innerHTML = data.msg;
                msg.style.backgroundColor = '#d1e7dd';
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'
    
                setInterval(() => {
                   window.location.href = '/admin/profile'
                }, 3000);
            }
    
            if (data.error) {
                msg.innerHTML = data.error;
                msg.style.backgroundColor = 'red';
                msg.style.padding = '10px'
                msg.style.marginBottom = '4px';
                msg.style.textAlign = 'center'
    
                setInterval(() => {
                   window.location.href = '/admin/profile'
                }, 3000);
            }
        })
})