const getProducts = () =>{
    axios.get('http://localhost:3000/produtos')
    .then(response => {
        const products = response.data;
        console.log(products);
        document.getElementById('table-products').innerHTML = products.map((product) => {
            return `
                <tr>
                    <th>${product.name}</th>
                    <th>${product.price}</th>
                    <th>
                        <div>
                            <button class="btnUpdate"
                            onclick="editProduct(${product.id}, '${product.name}', ${product.price})">
                            Editar
                            </button>
                        </div>
                    </th>
                    <th>
                        <div>
                            <button class="btnDelete" 
                            onclick="deleteProduct(${product.id})">
                            Excluir
                            </button>
                        </div>
                    </th>
                </tr>
            `;
        }).join('');
    })
    .catch(error => {
        console.error(error);
    });
}
// Function to delete a product
function deleteProduct(productId) {
    // Make an HTTP DELETE request to delete the product with the given ID
    axios.delete(`http://localhost:3000/produtos/${productId}`)
        .then(response => {
            console.log('Product deleted:', response.data);
            // Update the UI or perform any other necessary actions
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
    getProducts()
}

// Function to update a product
function editProduct(productId, currentName, currentPrice) {
    const newName = prompt('Enter the new name:', currentName);
    const newPrice = prompt('Enter the new price:', currentPrice);

    if (newName !== null && newPrice !== null) {
        const updatedProduct = {
            name: newName,
            price: parseFloat(newPrice)
        };

        axios.put(`http://localhost:3000/produtos/${productId}`, updatedProduct)
            .then(response => {
                console.log('Product updated:', response.data);
                // Update the UI or perform any other necessary actions
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    }
    getProducts()
}
// Add event listener to the create product form
function addProduct() {
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');

    const name = nameInput.value;
    const price = parseFloat(priceInput.value);

    if (name && price) {
        const newProduct = {
            name: name,
            price: price
        };

        axios.post('http://localhost:3000/produtos', newProduct)
            .then(response => {
                console.log('Product created:', response.data);
                // Update the UI or perform any other necessary actions
                nameInput.value = '';
                priceInput.value = '';
            })
            .catch(error => {
                console.error('Error creating product:', error);
            });
    }
}

const createProductForm = document.getElementById('createProductForm');
createProductForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addProduct();
    getProducts()
});
getProducts()