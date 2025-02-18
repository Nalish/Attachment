const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            {
                id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
    ]
}
};


// const address{shipping{{postalCode}}} =user

//const {address:{shipping:{postalCode}}} = user

const{id:UserID,
    name:{first ,last},
    email,
    address:{shipping:{street,city,state,postalCode,country},
        billing:{street:street1,city:city1,state:state1,postalCode:postalCode1,country:country1}
    },
    payment:{total,currency,
        details:{subtotal,tax,shipping:details_shipping}
    ,
    transactions:[{id,amount,description},
        {id:enchantedId,amount:enchantedAmount,description:enchantedDescription}]}

}= user
console.log(street)

const personalInfo= document.getElementById("personal-info");
personalInfo.innerHTML=
`<p><strong>User ID:</strong>${UserID}</p>
<p><strong>First Name:</strong>${first}</p>
<p><strong>last Name:</strong>${last}</p>
<p><strong>Email:</strong>${email}</p>`


const shippingAddress= document.getElementById("shipping-address");
shippingAddress.innerHTML=`
<h2>Shipping Address</h2>
<p><strong>Street:</strong>${street}</p>
<p><strong>City:</strong>${city}</p>
<p><strong>State:</strong>${state}</p>
<p><strong>PostalCode:</strong>${postalCode}</p>
<p><strong>country:</strong>${country}</p>`

const billingAddress=document.getElementById("billing-address");
billingAddress.innerHTML=`
<h2>Billing Address</h2>
<p><strong>Street:</strong>${street1}</p>
<p><strong>City:</strong>${city1}</p>
<p><strong>State:</strong>${state1}</p>
<p><strong>PostalCode:</strong>${postalCode1}</p>
<p><strong>country:</strong>${country1}</p>`

const userTransactions=document.getElementById("transactions")
userTransactions.innerHTML=
user.payment.transactions.map(transaction =>`
    <h2>Transactions</h2>
<p><strong>ID</strong>${transaction.id}</p>
<p><strong>ID</strong>${transaction.amount}</p>
<p><strong>ID</strong>${transaction.description}</p>
<hr>`
).join("");