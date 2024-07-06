const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownselect = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const info = document.querySelector(".info");

for (let select of dropdownselect) {
    for (currencyCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currencyCode;
      newOption.value = currencyCode;
      if (select.name === "from" && currencyCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currencyCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let update = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = update;
  };

  btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue==="" || amountValue<1){
        amountValue=1;
        amount.value="1";
    }

    const fromCurr = document.querySelector(".from select");
    const fromCurrency= fromCurr.value.toLowerCase();
    // console.log(fromCurrency);

    const toCurr = document.querySelector(".to select");
    const toCurrency= toCurr.value.toLowerCase();
    //console.log(toCurrency);

    const URL = `${BASE_URL}/${fromCurrency}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let fromC = data[fromCurrency];
    let exchangerate = fromC[toCurrency];
    //console.log(exchangerate);

    let ans = amountValue*exchangerate;
    // console.log(ans);
    info.innerText = `${amountValue} ${fromCurr.value} = ${ans} ${toCurr.value}`
  });


