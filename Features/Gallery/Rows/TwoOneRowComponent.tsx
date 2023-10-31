import {View} from "react-native";
import {ThreeRow} from "../Types/Rows";
import {GalleryTile} from "../Tiles/GalleryTile";
import {Orientation, VideoEntry} from "../Types/Items";

interface TwoOneRowComponentProps {
    row: ThreeRow
}

export function TwoOneRowComponent({row}: TwoOneRowComponentProps) {
    const big = row.entries[2];
    const tSmall = row.entries[1];
    const bSmall = row.entries[0];

    const bigTileFlex = big instanceof VideoEntry ? 3 : 4;
    const smallColumnFlex = 6 - bigTileFlex;

    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            <View style={{flex: smallColumnFlex, flexDirection: 'column'}}>
                <GalleryTile item={tSmall} tileFlex={1}/>
                <GalleryTile item={bSmall} tileFlex={1}/>
            </View>
            <View style={{flex: bigTileFlex}}>
                <GalleryTile item={big} tileFlex={1}/>
            </View>
        </View>
    );
}