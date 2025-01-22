/**
 * `createOwnSession` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    // Check if the user is authenticated
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to create a session.");
    }

    // Ensure req.body.data exists
    if (!ctx.request.body) {
      ctx.request.body = {};
    }

    if (!ctx.request.body.data) {
      ctx.request.body.data = {};
    }

    // Inject the authenticated user's ID into the request body
    ctx.request.body.data.user = user.id;

    // Proceed to the next middleware or controller
    await next();
  };
};
