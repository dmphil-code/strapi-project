'use strict';

/**
 * brand controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// Only export once with the customized controller
module.exports = createCoreController('api::brand.brand', ({ strapi }) => ({
  // Keep the default controllers
  async publish(ctx) {
    try {
      const { id } = ctx.params;
      
      // Get the brand before updating
      const brand = await strapi.db.query('api::brand.brand').findOne({
        where: { id },
        populate: ['affiliates']
      });
      
      // If brand has affiliates, handle them specially
      if (brand.affiliates && brand.affiliates.length > 0) {
        // First, detach all affiliates
        const affiliateIds = brand.affiliates.map(a => a.id);
        
        for (const affiliateId of affiliateIds) {
          await strapi.db.query('api::affiliate.affiliate').update({
            where: { id: affiliateId },
            data: { brand: null }
          });
        }
        
        // Now update the brand with explicit featured value
        const result = await strapi.db.query('api::brand.brand').update({
          where: { id },
          data: {
            publishedAt: new Date(),
            featured: brand.featured === null ? false : brand.featured
          }
        });
        
        // Re-attach the affiliates
        for (const affiliateId of affiliateIds) {
          await strapi.db.query('api::affiliate.affiliate').update({
            where: { id: affiliateId },
            data: { brand: id }
          });
        }
        
        return this.transformResponse(result);
      } else {
        // If no affiliates, just update normally
        const result = await strapi.db.query('api::brand.brand').update({
          where: { id },
          data: {
            publishedAt: new Date(),
            featured: brand.featured === null ? false : brand.featured
          }
        });
        
        return this.transformResponse(result);
      }
    } catch (error) {
      console.error('Publish error:', error);
      return ctx.badRequest('Publish failed: ' + error.message);
    }
  }
}));