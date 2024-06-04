const express = require('express');
const Openai = require('openai')
const axiosClient = require('../lib/axiosClient');

const router = express.Router();

const openai = new Openai({
  apiKey: process.env.OPEN_AI_KEY,
});

router.post('/explain', async (req, res) => {
  // res.status(500).json({ message: 'Internal error accured' })

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { "role": "user", "content": `explain this code in 20 words - ${req.body.text}` },
      ],
      model: "gpt-3.5-turbo",
    });
  
    res.send(completion.choices[0])
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal error accured' })
  }

})

router.get('/getentry', async (req, res) => {

  // res.status(500).json({ message: 'Internal error accured' })

  const { owner, repoName, path } = req.query
  
  try {
    const { data } = await axiosClient.get(`https://api.github.com/repos/${owner}/${repoName}/contents/${path || ''}`)
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Internal error accured' })
  }
})

router.get('/search', async (req, res) => {

  // res.status(500).json({ message: 'Something went wrong with your search!' })
  
  const { query } = req.query
  try {
    const { data } = await axiosClient.get(`https://api.github.com/search/repositories?q=${query}&per_page=10&sort=stars&order=desc`)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal error accured' })
  }
})

router.get('/gettopic', async (req, res) => {
  
  const { topic } = req.query
  try {
    const { data } = await axiosClient.get(`https://api.github.com/search/repositories?q=${topic}&per_page=10&sort=stars&order=desc`)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal error accured' })
  }
})

module.exports = router;
