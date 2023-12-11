const editStock = document.getElementById('editStock')
editStock.addEventListener('submit', (e) =>{
    e.preventDefault()

    const brand = editStock.brand.value;
    const category = editStock.category.value;
    const pakagingType = editStock.pakagingType.value;
    const wholePrice = editStock.wholePrice.value;
    const unitPrice = editStock.unitPrice.value;
    const wholeQty = editStock.wholeQty.value;
    const unitQty = editStock.unitQty.value;
    const totalQtyInPackType = editStock.totalQtyInPackType.value;
    const stock_id = editStock.stock_id.value;


    const nameErr = document.querySelector('.nameErr');
    const cateErr = document.querySelector('.cateErr');
    const ptypErr = document.querySelector('.ptypErr');
    const whpricErr = document.querySelector('.whpricErr');
    const unipricErr = document.querySelector('.unipricErr');
    const whqutyErr = document.querySelector('.whqutyErr');
    const uniqtyErr = document.querySelector('.uniqtyErr');
    const inpackErr = document.querySelector('.inpackErr');
   
    nameErr.innerHTML = '';
    cateErr.innerHTML = '';
    ptypErr.innerHTML = '';
    whpricErr.innerHTML = '';
    unipricErr.innerHTML = '';
    whqutyErr.innerHTML = '';
    uniqtyErr.innerHTML = '';
    inpackErr.innerHTML = '';
    
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
        cateErr.innerHTML = 'Enter a category type'
        throw('Terminating')
    }
    if (!pack_typePattern.test(pakagingType)) {
        nameErr.innerHTML = 'Enter package type'
        throw('Terminating')
    }
    if (!wholes_pricePattern.test(wholePrice)) {
        whpricErr.innerHTML = 'Enter wholesales price'
        throw('Terminating')
    }
    if (!unity_pricePattern.test(unitPrice)) {
        unipricErr.innerHTML = 'Enter unity pricet'
        throw('Terminating')
    }
    if (!wholes_qtyPattern.test(wholeQty)) { 
        whqutyErr.innerHTML = 'Enter a wholesales qty'
        throw('Terminating')
    }
    if (!unity_qtyPattern.test(unitQty)) {
        uniqtyErr.innerHTML = 'Enter unity price'
        throw('Terminating')
    }
    if (!totalQtyPattern.test(totalQtyInPackType)) {
        inpackErr.innerHTML = 'Enter a wholesales qty'
        throw('Terminating')
    }

    // ********** Post form data to backend **********
    const data = { brand, category, pakagingType, wholePrice, unitPrice, wholeQty, unitQty, totalQtyInPackType, stock_id };

    fetch('/admin/edit-stock', {
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