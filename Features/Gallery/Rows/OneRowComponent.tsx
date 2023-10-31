import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <View style={{flex: 1}}>
            <GalleryTile item={row.entry} tileFlex={1} paddingLeft={6} paddingRight={6}/>
        </View>
    );
}