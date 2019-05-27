const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 9000;


app.use(cors());

app.get('/', (req, res) => {
    let title = req.query.title;
    axios
        .get(`http://openlibrary.org/search.json?title=${title}`)
        .then(response => {
            let author = response.data.docs[0].author_name[0].toString();
            let isbn = response.data.docs[0].isbn[0].toString();

            let finRes = author + '?' + isbn;
            res.send(finRes);
        })
        .catch(err => {
            console.log(`Failed to get resources from Open Library: ${err}`)
        });
});





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
