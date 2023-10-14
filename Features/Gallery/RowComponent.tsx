import {OneRow, Row, RowKind, ThreeRow, TwoRow} from "./Types/Rows";
import {View} from "react-native";
import {OneRowComponent} from "./Rows/OneRowComponent";
import {TwoRowComponent} from "./Rows/TwoRowComponent";
import {ThreeRowComponent} from "./Rows/ThreeRowComponent";

interface RowComponentProps {
    row: Row
}
const rowSelector = (rowToRender: Row)=>{
    switch (rowToRender.kind){
        case RowKind.One:
            return OneRowComponent({row: rowToRender as OneRow});
        case RowKind.Two:
            return TwoRowComponent({row: rowToRender as TwoRow});
        case RowKind.Three:
            return ThreeRowComponent({row: rowToRender as ThreeRow});
        case RowKind.Text:
            return ThreeRowComponent({row: rowToRender as ThreeRow});
        default:
            throw new Error('Not implemented');
    }
}
export function RowComponent({row}: RowComponentProps) {
    return (
        <View style={{height: row.rowHeight}}>
            {rowSelector(row)}
        </View>
    );
}