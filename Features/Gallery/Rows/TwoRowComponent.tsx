import {View} from "react-native";
import {TwoRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";
import {Orientation} from "../Types/Items";

interface TwoRowComponentProps {
    row: TwoRow
}

export function TwoRowComponent({row}: TwoRowComponentProps) {
    const flexCount = 8;
    let rightTileFlex = 0;
    let leftTileFlex = 0;
    const leftEntry = row.entries[0];
    const rightEntry = row.entries[1];
    if (leftEntry.orientation === Orientation.Portrait) {
        if (rightEntry.orientation === Orientation.Landscape)
            leftTileFlex = 3;
        else
            leftTileFlex = 4;
    } else {
        if (rightEntry.orientation === Orientation.Portrait)
            leftTileFlex = 5;
        else
            leftTileFlex = 4;
    }
    rightTileFlex=flexCount-leftTileFlex;

    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, flex: 1}}>
            <GalleryTile item={leftEntry} tileFlex={leftTileFlex} />
            <GalleryTile item={rightEntry} tileFlex={rightTileFlex} />
        </View>
    );
}