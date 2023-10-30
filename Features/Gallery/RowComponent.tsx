import {AudioRow, JournalRow, LocalityRow, MapRow, NoteRow, OneRow, RowKind, ThreeRow, TwoRow} from "./Types/Rows";
import {View} from "react-native";
import {OneRowComponent} from "./Rows/OneRowComponent";
import {TwoRowComponent} from "./Rows/TwoRowComponent";
import {ThreeRowComponent} from "./Rows/ThreeRowComponent";
import {LocalityRowComponent} from "./Rows/LocalityRowComponent";
import {MapRowComponent} from "./Rows/MapRowComponent";
import {AudioRowComponent} from "./Rows/AudioRowComponent";
import {NoteRowComponent} from "./Rows/NoteRowComponent";

interface RowComponentProps {
    row: JournalRow
}

const rowSelector = (rowToRender: JournalRow) => {
    switch (rowToRender.kind) {
        case RowKind.One:
            return OneRowComponent({row: rowToRender as OneRow});
        case RowKind.Two:
            return TwoRowComponent({row: rowToRender as TwoRow});
        case RowKind.Three:
            return ThreeRowComponent({row: rowToRender as ThreeRow});
        case RowKind.Note:
            return NoteRowComponent({row: rowToRender as NoteRow});
        case RowKind.Locality:
            return LocalityRowComponent({row: rowToRender as LocalityRow});
        case RowKind.Map:
            return MapRowComponent({row: rowToRender as MapRow});
        case RowKind.Audio:
            return AudioRowComponent({row: rowToRender as AudioRow});
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