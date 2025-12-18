import type { Schema, Struct } from '@strapi/strapi';

export interface MarketingPromotionRule extends Struct.ComponentSchema {
  collectionName: 'components_marketing_promotion_rules';
  info: {
    displayName: 'Promotion Rule';
  };
  attributes: {
    buyCount: Schema.Attribute.Integer;
    enabled: Schema.Attribute.Boolean;
    freeCount: Schema.Attribute.Integer;
  };
}

export interface OrderAddress extends Struct.ComponentSchema {
  collectionName: 'components_order_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    street: Schema.Attribute.String;
    zipCode: Schema.Attribute.String;
  };
}

export interface OrderPackDatum extends Struct.ComponentSchema {
  collectionName: 'components_order_pack_data';
  info: {
    displayName: 'Pack Datum';
  };
  attributes: {
    productIds: Schema.Attribute.JSON;
  };
}

export interface ProductPerfumeNote extends Struct.ComponentSchema {
  collectionName: 'components_product_perfume_notes';
  info: {
    displayName: 'Perfume Note';
  };
  attributes: {
    base: Schema.Attribute.JSON;
    middle: Schema.Attribute.JSON;
    top: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'marketing.promotion-rule': MarketingPromotionRule;
      'order.address': OrderAddress;
      'order.pack-datum': OrderPackDatum;
      'product.perfume-note': ProductPerfumeNote;
    }
  }
}
