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
    harvestedProducts: a.hasMany('HarvestedProduct', 'productId') // updated relationship field
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
    .sortKeys(["soldTo", "packagingSize"])
  .queryField("productPricesByProductId")]),
  Seed: a.model({
    id: a.id().required(),
    supplierName: a.string().required(),
    type: a.string().required(),
    variety: a.string().required(),
    dateAcquired: a.date().required(),
    quantityAcquired: a.integer().required(),
    quantityLeft: a.integer().required(),
    priceBoughtAt: a.float().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId')
  }),
  HarvestedProduct: a.model({
    id: a.id().required(), // added id field
    productId: a.id().required(), // added reference field
    product: a.belongsTo('Product', 'productId'),
    quantityHarvested: a.integer().required(),
    packaging: a.string().required(),
    dateOfHarvest: a.date().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId')
  }),
  MiscProduct: a.model({
    id: a.id().required(), // added id field
    type: a.string().required(),
    quantity: a.integer().required(),
    price: a.float().required(),
    description: a.string().required(),
    quantityLeft: a.integer().required(),
    inventoryId: a.id().required(), // added reference field
    inventory: a.belongsTo('Inventory', 'inventoryId')
  }),
  Inventory: a.model({
    id: a.id().required(), // added id field
    seeds: a.hasMany('Seed', 'inventoryId'), // added reference field
    products: a.hasMany('HarvestedProduct', 'inventoryId'), // added reference field
    misc: a.hasMany('MiscProduct', 'inventoryId') // added reference field
  })
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
