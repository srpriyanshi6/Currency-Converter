const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr/usd.json";

const dropdownselect = document.querySelectorAll(".dropdown select");

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