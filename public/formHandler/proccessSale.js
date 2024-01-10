function processSale() {
            
                // Get cart items from the UI
                const cartItems = cart.map(item => ({
                    brand: item.brand,
                    price: item.price,
                    packageType: item.packageType,
                    quantity: item.quantity,
                    wholeQty: item.wholeQty,
                    unitQty: item.unitQty,
                    stockId: item.stockId
                }));
                
                // Get an array of stockIds from cartItems
                const stockIds = cartItems.map(item => item.stockId);

                // Get an array of quantities from cartItems
                const quantities = cartItems.map(item => item.quantity);

                 // Calculate the total quantity and collect the brands
                const { totalQuantity, brands } = cartItems.reduce((acc, item) => {
                    acc.totalQuantity += item.quantity;
                    acc.brands.push(item.brand);
                    return acc;
                }, { totalQuantity: 0, brands: [] });
                
                const data = {stockIds, quantities}

            
                // Send a POST request to the server
                fetch('/admin/process-Sale', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        // Display success message
                        document.getElementById('successMessage').style.display = 'block';
                        // Clear the cart or perform any other necessary actions
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                });
            }