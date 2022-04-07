const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
    const {review_id} = updatedReview
  
    knex("reviews as r")
        .where({ review_id })
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0]);
    
  return knex("reviews as r").join('critics as c','r.critic_id','c.critic_id')
    .select("r.*", "c.*").where({review_id}).then(addCritic)
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

module.exports = {
  read,
  update,
  destroy,
};
