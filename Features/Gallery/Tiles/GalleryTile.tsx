import {DimensionValue, View} from "react-native";
import {EntryKind, Grouped, ImageEntry, VideoEntry} from "../Types/Items";
import {ImageTile} from "./ImageTile";
import {VideoTile} from "./VideoTile";

interface GalleryTileComponentProps {
    item: Grouped,
    tileFlex: number
}

export function GalleryTile({item, tileFlex}: GalleryTileComponentProps) {
    return (
        <View style={{flex: tileFlex}}>
            {item instanceof ImageEntry &&
            <ImageTile source={item.compressedPath}/>}
            {item instanceof VideoEntry &&
            <ImageTile source={item.fullQualitySourcePath}/>}
        </View>
    );
}
