async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        const products = await res.json();

        const table = document.getElementById("productTable");
        table.innerHTML = "";

        products.forEach(p => {
            table.innerHTML += `
                <tr>
                    <td><img src="${p.image}" width="60"></td>
                    <td>${p.name}</td>
                    <td>₹${p.price}</td>
                    <td>${p.category}</td>
                    <td>
                        <button onclick="deleteProduct(${p.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.log("Load error:", err);
    }
}

// ADD PRODUCT
async function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const image = document.getElementById("productImage").value;

    try {
        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, category, image })
        });

        const data = await res.json();

        if (data.success) {
            alert("Product Added Successfully");
            loadProducts();
        } else {
            alert("Error adding product");
        }

    } catch (err) {
        console.log(err);
    }
}

// DELETE PRODUCT
async function deleteProduct(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (data.success) {
            loadProducts();
        } else {
            alert("Delete failed");
        }

    } catch (err) {
        console.log(err);
    }
}

// AUTO LOAD
loadProducts();