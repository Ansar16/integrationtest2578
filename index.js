const express = require('express')
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const Port = process.env.PORT || 3000;

const ListOfData = [
  {
    UserName: 'Ansar',
    Email: 'ansarias1605@gmail.com',
    Phone: 8122796953,
    City: 'Bangalore',
    Gender: 'Male'
  },
  {
    UserName: 'nayeem',
    Email: 'nayeem@gmail.com',
    Phone: 8122796953,
    City: 'Bangalore',
    Gender: 'Male'
  }
]

app.get("/",  (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {

  if (ListOfData != []) {
    for (let i in ListOfData) {
      if (ListOfData[i].UserName != "" && ListOfData[i].Email != "" && ListOfData[i].City != "" && ListOfData[i].Gender != "") {
        pool.query(`INSERT INTO salesforce.ListOfData__c(User_Name__c,Email__c,Phone__c,City__c,Gender__c) VALUES ($1,$2,$3.$4,$5)  ON CONFLICT (Email__c) DO NOTHING`, [`${ListOfData[i].UserName}`, `${ListOfData[i].Email}`, `${ListOfData[i].Phone}`, `${ListOfData[i].City}`, `${ListOfData[i].Gender}`]);
      }
      else {
        console.log('No Orders Found to sync');
      }
    }

  }
  res.sendFile(__dirname + "/success.html");

})

app.listen(Port, () => {
  console.log(`Server is Running ${Port}`);
})