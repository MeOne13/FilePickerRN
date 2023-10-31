import {View} from "react-native";
import {OneTwoRow, ThreeRow, TwoOneRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";
import {Orientation, VideoEntry} from "../Types/Items";

interface OneTwoRowComponentProps {
    row: OneTwoRow
}

export function OneTwoRowComponent({row}: OneTwoRowComponentProps) {
    const big = row.entries[0];
    const tSmall = row.entries[1];
    const bSmall = row.entries[2];

    const bigTileFlex = big instanceof VideoEntry ? 3 : 4;
    const smallColumnFlex = 6 - bigTileFlex;

    return (
        <View style={{flexDirection: 'row', height: row.rowHeight}}>
            <View style={{flex: bigTileFlex}}>
                <GalleryTile item={big} tileFlex={1} />
            </View>
            <View style={{flex: smallColumnFlex, flexDirection: 'column'}}>
                <GalleryTile item={tSmall} tileFlex={1} />
                <GalleryTile item={bSmall} tileFlex={1} />
            </View>
        </View>
    );
}