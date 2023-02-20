import {Item} from "../__generated__/graphql";
import ItemStackDisplay, {ItemStackFull} from "./ItemStack";
import {useEffect, useState} from "react";
import { useInterval } from "@mantine/hooks";

interface MultipleItemStackDisplayProps {
    items: ItemStackFull[],
    onClick: ((leftClick: boolean, item: Item) => void) | undefined
}

const MultipleItemStackDisplay = ({items, onClick}: MultipleItemStackDisplayProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const interval = useInterval(() => {
        setCurrentIndex((curr) => (curr + 1) % items.length);
    }, 1000);
    useEffect(() => {interval.start(); return interval.stop}, []);
    const item = items[currentIndex];
    return (
        <ItemStackDisplay item={item} onClick={onClick}/>
    )
}
export default MultipleItemStackDisplay;