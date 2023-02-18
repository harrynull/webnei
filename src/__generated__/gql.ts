/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    fragment BasicItemInfo on Item {\n        id,\n        imageFilePath,\n        tooltip,\n        localizedName\n    }\n": types.BasicItemInfoFragmentDoc,
    "\n    query GetItems($query: String!, $limit: Int!) {\n        items(nameQuery: $query, limit: $limit) {\n            ...BasicItemInfo\n        }\n    }\n": types.GetItemsDocument,
    "\n    query GetRecipeByItemId($itemId: String!) {\n        items(itemId: $itemId, limit: 1) {\n            recipes {\n                id,\n                gregTechRecipe {\n                    id\n                    additionalInfo\n                    amperage\n                    duration\n                    requiresCleanroom\n                    requiresLowGravity\n                    voltage\n                    voltageTier\n                }\n                inputs {\n                    key\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                outputs {\n                    key\n                    probability\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                recipeType {\n                    category\n                    fluidInputDimensionHeight\n                    fluidInputDimensionWidth\n                    fluidOutputDimensionHeight\n                    fluidOutputDimensionWidth\n                    icon {\n                        ...BasicItemInfo\n                    }\n                    id\n                    itemInputDimensionHeight\n                    itemInputDimensionWidth\n                    itemOutputDimensionHeight\n                    itemOutputDimensionWidth\n                    shapeless\n                    type\n                }\n            }\n        }\n    }\n": types.GetRecipeByItemIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment BasicItemInfo on Item {\n        id,\n        imageFilePath,\n        tooltip,\n        localizedName\n    }\n"): (typeof documents)["\n    fragment BasicItemInfo on Item {\n        id,\n        imageFilePath,\n        tooltip,\n        localizedName\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetItems($query: String!, $limit: Int!) {\n        items(nameQuery: $query, limit: $limit) {\n            ...BasicItemInfo\n        }\n    }\n"): (typeof documents)["\n    query GetItems($query: String!, $limit: Int!) {\n        items(nameQuery: $query, limit: $limit) {\n            ...BasicItemInfo\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetRecipeByItemId($itemId: String!) {\n        items(itemId: $itemId, limit: 1) {\n            recipes {\n                id,\n                gregTechRecipe {\n                    id\n                    additionalInfo\n                    amperage\n                    duration\n                    requiresCleanroom\n                    requiresLowGravity\n                    voltage\n                    voltageTier\n                }\n                inputs {\n                    key\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                outputs {\n                    key\n                    probability\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                recipeType {\n                    category\n                    fluidInputDimensionHeight\n                    fluidInputDimensionWidth\n                    fluidOutputDimensionHeight\n                    fluidOutputDimensionWidth\n                    icon {\n                        ...BasicItemInfo\n                    }\n                    id\n                    itemInputDimensionHeight\n                    itemInputDimensionWidth\n                    itemOutputDimensionHeight\n                    itemOutputDimensionWidth\n                    shapeless\n                    type\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetRecipeByItemId($itemId: String!) {\n        items(itemId: $itemId, limit: 1) {\n            recipes {\n                id,\n                gregTechRecipe {\n                    id\n                    additionalInfo\n                    amperage\n                    duration\n                    requiresCleanroom\n                    requiresLowGravity\n                    voltage\n                    voltageTier\n                }\n                inputs {\n                    key\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                outputs {\n                    key\n                    probability\n                    itemStack {\n                        item {\n                            ...BasicItemInfo\n                        }\n                        stackSize\n                    }\n                }\n                recipeType {\n                    category\n                    fluidInputDimensionHeight\n                    fluidInputDimensionWidth\n                    fluidOutputDimensionHeight\n                    fluidOutputDimensionWidth\n                    icon {\n                        ...BasicItemInfo\n                    }\n                    id\n                    itemInputDimensionHeight\n                    itemInputDimensionWidth\n                    itemOutputDimensionHeight\n                    itemOutputDimensionWidth\n                    shapeless\n                    type\n                }\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;