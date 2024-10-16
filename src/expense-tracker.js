// <li><span>hello</span><button>delete</button></li>


document.addEventListener('DOMContentLoaded', ()=>{

    const expenseForm = document.getElementById('expenseForm')
    const expenseInput = document.getElementById('expenseInput')
    const expenseAmountInput = document.getElementById('expenseAmount')
    const expenseList = document.getElementById('expenseList')
    const totalAmoutDisplay = document.getElementById('totalAmout')


    let expenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : [];
    let total = calculateTotal();


    renderExpense();


    expenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = expenseInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id : Date.now(),
                name,
                amount
            }

            expenses.push(newExpense);
            saveExpense();
            renderExpense();
            updateTotal();


            expenseAmountInput.value = ''
            expenseInput.value = ''
        }

    })

    function renderExpense(){
        expenseList.innerHTML = ''
        expenses.forEach(expense => {
            const li = document.createElement('li')
            li.innerHTML = `<span>${expense.name} : $${expense.amount}</span><button data-id="${expense.id}">delete</button>`
            expenseList.appendChild(li);
        })
        updateTotal();
    }


    function calculateTotal(){
        return expenses.reduce((acc, expense)=>{
            return acc + expense.amount
        },0)
    }

    function saveExpense(){
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    function updateTotal(){
        total = calculateTotal();
        totalAmoutDisplay.textContent = `Total Amount : $${total.toFixed(2)}`
    }

    expenseList.addEventListener('click', (e)=>{
        if(e.target.tagName = 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense => {
                return expense.id !== expenseId;
            })


            saveExpense();
            renderExpense();
            updateTotal();
        }
    })
})
