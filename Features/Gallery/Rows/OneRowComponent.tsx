import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <GalleryTile item={row.entry} tileFlex={1}/>
    );
}