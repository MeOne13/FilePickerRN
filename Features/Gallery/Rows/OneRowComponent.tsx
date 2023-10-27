import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {VideoTile} from "../Tiles/VideoTile";
import {ImageTile} from "../Tiles/ImageTile";
import {EntryKind, ImageEntry, VideoEntry} from "../Types/Items";
import {GalleryTile} from "../Tiles/GalleryTile";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <View style={{flex: 1}}>
            <GalleryTile item={row.entry} tileFlex={1}/>
        </View>
    );
}