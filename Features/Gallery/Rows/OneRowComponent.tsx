import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {MediaKind} from "../Types/Items";
import {VideoTile} from "../Tiles/VideoTile";
import {ImageTile} from "../Tiles/ImageTile";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <View style={{flex: 1}}>
            {
                row.Item.kind === MediaKind.Image &&
                <ImageTile
                    source={row.Item.source}
                    // height={400}
                    // width={400}
                />}
            {row.Item.kind === MediaKind.Video &&
                <VideoTile
                    source={row.Item.source}
                    // height={400}
                    // width={400}
                />}
        </View>
    );
}