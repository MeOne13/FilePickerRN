import {DimensionValue, View} from "react-native";
import {MediaItem, MediaKind} from "../Types/Items";
import {ImageTile} from "./ImageTile";
import {VideoTile} from "./VideoTile";

interface GalleryTileComponentProps {
    item: MediaItem,
    width: DimensionValue
}

export function GalleryTile({item, width = '100%'}: GalleryTileComponentProps) {
    return (
        <View style={{flexDirection: 'row', width: width}}>
            {item.kind === MediaKind.Image &&
            <ImageTile source={item.source}/>}
            {item.kind === MediaKind.Video &&
            <VideoTile source={item.source}/>}
        </View>
    );
}
