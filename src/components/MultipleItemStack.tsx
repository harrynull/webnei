import {HoverCard, Button, Avatar, Text, Group, Box} from '@mantine/core';
import {Item} from "../__generated__/graphql";
import {IMAGE_BASE_URL} from "../config";
import ItemStackDisplay, {ItemStackFull} from "./ItemStack";

interface MultipleItemStackDisplayProps {
    items: ItemStackFull[],
    onClick: ((leftClick: boolean) => void) | undefined
}

const MultipleItemStackDisplay = ({items, onClick}: MultipleItemStackDisplayProps) => {
    return (
        <ItemStackDisplay item={items[0]} onClick={onClick}/>
    )
}
export default MultipleItemStackDisplay;