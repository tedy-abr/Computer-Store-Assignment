
// Laptop Section
const laptopsElement = document.getElementById("laptops");
const specsElement = document.getElementById("specs");

// Last Section 
const imgElement = document.getElementById("img");
const descriptionElement = document.getElementById("description");
const priceElement = document.getElementById("price");
const buyBtnElement = document.getElementById("buyBtn");
const titleElement = document.getElementById("title");

// Work
const earnedElement = document.getElementById("earned");
const transferElement = document.getElementById("transferBtn");
const workBtnElement = document.getElementById("workBtn");
const repayBtnElement = document.getElementById("repayBtn");


// Bank
const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstandingLoan");
const loanBtnElement = document.getElementById("loanBtn");



let laptops = [];
let balance = 0;
//let earned = 0;
let currentBalance = 0;
let earn = 0;
let loan = 0;



fetch("https://computer-api-production.up.railway.app/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
    laptops.forEach(x => addLaptopToSelect(x));
    priceElement.innerText = laptops[0].price + "NOK";
    titleElement.innerText = laptops[0].title;
    descriptionElement.innerText = laptops[0].description;
    specsElement.innerText = laptops[0].specs;
    imgElement.src = "https://computer-api-production.up.railway.app/" + laptops[0].image;
}

const addLaptopToSelect = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement)
}

const laptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    priceElement.innerText = selectedLaptop.price + "NOK";
    titleElement.innerText = selectedLaptop.title;
    descriptionElement.innerText = selectedLaptop.description;
    specsElement.innerText = selectedLaptop.specs;
    imgElement.src = "https://computer-api-production.up.railway.app/" + laptops[selectedLaptop.id - 1].image;
}

// Laptop Selection
laptopsElement.addEventListener("change", laptopChange);

//Work Function 

const work = () => {
    earn += 100;
    earnedElement.innerText = earn + "NOK";

}


workBtnElement.addEventListener('click', work);

// Get loan Function

const getLoan = () => {
    if (loan > 0) {
        return alert("Unfortunately, You can not have more than one loan.")
    }
    else {
        const LoanPrompt = prompt("Enter loan amount")
        if (LoanPrompt > currentBalance * 2) {
            return alert("Unfortunately, You cannot get a loan more than double of your bank balance!")
        }
        if (LoanPrompt === null) {
            return;
        }
        else {
            const balance = currentBalance + parseInt(LoanPrompt);
            loan = LoanPrompt;
            currentBalance = balance;
            balanceElement.innerText = balance + "NOK";
            outstandingLoanElement.innerText = LoanPrompt + "NOK";
            document.getElementById("repayBtn").style.display = "block";
            document.getElementById("hideOutstandingLoan").style.display = "flex";


        }
    }
}

loanBtnElement.addEventListener('click', getLoan);

// Transfer Money to Balance + 10% of to loan

const transfer = () => {
    if (loan > 0) {
        let transferB = (earn * 0.9);
        let transferL = (earn * 0.1);
        currentBalance += transferB;
        loan -= transferL;

        if (loan < 0) {
            loan = loan * - 1;
            outstandingLoanElement.innerText = loan + "NOK";
            balanceElement.innerText = currentBalance + "NOK";
            earn = 0;
            earnedElement.innerText = 0;
        } else {
            outstandingLoanElement.innerText = loan + "NOK";
            balanceElement.innerText = currentBalance + "NOK";
            earn = 0;
            earnedElement.innerText = 0;
        }
    }
    else (loan === 0)
    currentBalance += earn;
    balanceElement.innerText = currentBalance + "NOK";
    earn *= 0;
    earnedElement.innerText = earn + "NOK";
}

transferElement.addEventListener('click', transfer);


// Buy Fucntion

const buy = () => {
    const laptopPrice = parseInt(priceElement.innerText)
    if (currentBalance >= laptopPrice) {
        currentBalance -= laptopPrice;
        balanceElement.innerText = currentBalance + "NOK"
        alert(" You are now the owner of the new laptop!")
    } else {
        alert("Unfortunately, You cannot afford this laptop!");
    }
}

buyBtnElement.addEventListener('click', buy);


// Repay Loan Function 

const repay = () => {
    if (loan > 0) {
        loan -= earn;
        outstandingLoanElement.innerText = loan + "NOK";
        earn = 0;
        if (loan < 0) {
            earn = loan * - 1;
            earnedElement.innerText = earn + "NOK";
            outstandingLoanElement.innerText = 0 + "NOK";
            document.getElementById("repayBtn");
            document.getElementById("outstandingLoan");

        }
    }

    if (loan === 0) {
        document.getElementById("repayBtn");
        document.getElementById("outstandingLoan");
        earn = 0;
        earnedElement.innerText = 0 + "NOK";
    }
}

repayBtnElement.addEventListener('click', repay);

document.getElementById('repayBtn').style.display = "none";
document.getElementById('hideOutstandingLoan').style.display = "none";


















































