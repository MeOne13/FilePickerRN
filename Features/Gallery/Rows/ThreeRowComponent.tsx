import {Image} from "expo-image";
import {View} from "react-native";
import {ThreeRow, TwoRow} from "../Types/Rows";

interface ThreeRowComponentProps {
    row: ThreeRow
}

export function ThreeRowComponent({row}: ThreeRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            {row.Items[0] && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: 133, height: row.rowHeight,}}
                source={{uri: row.Items[0].source}}
            />}
            {row.Items[1] && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: 133, height: row.rowHeight,}}
                source={{uri: row.Items[1].source}}
            />}
            {row.Items[2] && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: 133, height: row.rowHeight,}}
                source={{uri: row.Items[2].source}}
            />}
        </View>
    );
}