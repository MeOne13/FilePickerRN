import {View} from "react-native";
import {Grouped, ImageEntry, POIEntry, VideoEntry} from "../Types/Items";
import {ImageTile} from "./ImageTile";
import {VideoTile} from "./VideoTile";
import {POITile} from "./POITile";

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
                <VideoTile source={item.fullQualitySourcePath}/>}
            {item instanceof POIEntry &&
                <POITile title={item.title}/>}
        </View>
    );
}
