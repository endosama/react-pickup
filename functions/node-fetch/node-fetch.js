/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  const text = event.queryStringParameters.text;
  try {
    const response = await fetch(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${text}`, {
      headers: { Accept: 'application/json' }
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { 
        statusCode: response.status, 
        body: [] 
      }
    }
    const data = await response.json()
    const results = data.results;
    const docs = results ? results.docs : []
    if(results.numFound > 0) {
        const formattedResult = docs.map(doc => ({
            name: doc.name,
            iata: doc.iata,
            type: doc.placeType,
            city: doc.city,
            region: doc.region,
            country: doc.country
        }))
        return {
          statusCode: 200,
          body: JSON.stringify({locations: formattedResult})
        }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({locations: []})
      }
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ locations: []}) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
