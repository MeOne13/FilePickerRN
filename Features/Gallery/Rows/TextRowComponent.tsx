import {OneRow, NoteRow} from "../Types/Rows";
import {View} from "react-native";
import {Image} from "expo-image";

interface TextRowComponentProps {
    row: NoteRow
}

export function TextRowComponent({row}: TextRowComponentProps) {
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