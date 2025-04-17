'use strict';

/**
 * brand controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::brand.brand');

module.exports = createCoreController('api::brand.brand', ({ strapi }) => ({
    async publish(ctx) {
      try {
        const { id } = ctx.params;
        
        // First, update only the publishedAt field
        const result = await strapi.db.query('api::brand.brand').update({
          where: { id },
          data: { 
            publishedAt: new Date(),
            // Set featured explicitly to prevent null values
            featured: false 
          }
        });
        
        // Explicitly exclude relation fields from the update
        return this.transformResponse(result);
      } catch (error) {
        console.error('Publish error:', error);
        return ctx.badRequest('Publish failed: ' + error.message);
      }
    }
  }));