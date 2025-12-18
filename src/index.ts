// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    try {
      // 1. Find the Authenticated Role
      const authenticatedRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      if (!authenticatedRole) {
        console.log('Authenticated role not found');
        return;
      }

      // 2. Define permissions to enable
      const permissionsToEnable = [
        { action: 'api::favorite.favorite.find', role: authenticatedRole.id },
        { action: 'api::favorite.favorite.findOne', role: authenticatedRole.id },
        { action: 'api::favorite.favorite.create', role: authenticatedRole.id },
        { action: 'api::favorite.favorite.update', role: authenticatedRole.id },
        { action: 'api::favorite.favorite.delete', role: authenticatedRole.id },
        
        { action: 'api::cart.cart.find', role: authenticatedRole.id },
        { action: 'api::cart.cart.findOne', role: authenticatedRole.id },
        { action: 'api::cart.cart.create', role: authenticatedRole.id },
        { action: 'api::cart.cart.update', role: authenticatedRole.id },
        { action: 'api::cart.cart.delete', role: authenticatedRole.id },

        { action: 'api::cart-item.cart-item.find', role: authenticatedRole.id },
        { action: 'api::cart-item.cart-item.findOne', role: authenticatedRole.id },
        { action: 'api::cart-item.cart-item.create', role: authenticatedRole.id },
        { action: 'api::cart-item.cart-item.update', role: authenticatedRole.id },
        { action: 'api::cart-item.cart-item.delete', role: authenticatedRole.id },

        { action: 'api::order.order.find', role: authenticatedRole.id },
        { action: 'api::order.order.findOne', role: authenticatedRole.id },
        { action: 'api::order.order.create', role: authenticatedRole.id },
        // Orders usually shouldn't be updated/deleted by users, but for dev simplicity:
        { action: 'api::order.order.update', role: authenticatedRole.id },
        { action: 'api::order.order.delete', role: authenticatedRole.id },

        { action: 'api::order-item.order-item.find', role: authenticatedRole.id },
        { action: 'api::order-item.order-item.findOne', role: authenticatedRole.id },
        { action: 'api::order-item.order-item.create', role: authenticatedRole.id },
        { action: 'api::order-item.order-item.update', role: authenticatedRole.id },
        { action: 'api::order-item.order-item.delete', role: authenticatedRole.id },
      ];

      // 3. Enable permissions
      for (const permission of permissionsToEnable) {
        const existing = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: permission });

        if (!existing) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              ...permission,
              enabled: true,
            },
          });
          console.log(`Enabled permission: ${permission.action}`);
        }
      }
      
      console.log('Permissions configured successfully');
    } catch (error) {
      console.error('Failed to configure permissions', error);
    }
  },
};
