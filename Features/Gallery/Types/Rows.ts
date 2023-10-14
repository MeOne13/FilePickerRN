import {AchievementItem, AudioItem, CityItem, Direction, MediaItem, MediaItemsArray, textItem} from "./Items";

export class Row {
    constructor(rowHeight: number = 300, kind: RowKind = RowKind.Two) {
        this.rowHeight = rowHeight;
        this.kind = kind;
    }

    readonly rowHeight: number;
    readonly kind: RowKind;
}

export class AchievementRow extends Row {
    constructor(achievements: AchievementItem[], media: MediaItem) {
        super();
        this.achievements = achievements;
        this.media = media;
    }

    achievements: AchievementItem[];
    media: MediaItem;
}

export class CityRow extends Row {
    cityMark: CityItem;

    constructor(city: CityItem) {
        super();
        this.cityMark = city;
    }
}

export class TextRow extends Row {
    constructor(text: textItem) {
        super(300, RowKind.Text);
        this.textMark = text;
    }

    textMark: textItem;
}

export class AudioRow extends Row {
    constructor(audio: AudioItem) {
        super(100, RowKind.Audio);
        this.audioTrack = audio;
    }

    audioTrack: AudioItem;
}

export class OneRow extends Row {
    constructor(items: MediaItemsArray) {
        super(400, RowKind.One);
        const medias = items.map(i => i as MediaItem);
        if (medias.length < 1)
            throw new Error('Not enough items in medias array');
        this.Item = medias[0];
    }

    Item: MediaItem;
}

export class TwoRow extends Row {
    constructor(items: MediaItemsArray) {
        super(250, RowKind.Two);
        const medias = items.map(i => i as MediaItem);
        if (medias.length < 2)
            throw new Error('Not enough items in medias array');
        this.Items = medias;
    }

    Items: MediaItem[];
}

export class OneTwoRow extends Row {
    constructor(items: MediaItemsArray) {
        super(300, RowKind.OneTwo);
        const medias = items.map(i => i as MediaItem);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        this.Big = medias[0] as MediaItem;
        this.TopSmall = medias[1] as MediaItem;
        this.BottomSmall = medias[2] as MediaItem;
    }

    Big: MediaItem;
    TopSmall: MediaItem;
    BottomSmall: MediaItem;
}

export class TwoOneRow extends Row {
    constructor(items: MediaItemsArray) {
        const medias = items.map(i => i as MediaItem);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        super(300, RowKind.TwoOne);
        this.Big = medias[2] as MediaItem;
        this.TopSmall = medias[1] as MediaItem;
        this.BottomSmall = medias[0] as MediaItem;
    }

    Big: MediaItem;
    TopSmall: MediaItem;
    BottomSmall: MediaItem;
}

export class ThreeRow extends Row {
    constructor(items: MediaItemsArray) {
        super(150, RowKind.Three);
        const medias = items.map(i => i as MediaItem);
        if (medias.length < 3)
            throw new Error('Not enough items in medias array');
        this.Items = medias;
    }

    Items: MediaItem[];
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