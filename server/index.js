const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const getTemplate= require('./documents/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//POST-generate pdf and fetch data
app.post('/create-pdf', (req, res) => {
     pdf.create(getTemplate(req.body), {}).toFile('result.pdf', (err) => {
            if (err) {
               return res.status(500).send(err);
          }
          res.send('PDF generated');
      
     })
})

//GET-send generated pdf to client
app.get('/fetch-pdf', (req, res) => {
     res.sendFile(`${__dirname}/result.pdf`);
})

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));