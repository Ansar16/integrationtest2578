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

const List = [
  {
    Name: 'Ansar',
    Email: 'ansarias1605@gmail.com',
  },
  {
    Name: 'nayeem',
    Email: 'nayeem@gmail.com',
  }
]

app.get("/",  (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {

  if (List != []) {
    for (let i in List) {
      if (List[i].Name != "" && List[i].Email != "" ) {
        pool.query(`INSERT INTO salesforce.List__c(Name__c,Email__c) VALUES ($1,$2)  ON CONFLICT (Email__c) DO NOTHING`, [`${List[i].Name}`, `${List[i].Email}`]);
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