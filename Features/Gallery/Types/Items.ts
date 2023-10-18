//#region Items
import {JournalRow} from "./Rows";
import uuid from "react-native-uuid";

export abstract class JournalEntry implements  Reacted, Commented{
    protected constructor(guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        if (guid === undefined) {
            guid = uuid.v4().toString();
        }
        if (dateTaken === undefined) {
            const utcSeconds = Date.now();
            dateTaken = new Date(0);
            dateTaken.setUTCSeconds(utcSeconds);
        }
        if (dateOrder === undefined) {
            dateOrder = dateTaken;
        }
        this.guid = guid;
        this.dateOrder = dateOrder;
        this.dateTaken = dateTaken;
    }
    author: User = new User();
    guid: string;
    dateTaken: Date;
    dateOrder: Date;
    comments: Comment[] | undefined = undefined;
    reactions: Reaction[] | undefined = undefined;
    kind: EntryKind = EntryKind.Image;
}

export interface Commented {
    comments: Comment[] | undefined;
}

export interface Reacted {
    reactions: Reaction[] | undefined;
}
export interface Oriented {
    orientation: Orientation;
}

export class ImageEntry extends JournalEntry implements Oriented{
    fullQualitySourcePath: string;
    compressedSourcePath: string;
    orientation: Orientation;

    constructor(fullQualitySourcePath: string, compressedSourcePath: string, orientation: Orientation = Orientation.Portrait, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.fullQualitySourcePath = fullQualitySourcePath;
        this.compressedSourcePath = compressedSourcePath;
        this.kind = EntryKind.Image;
        this.orientation = orientation;
    }
}

export class VideoEntry extends JournalEntry implements Oriented {
    fullQualitySourcePath: string;
    compressedSourcePath: string;
    thumbnailPath: string;
    orientation: Orientation;

    constructor(fullQualitySourcePath: string, compressedSourcePath: string, thumbnailPath: string, orientation: Orientation = Orientation.Portrait, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.fullQualitySourcePath = fullQualitySourcePath;
        this.compressedSourcePath = compressedSourcePath;
        this.thumbnailPath = thumbnailPath;
        this.kind = EntryKind.Video;
        this.orientation = orientation;
    }
}

export class AudioEntry extends JournalEntry {
    trackPath: string;
    constructor(trackPath: string, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.trackPath = trackPath;
        this.kind = EntryKind.Audio;
    }
}

export class AchievementEntry extends JournalEntry {
    title: string;

    constructor(title: string, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.title = title;
        this.kind = EntryKind.Achievement;
    }
}

export class POIEntry extends JournalEntry {
    title: string;

    constructor(title: string, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.title = title;
        this.kind = EntryKind.POI;
    }
}

export class NoteEntry extends JournalEntry {
    text: string

    constructor(text: string, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.text = text;
        this.kind = EntryKind.Note;
    }
}

export class LocalityEntry extends JournalEntry {
    title: string;
    transport: TransportType;

    constructor(title: string,transport: TransportType = TransportType.Vehicle, guid: string | undefined, dateTaken: Date | undefined, dateOrder: Date | undefined) {
        super(guid, dateTaken, dateOrder);
        this.title = title;
        this.transport = transport;
        this.kind = EntryKind.Locality;
    }
}


//#endregion Items

export type JournalEntriesArray = JournalEntry[];

export enum TransportType {
    Vehicle,
    Bike,
    PersonalMobility
}

export enum Orientation{
    Portrait,
    Landscape
}

export enum Direction {
    rtl,
    ltr
}

export enum EntryKind {
    Image,
    Video,
    Note,
    Audio,
    Achievement,
    POI,
    Map,
    Locality,
}

export class User {
    AvatarPath: string | undefined = undefined;
    Name: string = 'Test User';
}

export class Comment{
    author: User | undefined = undefined;
    content: string = '';
}

export class Reaction {
    author: User | undefined = undefined;
    reaction: ReactionType = ReactionType.Like;
}

export enum ReactionType {
    Like,
    Applause,
    Cool,
    ThumbUp,
    LOL,
    Sad,
    Crying
}