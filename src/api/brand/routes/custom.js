module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/brands/:id/fix-affiliates',
        handler: 'brand.fixAffiliates',
        config: {
          policies: [],
        },
      },
    ],
  };