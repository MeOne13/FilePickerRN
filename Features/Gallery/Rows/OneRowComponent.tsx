import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";

interface OneRowComponentProps {
    row: OneRow
}

export function OneRowComponent({row}: OneRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            {row.Item && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width:400, height: row.rowHeight,}}
                source={{uri: row.Item.source}}
            />}
        </View>
    );
}