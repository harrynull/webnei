import {useState} from 'react'
import './App.css'
import {Flex, Grid, TextInput} from "@mantine/core";
import {useDebounce} from "use-debounce";
import {gql} from "./__generated__";
import {useQuery} from "@apollo/client";
import ItemStackDisplay, {itemToItemStackFull} from "./components/ItemStack";
import {Item} from "./__generated__/graphql";
import RecipeDisplay from "./components/RecipeDisplay";

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

const GET_RECIPE_BY_ITEM_ID = gql(/* GraphQL */`
    query GetRecipeByItemId($itemId: String!) {
        items(itemId: $itemId, limit: 1) {
            recipes {
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
        }
    }
`);

function App() {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);
    const {data} = useQuery(
        GET_ITEMS,
        {variables: {query: `%${debouncedQuery}%`, limit: 50}}
    );
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const {data: recipeData} = useQuery(
        GET_RECIPE_BY_ITEM_ID, {variables: {itemId: selectedItem?.id ?? ''}}
    );

    function selectRecipe(leftClick: boolean, item: Item) {
        setSelectedItem(item)
    }

    return (
        <Grid>
            <Grid.Col span={7}>
                <RecipeDisplay recipe={recipeData?.items?.at(0)?.recipes?.at(0)}/>
            </Grid.Col>
            <Grid.Col span={5}>
                <div style={{backgroundColor: "#efefef", padding: '10px'}}>
                    <div style={{}}>
                        <Flex
                            style={{width: '100%', marginBottom: '20px'}}
                            gap="sm"
                            justify="left"
                            align="top"
                            direction="row"
                            wrap="wrap"
                        >{data && data.items.map((item: Item) => (
                            <ItemStackDisplay key={item.id} item={itemToItemStackFull(item)} onClick={(leftClick)=>selectRecipe(leftClick, item)}/>
                        ))}
                        </Flex>
                    </div>
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
    )
}

export default App
