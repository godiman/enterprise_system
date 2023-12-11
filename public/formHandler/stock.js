const stockForm = document.getElementById('stockForm')
stockForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const brand = stockForm.brand.value;
    const category = stockForm.category.value;
    const pakagingType = stockForm.pakagingType.value;
    const wholePrice = stockForm.wholePrice.value;
    const unitPrice = stockForm.unitPrice.value;
    const wholeQty = stockForm.wholeQty.value;
    const unitQty = stockForm.unitQty.value;
    const totalQtyInPackType = stockForm.totalQtyInPackType.value;


    const nameErr = document.querySelector('.nameErr');
   
   

    nameErr.innerHTML = '';
   

    
    const brandPattern = /^[a-zA-Z\s]+$/;
    const categoryPattern = /^[a-zA-Z0-9\s-,]+$/;
    const pack_typePattern = /^[a-zA-Z0-9\s.,']+$/;
    const wholes_pricePattern = /^[a-zA-Z0-9\s.,']+$/;
    const unity_pricePattern = /^[a-zA-Z0-9\s.,']+$/;
    const wholes_qtyPattern = /^[a-zA-Z0-9\s.,']+$/;
    const unity_qtyPattern = /^[0-9]+$/;
    const totalQtyPattern = /^[a-zA-Z0-9\s]+$/;

    if (!brandPattern.test(brand)) {
        nameErr.innerHTML = 'Enter a brand name'
        throw('Terminating')
    }
    if (!categoryPattern.test(category)) {
        nameErr.innerHTML = 'Enter a category type'
        throw('Terminating')
    }
    if (!pack_typePattern.test(pakagingType)) {
        nameErr.innerHTML = 'Enter package type'
        throw('Terminating')
    }
    if (!wholes_pricePattern.test(wholePrice)) {
        nameErr.innerHTML = 'Enter wholesales price'
        throw('Terminating')
    }
    if (!unity_pricePattern.test(unitPrice)) {
        nameErr.innerHTML = 'Enter unity pricet'
        throw('Terminating')
    }
    if (!wholes_qtyPattern.test(wholeQty)) { 
        nameErr.innerHTML = 'Enter a wholesales qty'
        throw('Terminating')
    }
    if (!unity_qtyPattern.test(unitQty)) {
        nameErr.innerHTML = 'Enter unity price'
        throw('Terminating')
    }
    if (!totalQtyPattern.test(totalQtyInPackType)) {
        nameErr.innerHTML = 'Enter a wholesales qty'
        throw('Terminating')
    }

    // ********** Post form data to backend **********
    const data = { brand, category, pakagingType, wholePrice, unitPrice, wholeQty, unitQty, totalQtyInPackType };

    fetch('/admin/register-stock', {
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
                window.location.href = "/admin/stocks";
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