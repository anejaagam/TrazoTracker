import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Product: a.model({
    id: a.id().required(),
    type: a.string().required(),
    name: a.string().required(),
    packagingSizes: a.string().array().required(),
    productPrices: a.hasMany('Prices', 'productId'), // updated relationship field
    harvestedProducts: a.hasMany('HarvestedProduct', 'productId'), // updated relationship field
    orders: a.hasMany('Order', 'productId') // updated relationship field
  }).identifier(['id']),
  Prices: a.model({
    id: a.id().required(), // added id field
    productId: a.id().required(),
    product: a.belongsTo('Product', 'productId'),
    soldTo: a.enum(['FOODSERVICE', 'RETAIL']),
    packagingSize: a.string().required(),
    price: a.float().required()
  }).secondaryIndexes((index) =>[
    index("productId")
    .sortKeys(["soldTo", "packagingSize"]).queryField("productPricesByProductId").name("pricesByProductIdAndSoldToAndPackagingSize")]),
  Seed: a.model({
    id: a.id().required(),
    supplierName: a.string().required(),
    variety: a.string().required(),
    dateAcquired: a.date().required(),
    quantityAcquired: a.integer().required(),
    quantityLeft: a.integer().required(),
    priceBoughtAt: a.float().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId')
  }).identifier(['id']),
  HarvestedProduct: a.model({
    id: a.id().required(), // added id field
    productId: a.id().required(), // added reference field
    product: a.belongsTo('Product', 'productId'),
    quantityHarvested: a.integer().required(),
    quantityLeft: a.integer().required(),
    packaging: a.string().required(),
    dateOfHarvest: a.date().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId')
  }),
  MiscProduct: a.model({
    id: a.id().required(), // added id field
    type: a.enum(['FERTILIZER', 'SOIL', 'GROWINGMATERIAL','PACKINGMATERIAL']),
    quantity: a.integer().required(),
    price: a.float().required(),
    description: a.string().required(),
    quantityLeft: a.integer().required(),
    dateAcquired: a.date().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId'),
    supplierName: a.string().required()
  }),
  Inventory: a.model({
    id: a.id().required(), // added id field
    seeds: a.hasMany('Seed', 'inventoryId'), // added reference field
    products: a.hasMany('HarvestedProduct', 'inventoryId'), // added reference field
    misc: a.hasMany('MiscProduct', 'inventoryId') // added reference field
  }),
  Customer: a.model({
    id: a.id().required(),
    brand: a.string().required(),
    locationName: a.string().required(),
    contactName: a.string().required(),
    contactNumber: a.string().required(),
    contactEmail: a.string().required(),
    deliveryMethods: a.string().array(),
    deliveryAddress: a.string().required(),
    customerType: a.enum(['FOODSERVICE', 'RETAIL']),
    notes: a.string().required(),
    orders: a.hasMany('Order', 'customerId'), // added reference field
    delivery: a.hasMany('Delivery', 'customerId') // added reference field
  }).identifier(['id']),
  Order: a.model({
    id: a.id().required(), // added id field
    customerId: a.id().required(), // added reference field
    customer: a.belongsTo('Customer', 'customerId'),
    productId: a.id().required(), // added reference field
    product: a.belongsTo('Product', 'productId'),
    quantity: a.integer(),
    price: a.float(),
    packagingSize: a.string().required(),
    status: a.enum(['PRE', 'GROWING','HARVESTED', 'DELIVERED']),
    orderDate: a.date().required(),
    deliveryDate: a.date().required(),
    deliverMethod: a.enum(['DIRECT', 'GFS', 'OTHER']),
    notes: a.string()
  }).identifier(['id']).secondaryIndexes((index) =>[
    index("customerId")
    .queryField("ordersByCustomerId"),
    index("deliveryDate")
    .queryField("ordersByDeliveryDate")
  ]),
  Delivery: a.model({
    id: a.id().required(), // added id field
    orders: a.id().array(), // added reference field
    deliveryDate: a.date().required(),
    deliveryMethod: a.enum(['DIRECT', 'GFS', 'OTHER']),
    customerId: a.id().required(), // added reference field
    customer: a.belongsTo('Customer', 'customerId'),
    notes: a.string(),
  }).identifier(['id']).secondaryIndexes((index) =>[
    index("customerId")
    .sortKeys(["deliveryDate"])
    .queryField("deliveryByCustomerId"),
    index("deliveryDate")
    .queryField("deliveryByDeliveryDate"),
    index("customerId")
    .queryField("deliveryByCustomer")

  ]),
  })
.authorization(allow => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>