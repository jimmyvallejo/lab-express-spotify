var express = require('express');
var router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));



/* GET home page. */
router.get('/:artistId', function(req, res, next) {
 const artistId = (req.params.artistId);
 spotifyApi.getArtistAlbums(artistId)
 .then((data) =>{
    res.render('albums.hbs', { albums: data.body});
    console.log(data.body);
 })
 .catch((error) =>{
    res.status(500).send(error);
 })
});

module.exports = router;