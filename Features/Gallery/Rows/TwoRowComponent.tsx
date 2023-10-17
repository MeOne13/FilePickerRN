import {Image} from "expo-image";
import {View} from "react-native";
import {TwoRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";

interface TwoRowComponentProps {
    row: TwoRow
}

export function TwoRowComponent({row}: TwoRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, flex: 1}}>
            <GalleryTile item={row.Items[0]} width={'70%'}/>
            <GalleryTile item={row.Items[0]} width={'30%'}/>
        </View>
    );
}