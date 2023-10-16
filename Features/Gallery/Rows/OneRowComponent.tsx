import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {MediaKind} from "../Types/Items";
import {VideoTileComponent} from "../Tiles/VideoTile";
import {ImageTileComponent} from "../Tiles/ImageTile";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            {
                row.Item.kind === MediaKind.image &&
                <ImageTileComponent
                    source={row.Item.source}
                    height={400}
                    width={400}
                />}
            {row.Item.kind === MediaKind.video &&
                <VideoTileComponent
                    source={row.Item.source}
                    height={400}
                    width={400}
                />}
        </View>
    );
}