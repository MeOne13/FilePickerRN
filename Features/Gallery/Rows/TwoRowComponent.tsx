import {Image} from "expo-image";
import {View} from "react-native";
import {TwoRow} from "../Types/Rows";

interface TwoRowComponentProps {
    row: TwoRow
}

export function TwoRowComponent({row}: TwoRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            {row.Items[0] && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: 200, height: row.rowHeight,}}
                source={{uri: row.Items[0].source}}
            />}
            {row.Items[1] && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: 200, height: row.rowHeight,}}
                source={{uri: row.Items[1].source}}
            />}
        </View>
    );
}