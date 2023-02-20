import RecipeDisplay from "./RecipeDisplay";
import {Item} from "../__generated__/graphql";
import {Divider, Tabs} from "@mantine/core";
import {groupBy} from "lodash";
import ItemStackDisplay, {itemToItemStackFull} from "./ItemStack";


interface ItemRecipesProps {
    items: Item[] | undefined;
    lookupMode: "recipes" | "usage";
    loading: boolean;
    onClick: (leftClick: boolean, item: Item) => void;
}

export const ItemRecipes = ({items, lookupMode, loading, onClick}: ItemRecipesProps) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    const recipes = lookupMode === "recipes" ? items?.at(0)?.recipes : items?.at(0)?.usages;

    if (recipes === undefined) {
        return <div>Nothing to see here...</div>;
    }

    const groupedRecipes = groupBy(recipes, (recipe) => recipe.recipeType!!.id);
    const recipeTypeIdToIcon = new Map<string, Item>();
    recipes.forEach((recipe) => {
        recipeTypeIdToIcon.set(recipe.recipeType!!.id, recipe.recipeType!!.icon!!);
    });
    return (
        <Tabs variant="pills" radius="xl" defaultValue={Object.keys(groupedRecipes)[0]}>
            <Tabs.List>
                {
                    Object.keys(groupedRecipes).map((recipeTypeId) =>
                        (<Tabs.Tab key={recipeTypeId}
                            value={recipeTypeId}
                            icon={(<ItemStackDisplay item={recipeTypeIdToIcon.get(recipeTypeId)!!} onClick={onClick}/>)}>
                                {recipeTypeIdToIcon.get(recipeTypeId)!!.localizedName}
                            </Tabs.Tab>
                        )
                    )
                }
            </Tabs.List>
            {
                Object.keys(groupedRecipes).map((recipeTypeId) => (
                <Tabs.Panel value={recipeTypeId} pt="xs" key={recipeTypeId}>
                {
                    groupedRecipes[recipeTypeId].map((recipe) => (
                        <>
                            <RecipeDisplay recipe={recipe} onClick={onClick}/>
                            <Divider my="sm" />
                        </>))
                }
                </Tabs.Panel>
                ))
            }
        </Tabs>
    )
    /*
    return (<RecipeDisplay
        recipe={recipes?.at(0)}
        onClick={(leftClick, item) => selectRecipe(leftClick, item)}
    />);*/
}
