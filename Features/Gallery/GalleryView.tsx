import {JournalRow} from "./Types/Rows";
import {View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {RowComponent} from "./RowComponent";

interface GalleryComponentProps {
    rows: JournalRow[]
}

export function GalleryView({rows}: GalleryComponentProps) {
    return (
        <View style={{flex: 1}}>
            <FlashList
                disableHorizontalListHeightMeasurement={true}
                drawDistance={500}
                estimatedItemSize={300}
                data={rows}
                renderItem={({item, index}) => RowComponent({row: item})}
            />
        </View>
    );
}