import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [zipCodeData, setZipCodeData] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);
  const [selectedZipCode, setSelectedZipCode] = useState("");
  const getAndSetZipCodeData = () => {
    Axios.get("http://localhost:3001/api/get/zipcodes").then((response) => {
      const zipCodes = response.data;
      setZipCodeData(zipCodes);
      const selections = zipCodes.map((item) => ({
        label: item.zipcode,
        value: item.zipcode,
      }));
      setZipCodeList(selections);
    });
  };

  const handleSelectChange = (event) => {
    const zipCodeDataItem = zipCodeData.find(
      (item) => item.zipcode == event.target.value
    );
    setSelectedZipCode(zipCodeDataItem);
  };

  const explanationText = (selectedZipCode) => {
    const lowIncomePercent = `${(
      selectedZipCode.low_income_ratio * 100
    ).toFixed(2)}%`;
    const ticketsPerCapita = `${(selectedZipCode.ticket_ratio * 100).toFixed(
      2
    )} parking tickets for every 100 people.`;
    return `In 2018, ${lowIncomePercent} of the residents of zip code ${selectedZipCode.zipcode} made under $25,000 per year, and they received ${ticketsPerCapita}`;
  };

  useEffect(() => {
    getAndSetZipCodeData();
  }, []);

  return (
    <div className="App">
      <h1>Povery and Ticket Rate by Zip Code in Chicago</h1>
      <form>
        <select value={selectedZipCode.zipcode} onChange={handleSelectChange}>
          <option defaultValue>Select zip code</option>
          {!!zipCodeList &&
            zipCodeList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
      </form>
      {!!selectedZipCode && <h4>{explanationText(selectedZipCode)}</h4>}
    </div>
  );
}

export default App;
