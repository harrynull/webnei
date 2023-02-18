/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The Long scalar type represents a signed 64-bit numeric non-fractional value */
  Long: any;
  /** The Short scalar type represents a signed 16-bit numeric non-fractional value */
  Short: any;
};

export type GregTechRecipe = {
  additionalInfo: Scalars['String'];
  amperage: Scalars['Int'];
  duration: Scalars['Int'];
  id: Scalars['String'];
  recipeId: Scalars['String'];
  requiresCleanroom: Scalars['Boolean'];
  requiresLowGravity: Scalars['Boolean'];
  voltage: Scalars['Int'];
  voltageTier: Scalars['String'];
};

export type InputItem = {
  __typename?: 'InputItem';
  itemStack: ItemStack;
  key: Scalars['Int'];
};

/** Minecraft Item */
export type Item = {
  id: Scalars['String'];
  imageFilePath: Scalars['String'];
  internalName: Scalars['String'];
  itemDamage: Scalars['Int'];
  itemId: Scalars['Int'];
  localizedName: Scalars['String'];
  maxDamage: Scalars['Int'];
  maxStackSize: Scalars['Int'];
  modId: Scalars['String'];
  nbt: Scalars['String'];
  recipes: Array<Recipe>;
  tooltip: Scalars['String'];
  unlocalizedName: Scalars['String'];
  usages: Array<Recipe>;
};

export type ItemStack = {
  __typename?: 'ItemStack';
  item: Item;
  stackSize: Scalars['Int'];
};

export type OutputItem = {
  __typename?: 'OutputItem';
  itemStack: ItemStack;
  key: Scalars['Int'];
  probability: Scalars['Float'];
};

/** Query object */
export type Query = {
  __typename?: 'Query';
  items: Array<Item>;
};


/** Query object */
export type QueryItemsArgs = {
  itemId?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  nameQuery?: InputMaybe<Scalars['String']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  gregTechRecipe?: Maybe<GregTechRecipe>;
  id: Scalars['String'];
  inputs: Array<InputItem>;
  outputs: Array<OutputItem>;
  recipeType: RecipeType;
};

export type RecipeType = {
  category: Scalars['String'];
  fluidInputDimensionHeight: Scalars['Int'];
  fluidInputDimensionWidth: Scalars['Int'];
  fluidOutputDimensionHeight: Scalars['Int'];
  fluidOutputDimensionWidth: Scalars['Int'];
  icon: Item;
  iconId: Scalars['String'];
  iconInfo: Scalars['String'];
  id: Scalars['String'];
  itemInputDimensionHeight: Scalars['Int'];
  itemInputDimensionWidth: Scalars['Int'];
  itemOutputDimensionHeight: Scalars['Int'];
  itemOutputDimensionWidth: Scalars['Int'];
  shapeless: Scalars['Boolean'];
  type: Scalars['String'];
};

export type BasicItemInfoFragment = {};

export type GetItemsQueryVariables = Exact<{
  query: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<never> };

export type GetRecipeByItemIdQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type GetRecipeByItemIdQuery = { __typename?: 'Query', items: Array<never> };

export const BasicItemInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicItemInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Item"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageFilePath"}},{"kind":"Field","name":{"kind":"Name","value":"tooltip"}},{"kind":"Field","name":{"kind":"Name","value":"localizedName"}}]}}]} as unknown as DocumentNode<BasicItemInfoFragment, unknown>;
export const GetItemsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nameQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicItemInfo"}}]}}]}},...BasicItemInfoFragmentDoc.definitions]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const GetRecipeByItemIdDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipeByItemId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gregTechRecipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"additionalInfo"}},{"kind":"Field","name":{"kind":"Name","value":"amperage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requiresCleanroom"}},{"kind":"Field","name":{"kind":"Name","value":"requiresLowGravity"}},{"kind":"Field","name":{"kind":"Name","value":"voltage"}},{"kind":"Field","name":{"kind":"Name","value":"voltageTier"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inputs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"itemStack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicItemInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stackSize"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"outputs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"probability"}},{"kind":"Field","name":{"kind":"Name","value":"itemStack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicItemInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stackSize"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipeType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fluidInputDimensionHeight"}},{"kind":"Field","name":{"kind":"Name","value":"fluidInputDimensionWidth"}},{"kind":"Field","name":{"kind":"Name","value":"fluidOutputDimensionHeight"}},{"kind":"Field","name":{"kind":"Name","value":"fluidOutputDimensionWidth"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicItemInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemInputDimensionHeight"}},{"kind":"Field","name":{"kind":"Name","value":"itemInputDimensionWidth"}},{"kind":"Field","name":{"kind":"Name","value":"itemOutputDimensionHeight"}},{"kind":"Field","name":{"kind":"Name","value":"itemOutputDimensionWidth"}},{"kind":"Field","name":{"kind":"Name","value":"shapeless"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}},...BasicItemInfoFragmentDoc.definitions]} as unknown as DocumentNode<GetRecipeByItemIdQuery, GetRecipeByItemIdQueryVariables>;