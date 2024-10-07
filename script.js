const DELIMITER = ",";
const NEWLINE = "\r";
let CSV = [];

/**
 * Converts CSV from file into array of dictionaries
 * @param {Object[]} csvData CSV from file
 */
function dataToArray(csvData){
    let rows = csvData.split(NEWLINE);

    let header = rows[0].split(DELIMITER);
    let obj = {};
    obj[header[0].trim()] = header[1].trim();
    CSV.push(obj);

    rows = rows.slice(1);
    
    rows.forEach(eachRow => {
        const columns = eachRow.split(DELIMITER);
        let obj = {}
        obj[columns[0].trim()] = parseInt(columns[1].trim(), 10);
        CSV.push(obj);
    })

}

/**
 * Parses CSV values into table
 * @param {object[]} csvData CSV from file
 */
function parseCSVToTable(csvData){
    dataToArray(csvData);

    const tableHead = document.querySelector("#table-1 thead");
    const tableBody = document.querySelector("#table-1 tbody");


    const header = CSV[0];
    
    for (let key in header){
        createTableRow(key, header[key], tableHead);
    }

    CSV.slice(1).forEach(e => {
        for (let key in e) {
            createTableRow(key, e[key], tableBody)
        }
    })

}

/**
 * Creates a table row with key-value pairs and append to parent element
 * @param {string} key Index # column
 * @param {string/int} value Value column
 * @param {HTMLElement} parentElement table head or table body
 */
function createTableRow(key, value, parentElement){
    const tableRow = document.createElement("tr");
    const tableData1 = document.createElement("td");
    const tableData2 = document.createElement("td");

    tableData1.textContent = key;
    tableData2.textContent = value;

    tableRow.appendChild(tableData1)
    tableRow.appendChild(tableData2)
    parentElement.appendChild(tableRow);

}

/**
 * Loads table input from CSV file
 */
function loadTableInput(){
    fetch("Table_Input.csv")
    .then(response => response.text())
    .then(data => {
        parseCSVToTable(data);
        loadAlpha();
        loadBeta();
        loadCharlie();
    })
    
}

/**
 * Loads alpha data
 */
function loadAlpha(){
    const td = document.createElement("td");
    const alpha = document.getElementById("alpha");

    const i = getValueFromCSV("A5");
    const j = getValueFromCSV("A20")

    let result = i + j;
    td.textContent = result;

    alpha.after(td);
}

/**
 * Loads betea data
 */
function loadBeta(){
    const td = document.createElement("td");
    const beta = document.getElementById("beta");

    const i = getValueFromCSV("A15");
    const j = getValueFromCSV("A7");

    let result = i / j;
    td.textContent = result;

    beta.after(td);

}

/**
 * Loads charlie data
 */
function loadCharlie(){
    const td = document.createElement("td");
    const charlie = document.getElementById("charlie");

    const i = getValueFromCSV("A13");
    const j = getValueFromCSV("A12");

    let result = i * j;
    td.textContent = result;

    charlie.after(td);
}

/**
 * Finds the value associated with key-value pair given a key in CSV array of dictionaries
 * @param {string} toFind key's value to find
 * @returns value of key-value pair
 */
function getValueFromCSV(toFind){
    for (i = 0; i < CSV.length; i ++){
        let obj = CSV[i];
        for (let key in obj){
            if (toFind === key){
                return obj[toFind];
            }
        }
    }
    return null;
}

loadTableInput();
