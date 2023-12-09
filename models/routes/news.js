const router = require('express').Router();
const axios = require('axios');

//This component defines a route that makes a request to an external API to fetch the latest news data.

router.get('/latestNews', async (req, res) => {
  try {
    const newsData = await axios.get(
      'https://newsdata.io/api/1/news?apikey=pub_137138d2ad9cfcd1beb7a48f9ea4b14b4fbc2&country=us'
    );
    if (newsData.data != null && newsData.data.status == 'success') {
      const newsResults = newsData.data.results;
      let newsExtractedResult = [];
      for (let newsIndex = 0; newsIndex < 10; newsIndex++) {
        newsExtractedResult.push(newsResults[newsIndex]);
      }
      return res.status(200).json(newsExtractedResult);
    }
  } catch (error) {
    const errorJson = {
      status: error.response.status,
      statusText: error.response.statusText,
    };
    return res.status(error.response.status).json(errorJson);
  }
});

//export router
module.exports = router;
