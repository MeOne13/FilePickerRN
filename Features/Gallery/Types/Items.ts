//#region Items
import {Row} from "./Rows";
import uuid from "react-native-uuid";

export abstract class MediaEntry {
    protected constructor(guid: string, dateTaken: Date, dateOrder: Date | undefined) {
        if (guid === undefined) {
            guid = uuid.v4().toString();
        }
        if (dateOrder === undefined){
            dateOrder=dateTaken;
        }
        this.guid = guid;
        this.dateOrder = dateOrder;
        this.dateTaken = dateTaken;
    }

    guid: string;
    dateTaken: Date;
    dateOrder: Date;
}

export class ImageEntry extends MediaEntry {
    fullQualitySourcePath: string;
    compressedSourcePath: string;

    constructor(fullQualitySourcePath: string, compressedSourcePath: string, guid: string, dateTaken: Date, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.fullQualitySourcePath = fullQualitySourcePath;
        this.compressedSourcePath = compressedSourcePath;
    }
}

export class VideoEntry extends MediaEntry {
    fullQualitySourcePath: string;
    compressedSourcePath: string;
    thumbnailPath: string;

    constructor(source: string, kind: MediaKind = MediaKind.Image) {
        this.source = source;
        this.kind = kind;
    }
}

export class AudioEntry extends MediaEntry {
    constructor(track: string) {
        this.track = track;
    }

    track: string;
}

export class AchievementEntry extends MediaEntry {
    achievementUri: string;

    constructor(uri: string) {
        this.achievementUri = uri;
    }
}

export class POIEntry extends MediaEntry {
    Title: string;

    constructor(title: string) {
        this.Title = title;
    }
}

export class TextEntry extends MediaEntry {
    text: string

    constructor(author: string, text: string) {
        this.author = author;
        this.text = text;
    }
}

export class LocalityEntry extends MediaEntry {
    localityTitle: string

    constructor(cityTitle: string, transport: TransportType) {
        this.cityTitle = cityTitle;
        this.transport = transport;
    }
}


//#endregion Items

export type MediaItemsArray = (ImageEntry | TextEntry | CityEntry | AchievementEntry)[];
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

export enum MediaKind {
    Image,
    Video
}
