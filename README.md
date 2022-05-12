

# WeLoveMovies
## TECH USED

Click  Backend to view the App results.
| [Backend](https://we-love-movies-api.herokuapp.com/movies)|Testing|
|--|--|
| <img src="https://simpleicons.org/icons/nodedotjs.svg" style="width:50px" /><br/><b>Node.js</b> | <img src="https://simpleicons.org/icons/jest.svg" style="width:50px"/><br/><b>Jest</b>|
| <img src="https://simpleicons.org/icons/express.svg" style="width:50px"/><br/> <b>Express</b>||
| <img src="https://seeklogo.com/images/K/knexjs-logo-30104DC5C6-seeklogo.com.png" style="width:50px"/><br/> <b>Knex.js</b>||
| <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" style="width:50px"/><br/> <b>DotEnv</b>||
| <img src="https://user-images.githubusercontent.com/28286430/167266601-d6e278d2-b480-4deb-85b7-e2e2105ab6d4.png" style="width:50px"/><br/> <b>Cors</b>||


## INSTALLATION

    git clone https://github.com/patelpr/WeLoveMovies.git WeLoveMovies
    cd WeLoveMovies
    touch .env
Please input your postgreSQL database URI string in the .env file as:  

    DATABASE_URL=enter-your-database-url-here

then from the command line run

    npm i && npm run start
		
Voila!

## DATA
### ROUTES

| Method | Endpoint | Description |
|--|--|--|
|GET|/movies|List all movies|
|GET|/movies?is_showing=true|List all movies currently playing in theaters|
|GET|/movies/:movieId| Get a movie by ID|
|GET|/movies/:movieId/theaters|Get a list of all theaters playing a specific movie|
|GET|/movies/:movieId/reviews|Get a list of all reviews for a movie|
|PUT|/reviews/:reviewId|Update review and add critic|
|DELETE|/reviews/:reviewId|Delete review  by ID|
|PUT|/theaters/|List all theaters and movies at each theater||

## TABLES
### CRITICS
The `critics` table represents critics of each movie. Each critic has the following fields:
- `critic_id`: (Primary Key)
- `preferred_name`: (String) The first name of the customer.
- `surname`: (String) The last name of the critic.
- `organization_name`: (String) The critic's company.
An example record looks like the following:

```json
  {
	  "critic_id": 8
	  "preferred_name": "Abhi",
	  "surname": "Patil",
	  "organization_name": "Independent (UK)",
  }
```

### MOVIES

The `movies` table represents the movies that have or had a review and or theater. Each movie has the following fields:

- `movie_id`: (Primary Key)
- `title`: (String) The name of the movie.
- `rating`: (String) The average rating of each movie.
- `image_url`: (String) The movies' cover photo url.
- `runtime_in_minutes`: (Integer) The movie leghth in minutes.
- `description`: (Text) The movie description.

An example record looks like the following:

```json
  {
	  "title": "Interstellar",
	  "runtime_in_minutes": 169,
	  "rating": "PG-13",
	  "description":"Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life...",
	  "image_url":"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg",
  }
```

### REVIEWS

The `reviews` table represents the movies that have or had a review and or theater. Each movie has the following fields:

- `review_id`:(Primary Key)
- `score`:(Integer) Review Score of the movie
- `content`:(Text) Review Content
- `movie_id`:(Foreign Key) Movie review pointed towards
- `critic_id`:(Foreign Key) Critic who wrote this review

```json
  {
	  "review_id":0,
	  "score":5,
	  "content":'Lorem markdownum priores iactate receptus margine in motu ferreus pastor. Teneat tua opifex regina, adest; similisque nec, me convivia ortus. Est sontes praemia fatorum diversosque innubere rursus. Tanto inter commenta tremulasque tergo donec Apollinei mearum: Hector colorum horruit. > Cur repulsa matrem frequentes parvum coniuge ad nisi leto, ira. Orbis levatus > o coniugis longis confinia *bello* rursus quem Atridae indulgere! Sanguine o > operi flammas sorores suffundit et ilia. Nais edentem tamen. Acta munera enixa > ad terram! Sint sed per oppugnant Medusae Pagasaeae undique rebus cernit terram delituit dilapsa tigres. Ait omne conatur nomen cumque, ad Minoa magna *dolentes*, ageret. Sum addat, et unum iunge, aberant his indigenae facundia? > Perdidit astra, si maternis sibi, Phoebi protinus senecta digitos. Atque > suique **Lyrnesia**, prosunt suae mihi aqua, te! Subsedit tantaque vulnera totiens aptos vivit digna pectoraque mutua. Duro ante tibi perhorruit praedelassat simulat turis loco hunc dederat viscera scilicet transitus quam longius aenea, concussaque hoc mille. Ut erat. Tibi Themin corpore saepes.',
	  "movie_id":5,
	  "critic_id":2
}
```

### THEATERS
The `theaters` table represents each theater. Each theater has the following fields:
- `name`:(String) name of Theater Location
- `address_line_1`:(String) address_line_1 of Theater Location
- `address_line_2`:(String) address_line_2 of Theater Location
- `city`:(String) city of Theater Location
- `state`:(String) state of Theater Location
- `zip`:(String) zip of Theater Location
An example record looks like the following:
```json
{
	"name": "Hollywood Theatre",
	"address_line_1": "4122 NE Sandy Blvd.",
	"address_line_2": "",
	"city": "Portland",
	"state": "OR",
	"zip": "97212",
}

```
### MOVIES_THEATERS
The `movies_theaters` table represents each movie that is playing at each theater. Each movies_theaters record has the following fields:
- `movie_id`:(Foreign Key) Movie id referencing movies table.
- `theater_id`:(Foreign Key) Theater id referencing theater table.
- `is_showing`: (Boolean) If movie at movie id is playing at theater id curently.
An example record looks like the following:
```json
{
	"movie_id":3,
	"theater_id":4,
	"is_showing" : true
}
```
