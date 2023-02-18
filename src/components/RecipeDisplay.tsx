import {GregTechRecipe, InputItem, OutputItem, Recipe} from "../__generated__/graphql";
import {Box, Divider, Grid, SimpleGrid, Space, Stack, Text} from "@mantine/core";
import ItemStackDisplay, {itemToItemStackFull, outputItemToItemStackFull} from "./ItemStack";
import MultipleItemStackDisplay from "./MultipleItemStack";
import {groupBy} from "lodash";

interface RecipeDisplayProps {
    recipe: Recipe | undefined,
    onClick: (leftClick: boolean) => void,
}

const gregTechInfo = (gregtech: GregTechRecipe) => {
    return (
        <div>
            <Text>Tier: {gregtech.voltageTier}</Text>
            <Text>Voltage: {gregtech.voltage}</Text>
            <Text>Amperage: {gregtech.amperage}</Text>
            <Text>Duration: {gregtech.duration}</Text>
            {gregtech.requiresCleanroom && <Text>Requires Cleanroom</Text>}
            {gregtech.requiresLowGravity && <Text>Requires Low Gravity</Text>}
            {gregtech.additionalInfo && <Text>{gregtech.additionalInfo}</Text>}
        </div>
    )
}

const toOutputItem = (item: InputItem) => {
    return {
        key: item.key,
        probability: 1,
        itemStack: item.itemStack
    }
}

const buildGrid = (
    items: OutputItem[],
    width: number,
    height: number,
    onClick: (leftClick: boolean) => void
) => {
    // group items by items.key
    const groupedItems = groupBy(items, (item) => item.key);
    const maxKey = Math.max(...items.map((item) => item.key));

    return (
        <SimpleGrid cols={width} style={{width: 'fit-content'}}>
            {Array.from(Array(width * height).keys()).map((key) =>
                (groupedItems[key]? (<MultipleItemStackDisplay
                    items={groupedItems[key].map(outputItemToItemStackFull)} key={key}
                    onClick={onClick}/>) : <Space style={{width: '32px', height: '32px'}}/>) )}
        </SimpleGrid>
    )
}

const RecipeDisplay = ({recipe, onClick}: RecipeDisplayProps) => {
    if (recipe === undefined) return (<div>Select an item first</div>)

    return (
        <Stack>
            <Grid>
                <Grid.Col span={6} style={{width: "fit-content"}}>
                    {buildGrid(recipe.inputs.map(toOutputItem), recipe.recipeType.itemInputDimensionWidth, recipe.recipeType.itemOutputDimensionHeight, onClick)}
                </Grid.Col>
                <Grid.Col span={1}>
                    ➡
                </Grid.Col>
                <Grid.Col span={5}>
                    {buildGrid(recipe.outputs, recipe.recipeType.itemOutputDimensionWidth, recipe.recipeType.itemOutputDimensionHeight, onClick)}
                </Grid.Col>
            </Grid>
            <Divider my="sm" />
            <ItemStackDisplay item={itemToItemStackFull(recipe.recipeType.icon)} onClick={()=>{}}/>
            {recipe.gregTechRecipe && gregTechInfo(recipe.gregTechRecipe)}
            {recipe.recipeType.shapeless && <Text>Shapeless</Text>}
        </Stack>)
}

export default RecipeDisplay;
