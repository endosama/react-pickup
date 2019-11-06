const express = require("express");
const axios = require("axios");
const app = express();
app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("/api/search/:text", (req, res) => {
    const text = req.params.text;
    return axios.get(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${6}&solrTerm=${text}`)
        .then(response => {
            const results = response.data.results;
            const docs = results ? results.docs : []
            const formattedResult = docs.map(doc => ({
                name: doc.name,
                iata: doc.iata,
                type: doc.placeType,
                city: doc.country,
                region: doc.region,
            }))
            res.json(formattedResult)
        })
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});