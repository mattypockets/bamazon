var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",

    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("You are now connected to Bamazon!");
    showProducts();
});

//Show products to customer
function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let i in res) {
            let product = res[i]

            console.log(
                "| Product ID:", product.item_id,
                "| Product Name:", product.product_name,
                "| Price:", product.price
            )
        }
        buyProduct(res);
    })
};

// Allow the customer to buy a product.
function buyProduct(res) {
    inquirer.prompt([
        // Ask the ID of which product they would like to buy
        {
            name: "get_item_id",
            message: "Please enter the ID of the product you would like to purchase."
        },
        // Ask how many units of the item they would like to buy
        {
            name: "get_item_quantity",
            message: "How many would you like?"
        }
    ]) .then(function(answers) {
        connection.query("SELECT stock_quantity, price FROM products WHERE item_id =" + answers.get_item_id, function(err, res){
            if (err) throw err;
            // If enough of the item is in stock, update the quantity of the items in stock and display the order total.
            if (answers.get_item_quantity <= res[0].stock_quantity){
                var newStock = res[0].stock_quantity - answers.get_item_quantity;
                var cost = answers.get_item_quantity * res[0].price;

                connection.query(
                    "UPDATE products SET ? WHERE ?", 
                    [ {stock_quantity: newStock},
                    {item_id: answers.get_item_id}],
                    function(err, res) {
                        if (err) throw err;

                        console.log("The total cost of your order is $" + cost);

                        // Ask if the customer would like to make another purchase
                        inquirer.prompt([
                        {   
                            type: "list",
                            message: "Would you like to make another purchase?",
                            choices:
                                [ "Yes",
                                  "No"],
                            name: "shopAgain",
                        }
                        ]) .then(function(response) {
                            if (response.shopAgain === "Yes") {
                                showProducts();
                            } else if (response.shopAgain === "No") {
                                console.log("Thank you for shopping with Bamazon. Have a great day!");
                                connection.end();
                            }
                        })
                    }
                )
            }
            // If the stock is too low, apologize to the customer and have them choose another product
            else {
                console.log("Sorry, we do not have that much of this item in stock.");
                buyProduct();
            }
        })
    })
}



