const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}
async function theaters(req, res) {
  const data = await service.theaters(res.locals.movie.movie_id);
  res.json({ data });
}
async function reviews(req, res) {
  const data = await service.reviews(res.locals.movie.movie_id);
  data.map((review) => (review.critic = review.critic[0]));
  res.json({ data });
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listShowing();
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  theaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theaters)],
  reviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviews)],
};
