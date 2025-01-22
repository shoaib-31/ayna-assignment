/**
 * session router
 */

import { factories } from "@strapi/strapi";

const { createCoreRouter } = factories;

module.exports = createCoreRouter("api::session.session", {
  config: {
    find: {
      middlewares: ["api::session.is-owner"],
    },
    create: {
      middlewares: ["api::session.create-own-session"],
    },
  },
});

export default factories.createCoreRouter("api::session.session");
