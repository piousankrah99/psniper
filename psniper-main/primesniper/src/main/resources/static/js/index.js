
function toggleSidebar() {
    const sidebar = document.querySelector('.sideBar');

    sidebar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const mainPage = () => {
        fetch("http://localhost:8081/api/v1/primeSniper/getAllItems", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Sniper Items", data);

                // Check if the data array has elements
                if (data && data.length >= 0) {
                    $(".item").text(data.item);
                    $(".price").text(data.price);


                    const itemCardFunc = (data) => {
                        let cardContainer = document.querySelector(".mainCards")
                        cardContainer.innerHTML = ''

                        if (data.length !== 0) {
                            data.forEach(items => {
                                const { item, price } = items;
            const card = `
                <div class="card">
                    <img src="/img/sniper6.jpg" alt="Item Image">
                <div class="card-content">
                    <h2 class="header">Item</h2>
                    <p class="item">${item}</p>
                    <h2 class="header">Price</h2>
                    <p class="price">${price}</p>
                    <a> <button id="EditBtn" onclick="openUpdateModal()" >Edit Item</button></a>

                </div>
                </div>
                
            `;

                                // Append each card to the container
                                cardContainer.innerHTML += card;
                            });
                        } else {
                            cardContainer.innerHTML = '<p>NO ITEMS AVAILABLE FOR THIS PAGE</p>';
                        }
                    };

                    itemCardFunc(data);



                } else {
                    // Handle the case when there are no items in the response
                    console.error("No items found in the response.");
                }


            })
            .catch(error => {
                // Handle the error more gracefully
                console.error("Fetch request failed:", error);
            });
    };

    // Call the mainPage function after it's defined
    mainPage();
});


function updateItem() {
    // Get form data
    var formData = {
        id: $("#itemId").val(),
        item: $("#itemName").val(),
        price: $("#itemPrice").val()
    };

    // Make AJAX call
    $.ajax({
        type: "PUT",
        url: "api/v1/primeSniper/updates/" + formData.id,
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
            console.log("ggg success", formData);

            alert("Update successful");
            // Additional success handling if needed
        },
        error: function (error) {
            console.log("Error updating item: ", error);
            // Additional error handling if needed
            console.log("ggg error", formData);

        }
    });
}


function openInsertModal() {
    document.getElementById("insertModal").style.display = "block";
}

function closeInsertModal() {
    document.getElementById("insertModal").style.display = "none";
}

function openUpdateModal() {

    document.getElementById("updateModal").style.display = "block";
}


function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}

