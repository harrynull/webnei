import {useState} from 'react'
import './App.css'
import {Center, Flex, Grid, ScrollArea, Stack, TextInput} from "@mantine/core";
import {gql} from "./__generated__";
import {useQuery} from "@apollo/client";
import ItemStackDisplay from "./components/ItemStack";
import {Item} from "./__generated__/graphql";
import {useDebouncedState, useElementSize} from "@mantine/hooks";
import {ItemRecipes} from "./components/ItemRecipes";
import {GRAPHQL_URL} from "./config";

const BASIC_ITEM_INFO = gql(/* GraphQL */`
    fragment BasicItemInfo on Item {
        id,
        imageFilePath,
        tooltip,
        localizedName
    }
`);

const GET_ITEMS = gql(/* GraphQL */`
    query GetItems($query: String!, $limit: Int!) {
        items(nameQuery: $query, limit: $limit) {
            ...BasicItemInfo
        }
    }
`);

const RECIPE_INFO = gql(/* GraphQL */`
    fragment RecipeInfo on Recipe {
        id,
        gregTechRecipe {
            id
            additionalInfo
            amperage
            duration
            requiresCleanroom
            requiresLowGravity
            voltage
            voltageTier
        }
        inputs {
            key
            itemStack {
                item {
                    ...BasicItemInfo
                }
                stackSize
            }
        }
        outputs {
            key
            probability
            itemStack {
                item {
                    ...BasicItemInfo
                }
                stackSize
            }
        }
        recipeType {
            category
            fluidInputDimensionHeight
            fluidInputDimensionWidth
            fluidOutputDimensionHeight
            fluidOutputDimensionWidth
            icon {
                ...BasicItemInfo
            }
            id
            itemInputDimensionHeight
            itemInputDimensionWidth
            itemOutputDimensionHeight
            itemOutputDimensionWidth
            shapeless
            type
        }
    }
`);

const GET_RECIPE_BY_ITEM_ID = gql(/* GraphQL */`
    query GetRecipeByItemId($itemId: String!) {
        items(itemId: $itemId, limit: 1) {
            recipes {
                ...RecipeInfo
            }
        }
    }
`);

const GET_USAGE_BY_ITEM_ID = gql(/* GraphQL */`
    query GetUsageByItemId($itemId: String!) {
        items(itemId: $itemId, limit: 1) {
            usages {
                ...RecipeInfo
            }
        }
    }
`);

function App() {
    const [query, setQuery] = useDebouncedState("", 500);
    const {data} = useQuery(
        GET_ITEMS,
        {variables: {query: `%${query}%`, limit: 500}}
    );
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [lookupMode, setLookupMode] = useState<"recipes" | "usage">("recipes");
    const {data: recipeData, loading} = useQuery(
        lookupMode=="recipes" ? GET_RECIPE_BY_ITEM_ID : GET_USAGE_BY_ITEM_ID, {variables: {itemId: selectedItem?.id ?? ''}}
    )

    function selectRecipe(leftClick: boolean, item: Item) {
        setSelectedItem(item)
        setLookupMode(leftClick ? "recipes" : "usage")
    }

    return (
        <Stack>
            <Grid>
                <Grid.Col span={7}>
                    <ItemRecipes items={recipeData?.items} lookupMode={lookupMode} loading={loading} onClick={selectRecipe}/>
                </Grid.Col>
                <Grid.Col span={5}>
                    <div style={{backgroundColor: "#efefef", padding: '10px'}}>
                        <ScrollArea style={{height: '80vh'}}>
                            <Flex
                                style={{width: '100%', marginBottom: '20px'}}
                                gap="sm"
                                justify="center"
                                align="center"
                                direction="row"
                                wrap="wrap"
                            >{data && data.items.map((item: Item) => (
                                <ItemStackDisplay key={item.id} item={item} onClick={selectRecipe}/>
                            ))}
                            </Flex>
                        </ScrollArea>
                        <TextInput
                            placeholder="Search for items..."
                            radius="md"
                            size="md"
                            style={{width: '100%'}}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                            withAsterisk
                        />
                    </div>
                </Grid.Col>
            </Grid>
            <Center style={{flexDirection: 'column'}}>
                <div>
                    Data exported from&nbsp;<a href="https://github.com/GTNewHorizons/GT-New-Horizons-Modpack">GTNH 2.2.8</a>&nbsp;with&nbsp;<a href="https://github.com/D-Cysteine/nesql-exporter">nesql-exporter</a> | <a href="https://github.com/harrynull/NEIGraphQL">Backend source code</a> | <a href={GRAPHQL_URL}>GraphQL endpoint</a> | <a href="https://github.com/harrynull/WebNEI">frontend source code</a>
                </div>
                <div>
                    <a href="https://harrynull.tech">made by harrynull</a>
                </div>
            </Center>
        </Stack>
    )
}

export default App
