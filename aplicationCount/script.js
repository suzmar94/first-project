//POVEZIVANJE HEDERA;ovde su ukupne cifre svih prihoda i rashoda sabrane i oduzete(kod rashoda se menja i ukupan procenat)
let sum = document.querySelector('#sum');
let incomeNumber = document.querySelector('#income-number');
let expenseNumber = document.querySelector('#expense-number');
let percentNumber = document.querySelector('#percent');

//POVEZIVANJE SEKCIJE GDE JE FORMA, TO JEST INPUT
let select = document.querySelector('#select');
let opisTransakcije = document.querySelector('#opis-transakcije');
let iznosTransakcije = document.querySelector('#iznos-transakcije');
let buttonAdd = document.querySelector('#button-add');

//POVEZIVANJE OUTPUTA
let incomeContainer = document.querySelector('#income-container');
let expensesContainer = document.querySelector('#expenses-container');

let currentSelected = '';

select.addEventListener('change', e => {
    currentSelected = e.target.value;
    console.log(currentSelected);
})

let arr = [];

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();

    //validacija
    if (opisTransakcije.value == '') {
        alert('Opis polje ne sme biti prazno')
        return;
    }
    if (iznosTransakcije.value <= 0 || isNaN(iznosTransakcije.value)) {
        alert('Iznos polje mora biti broj; ne sme biti 0, negativan broj ili tekst');
        return;
    }

    let formInput = {
        selected_option: select.value,
        description: opisTransakcije.value,
        amount: iznosTransakcije.value

    }
    //reset polja
    select.value = '';
    opisTransakcije.value = '';
    iznosTransakcije.value = '';

    console.log(formInput);
    arr.push(formInput);
    console.log(arr);
    output(formInput); //funkcija koju pravimo za output
});

let sumIncome = 0;
let sumExpense = 0;

function output(list) {

    let outputDiv = document.createElement('div');
    outputDiv.className = "hov";
    
    //selected_option is PRIHODI
    if (currentSelected == 'Prihod') {
        let opisIcena = document.createElement('p');
        opisIcena.innerHTML = `${list.description} + ${list.amount}`;
        outputDiv.appendChild(opisIcena);
        incomeContainer.appendChild(outputDiv);


        let x = parseInt(list.amount);
        sumIncome += x;
        incomeNumber.innerHTML = `+${sumIncome}`;

    } else {
        //selected option is RASHODI
        let percent = Math.round((list.amount / sumIncome) * 100);
        let opisIcenazaRashod = document.createElement('p');

        opisIcenazaRashod.innerHTML = `${list.description} - ${list.amount} ${percent}%`;
        outputDiv.appendChild(opisIcenazaRashod);
        expensesContainer.appendChild(outputDiv);


        let y = parseInt(list.amount);
        sumExpense += y;
        expenseNumber.innerHTML = `-${sumExpense} ${percent}%`;
    }

    let btnDelete = document.createElement('button');
    btnDelete.innerText = 'X';
    btnDelete.className = "btn";
    btnDelete.addEventListener('click', e => {
        e.target.parentElement.remove();
    });

    
    outputDiv.appendChild(btnDelete);

    sum.innerHTML = sumIncome-sumExpense;
};




