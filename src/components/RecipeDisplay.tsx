import {GregTechRecipe, InputItem, Item, OutputItem, Recipe} from "../__generated__/graphql";
import {Box, Center, Divider, Flex, Grid, SimpleGrid, Space, Stack, Text} from "@mantine/core";
import ItemStackDisplay, {EmptyItem, itemToItemStackFull, outputItemToItemStackFull} from "./ItemStack";
import MultipleItemStackDisplay from "./MultipleItemStack";
import {groupBy} from "lodash";
import {IMAGE_BASE_URL} from "../config";

interface RecipeDisplayProps {
    recipe: Recipe | undefined,
    onClick: (leftClick: boolean, item: Item) => void,
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
    onClick: (leftClick: boolean, item: Item) => void
) => {
    // group items by items.key
    const groupedItems = groupBy(items, (item) => item.key);
    return (
        <Flex align="center" justify="center" style={{height:"100%"}}>
            <SimpleGrid cols={width} style={{width: 'fit-content'}}>
                {Array.from(Array(width * height).keys()).map((key) =>
                    (groupedItems[key] ? (<MultipleItemStackDisplay
                        items={groupedItems[key].map(outputItemToItemStackFull)} key={key}
                        onClick={onClick}/>) : <EmptyItem/>)
                )}
            </SimpleGrid>
        </Flex>
    )
}

const RecipeDisplay = ({recipe, onClick}: RecipeDisplayProps) => {
    if (recipe === undefined) return (<div>Select an item first</div>)

    return (
        <Stack>
            <Grid>
                <Grid.Col span={6} style={{width: "fit-content"}}>
                    {buildGrid(recipe.inputs.map(toOutputItem), recipe.recipeType.itemInputDimensionWidth, recipe.recipeType.itemInputDimensionHeight, onClick)}
                </Grid.Col>
                <Grid.Col span={1}>
                    <Flex align="center" style={{height: "100%"}}><Text>➡</Text></Flex>
                </Grid.Col>
                <Grid.Col span={5}>
                    {buildGrid(recipe.outputs, recipe.recipeType.itemOutputDimensionWidth, recipe.recipeType.itemOutputDimensionHeight, onClick)}
                </Grid.Col>
            </Grid>
            <Divider my="sm" />
            <Center>
                <Stack style={{alignItems: 'center'}}>
                    <ItemStackDisplay item={itemToItemStackFull(recipe.recipeType.icon)} onClick={(leftClick)=>onClick(leftClick, recipe.recipeType.icon)}/>
                    <Text>Crafted with: {recipe.recipeType.icon.localizedName}</Text>
                    {recipe.gregTechRecipe && gregTechInfo(recipe.gregTechRecipe)}
                    {recipe.recipeType.shapeless && <Text>Shapeless</Text>}
                </Stack>
            </Center>
        </Stack>)
}

export default RecipeDisplay;
