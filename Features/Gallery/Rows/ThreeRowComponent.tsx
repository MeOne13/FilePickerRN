import {View} from "react-native";
import {ThreeRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";
import {Orientation} from "../Types/Items";

interface ThreeRowComponentProps {
    row: ThreeRow
}

export function ThreeRowComponent({row}: ThreeRowComponentProps) {
    const leftEntry = row.entries[0];
    const middleEntry = row.entries[1];
    const rightEntry = row.entries[2];

    const leftTileFlex = leftEntry.orientation === Orientation.Landscape ? 5 : 3;
    const middleTileFlex = middleEntry.orientation === Orientation.Landscape ? 5 : 3;
    const rightTileFlex = rightEntry.orientation === Orientation.Landscape ? 5 : 3;
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            <GalleryTile item={row.entries[0]} tileFlex={leftTileFlex}/>
            <GalleryTile item={row.entries[1]} tileFlex={middleTileFlex}/>
            <GalleryTile item={row.entries[2]} tileFlex={rightTileFlex}/>
        </View>
    );
}