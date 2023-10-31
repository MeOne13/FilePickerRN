import {View} from "react-native";
import {Grouped, ImageEntry, POIEntry, VideoEntry} from "../Types/Items";
import {ImageTile} from "./ImageTile";
import {VideoTile} from "./VideoTile";
import {POITile} from "./POITile";
import MapLibreGL from "@maplibre/maplibre-react-native";
import Style = MapLibreGL.Style;

interface GalleryTileComponentProps {
    item: Grouped,
    tileFlex: number,
    // paddingLeft: number,
    // paddingRight: number
}

export function GalleryTile({item, tileFlex}: GalleryTileComponentProps) {
    return (
        <View style={{flex: tileFlex, padding: 3}}>
            {item instanceof ImageEntry &&
                <ImageTile source={item.compressedPath}/>}
            {item instanceof VideoEntry &&
                <VideoTile source={item.fullQualitySourcePath} thumbnailPath={item.thumbnailPath}/>}
            {item instanceof POIEntry &&
                <POITile title={item.title}/>}
        </View>
    );
}
