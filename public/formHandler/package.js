const packageForm = document.getElementById('packageForm')
packageForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const pakagingType = packageForm.pakagingType.value;


    const nameErr = document.querySelector('.nameErr');

    nameErr.innerHTML = '';
    
    const brandPattern = /^[a-zA-Z\s]+$/;

    if (!brandPattern.test(pakagingType)) {
        nameErr.innerHTML = 'Enter package type name'  
        throw('Terminating')
    }
  

    // ********** Post form data to backend **********
    const data = { pakagingType};

    fetch('/admin/add-packages', {
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
                window.location.href = "/admin/package";
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