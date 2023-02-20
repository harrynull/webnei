import {GregTechRecipe, InputItem, Item, OutputItem, Recipe} from "../__generated__/graphql";
import {Center, Flex, Grid, SimpleGrid, Stack, Text} from "@mantine/core";
import {EmptyItem, outputItemToItemStackFull} from "./ItemStack";
import MultipleItemStackDisplay from "./MultipleItemStack";
import {groupBy} from "lodash";

interface RecipeDisplayProps {
    recipe: Recipe | undefined,
    onClick: (leftClick: boolean, item: Item) => void,
}

const gregTechInfo = (gregtech: GregTechRecipe) => {
    return (
        <div>
            <Text>Voltage: {gregtech.voltage} EU/t ({gregtech.voltageTier})</Text>
            <Text>Amperage: {gregtech.amperage}</Text>
            <Text>Duration: {gregtech.duration/20} secs ({gregtech.duration} ticks)</Text>
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
                        onClick={onClick}/>) : <EmptyItem key={key}/>)
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
            <Center>
                <Stack style={{alignItems: 'center'}}>
                    {recipe.gregTechRecipe && gregTechInfo(recipe.gregTechRecipe)}
                </Stack>
            </Center>
        </Stack>)
}

export default RecipeDisplay;
