//#region Items
import {Row} from "./Rows";

export class MediaItem {
    source: string;

    constructor(source: string) {
        this.source = source;
    }
}

export class AchievementItem {
    achievementUri: string;

    constructor(uri: string) {
        this.achievementUri = uri;
    }
}

export class textItem {
    author: string
    text: string

    constructor(author: string, text: string) {
        this.author = author;
        this.text = text;
    }
}

export class CityItem {
    cityTitle: string
    transport: TransportType

    constructor(cityTitle: string, transport: TransportType) {
        this.cityTitle = cityTitle;
        this.transport = transport;
    }
}

export class AudioItem {
    constructor(track: string) {
        this.track = track;
    }
    track: string;
}

//#endregion Items

export type MediaItemsArray = (MediaItem | textItem | CityItem | AchievementItem)[];
// export type MediaItemsArray = (MediaItem | textItem | CityItem | AchievmentItem)[];
export type MediaRowsArray = (Row)[];

export enum TransportType {
    Vehicle,
    Bike,
    PersonalMobility
}

export enum Direction {
    rtl,
    ltr
}
