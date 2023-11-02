import {
    AudioRow,
    JournalRow,
    LocalityRow,
    MapRow,
    NoteRow,
    OneRow,
    OneTwoRow,
    RowKind,
    ThreeRow,
    TwoOneRow,
    TwoRow
} from "./Types/Rows";
import {View} from "react-native";
import {OneRowComponent} from "./Rows/OneRowComponent";
import {TwoRowComponent} from "./Rows/TwoRowComponent";
import {ThreeRowComponent} from "./Rows/ThreeRowComponent";
import {LocalityRowComponent} from "./Rows/LocalityRowComponent";
import {MapRowComponent} from "./Rows/MapRowComponent";
import {NoteRowComponent} from "./Rows/NoteRowComponent";
import {OneTwoRowComponent} from "./Rows/OneTwoRowComponent";
import {TwoOneRowComponent} from "./Rows/TwoOneRowComponent";

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
        case RowKind.TwoOne:
            return TwoOneRowComponent({row: rowToRender as TwoOneRow});
        case RowKind.OneTwo:
            return OneTwoRowComponent({row: rowToRender as OneTwoRow});
        case RowKind.Note:
        case RowKind.Audio:
            return NoteRowComponent({row: rowToRender.kind === RowKind.Note ? rowToRender as NoteRow : rowToRender as AudioRow});
        case RowKind.Locality:
            return LocalityRowComponent({row: rowToRender as LocalityRow});
        case RowKind.Map:
            return MapRowComponent({row: rowToRender as MapRow});
        default:
            break;
    }
}

export function RowComponent({row}: RowComponentProps) {
    return (
        <View style={{height: row.rowHeight, borderRadius: 5}}>
            {rowSelector(row)}
        </View>
    );
}