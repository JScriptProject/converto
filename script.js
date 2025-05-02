
let countryFrom = "IN";
let countryTo = "US";
let currencyFrom = "INR";
let currencyTo = "USD";


// Load the data into the select items

const dropDown = document.querySelectorAll("select");

window.addEventListener("load", function(){
    dropDown.forEach((select)=>{
        for(let i=0; i<Object.keys(countryList).length; i++)
        {
            // Create new DOM element 'options'
            const newElement = document.createElement("option");
            newElement.value = Object.keys(countryList)[i];
            newElement.textContent = Object.keys(countryList)[i];
            newElement.setAttribute("name", Object.values(countryList)[i][0]);
            newElement.setAttribute("cname", Object.values(countryList)[i][1]);
            select.append(newElement);

            // Logic to set teh default options in dropdown
            if(newElement.value ==="INR" && select.getAttribute("name")=="currency-from")
            {
                newElement.selected = true;
            }
             if(newElement.value ==="USD" && select.getAttribute("name")==="currency-to")
            {
                newElement.selected = true;
            }
        }
    })
})

// Select the values from dropdown on click and update the flag

dropDown.forEach((select)=>{
   select.addEventListener("change", (e)=>{
    console.log(e.target);
    if(e.target.getAttribute("name")==="currency-from")
    {
        currencyFrom =  (e.target.value);
        countryFrom = (e.target.options[e.target.selectedIndex].getAttribute("name"));
        const cNameFrom = e.target.options[e.target.selectedIndex].getAttribute("cname");
        select.parentElement.querySelector("img").src = `https://flagsapi.com/${countryFrom}/flat/64.png`;
        (select.parentElement).parentElement.querySelector("h3").textContent = cNameFrom; 
    }
    if(e.target.getAttribute("name")==="currency-to")
    {
        currencyTo =  (e.target.value);
        countryTo = e.target.options[e.target.selectedIndex].getAttribute("name");
        const cNameTo = e.target.options[e.target.selectedIndex].getAttribute("cname");
        select.parentElement.querySelector("img").src = `https://flagsapi.com/${countryTo}/flat/64.png`;
        (select.parentElement).parentElement.querySelector("h3").textContent = cNameTo; 
    }
  })
  
})

// Get Exchange Rate and update to display

const runAPI = async() => {

    const result = await (await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.4.23/v1/currencies/${currencyFrom.toLowerCase()}.json`)).json();
    console.log(currencyFrom);
    console.log(currencyTo);
    console.log(result);
    const exRate = (result[currencyFrom.toLowerCase()][currencyTo.toLowerCase()]);
    const inputVal = document.querySelector("input").value;
    // display output
    document.querySelector(".output").innerText = `${inputVal} ${currencyFrom} = ${(exRate * inputVal).toFixed(2)} ${currencyTo}`; 
    document.querySelector(".ex-rate-show").textContent = `${exRate.toFixed(2)}`
    
}

document.querySelector("button").addEventListener("click", runAPI);




