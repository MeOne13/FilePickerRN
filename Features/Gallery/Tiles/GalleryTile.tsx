import {DimensionValue, View} from "react-native";
import {EntryKind, ImageEntry} from "../Types/Items";
import {ImageTile} from "./ImageTile";
import {VideoTile} from "./VideoTile";

interface GalleryTileComponentProps {
    item: ImageEntry,
    width: DimensionValue
}

export function GalleryTile({item, width = '100%'}: GalleryTileComponentProps) {
    return (
        <View style={{flexDirection: 'row', width: width}}>
            {item.kind === EntryKind.Image &&
            <ImageTile source={item.compressedPath}/>}
            {item.kind === EntryKind.Video &&
            <VideoTile source={item.fullQualityPath}/>}
        </View>
    );
}
