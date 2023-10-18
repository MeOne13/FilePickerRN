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
                row.entry.kind === MediaKind.Image &&
                <ImageTile
                    source={row.entry.source}
                    // height={400}
                    // width={400}
                />}
            {row.entry.kind === MediaKind.Video &&
                <VideoTile
                    source={row.entry.source}
                    // height={400}
                    // width={400}
                />}
        </View>
    );
}