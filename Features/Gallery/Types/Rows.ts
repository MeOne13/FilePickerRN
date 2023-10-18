import {AchievementEntry, AudioEntry, CityEntry, Direction, ImageEntry, MediaItemsArray, TextEntry} from "./Items";

export class Row {
    constructor(rowHeight: number = 300, kind: RowKind = RowKind.Two) {
        this.rowHeight = rowHeight;
        this.kind = kind;
    }

    readonly rowHeight: number;
    readonly kind: RowKind;
}

export class AchievementRow extends Row {
    constructor(achievements: AchievementEntry[], media: ImageEntry) {
        super();
        this.achievements = achievements;
        this.media = media;
    }

    achievements: AchievementEntry[];
    media: ImageEntry;
}

export class CityRow extends Row {
    cityMark: CityEntry;

    constructor(city: CityEntry) {
        super();
        this.cityMark = city;
    }
}

export class TextRow extends Row {
    constructor(text: TextEntry) {
        super(300, RowKind.Text);
        this.textMark = text;
    }

    textMark: TextEntry;
}

export class AudioRow extends Row {
    constructor(audio: AudioEntry) {
        super(100, RowKind.Audio);
        this.audioTrack = audio;
    }

    audioTrack: AudioEntry;
}

export class OneRow extends Row {
    constructor(items: MediaItemsArray) {
        super(400, RowKind.One);
        const medias = items.map(i => i as ImageEntry);
        if (medias.length < 1)
            throw new Error('Not enough items in medias array');
        this.Item = medias[0];
    }

    Item: ImageEntry;
}

export class TwoRow extends Row {
    constructor(items: MediaItemsArray) {
        super(250, RowKind.Two);
        const medias = items.map(i => i as ImageEntry);
        if (medias.length < 2)
            throw new Error('Not enough items in medias array');
        this.Items = medias;
    }

    Items: ImageEntry[];
}

export class OneTwoRow extends Row {
    constructor(items: MediaItemsArray) {
        super(300, RowKind.OneTwo);
        const medias = items.map(i => i as ImageEntry);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        this.Big = medias[0] as ImageEntry;
        this.TopSmall = medias[1] as ImageEntry;
        this.BottomSmall = medias[2] as ImageEntry;
    }

    Big: ImageEntry;
    TopSmall: ImageEntry;
    BottomSmall: ImageEntry;
}

export class TwoOneRow extends Row {
    constructor(items: MediaItemsArray) {
        const medias = items.map(i => i as ImageEntry);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        super(300, RowKind.TwoOne);
        this.Big = medias[2] as ImageEntry;
        this.TopSmall = medias[1] as ImageEntry;
        this.BottomSmall = medias[0] as ImageEntry;
    }

    Big: ImageEntry;
    TopSmall: ImageEntry;
    BottomSmall: ImageEntry;
}

export class ThreeRow extends Row {
    constructor(items: MediaItemsArray) {
        super(150, RowKind.Three);
        const medias = items.map(i => i as ImageEntry);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        this.Items = medias;
    }

    Items: ImageEntry[];
}


export enum RowKind {
    One,
    Two,
    Three,
    OneTwo,
    TwoOne,
    Audio,
    Map,
    Locaity,
    Text,
    Achievement,

}