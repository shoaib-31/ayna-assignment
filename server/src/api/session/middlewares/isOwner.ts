/**
 * `isOwner` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    // Get the authenticated user
    const user = ctx.state.user;

    // Ensure the user is authenticated
    if (!user) {
      return ctx.unauthorized("You must be logged in to access sessions.");
    }

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: {
        id: {
          $eq: user.id,
        },
      },
    };

    // Proceed to the next middleware/controller
    await next();
  };
};
