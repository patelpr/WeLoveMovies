const knex = require("../db/connection");

const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

function list() {
  return knex("movies").select(
    "movie_id as id",
    "title",
    "runtime_in_minutes",
    "rating",
    "description",
    "image_url"
  );
}
function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(id) {
  return knex("movies").select("*").where({ movie_id: id }).first();
}

function theaters(id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where("mt.movie_id", id)
    .where({ "mt.is_showing": true });
}

function reviews(id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": id })
    .then(addCritic);
}

module.exports = {
  list,
  listShowing,
  reviews,
  theaters,
  read,
};
