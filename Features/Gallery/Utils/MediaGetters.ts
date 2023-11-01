import {
    AudioEntry,
    ImageEntry,
    JournalEntry,
    LocalityEntry, MapEntry, NoteEntry,
    Orientation,
    POIEntry,
    TransportType,
    VideoEntry
} from "../Types/Items";
import * as MediaLibrary from "expo-media-library";
import {GenerateImageThumbnail, GenerateVideoThumbnail} from "./MediaProcessing";
import * as FileSystem from 'expo-file-system';

export async function GetJournalEntries(guid?: string): Promise<JournalEntry[]> {
    const now = Date.now() - 60 * 60 * 24 * 365 * 3 * 1000;
    const medias = await GetCameraRoll(Date.now() - 60 * 60 * 24 * 365 * 3 * 1000, Date.now());

    const entries: JournalEntry[] = [];
    for (let i = 0; i < medias.length; i++) {
        // if (i % 15 === 0) {
        //     const mapEntry = new MapEntry([], undefined, 0, 0);
        //     const locality = new LocalityEntry('Some city', TransportType.Vehicle, undefined, 0, 0);
        //     entries.push(mapEntry);
        //     entries.push(locality);
        // }
            // else if (i % 10 === 0) {
            //     const quantity = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            //     for (let j = 0; j < quantity; j++) {
            //         const poi = new POIEntry('OLOLO', undefined, 0, 0);
            //         entries.push(poi);
            //     }
        // }
        // else
            if (i % 7 === 0 && Boolean(Math.round(Math.random()))) {
            const noteEntry = new NoteEntry(undefined, undefined, 0, 0);
            entries.push(noteEntry);
        } else if (i % 11 === 0) {
            const audioEntry = new AudioEntry(undefined, undefined, 0, 0);
            entries.push(audioEntry);
        }
        entries.push(medias[i]);
    }
    return entries;
}

async function GetCameraRoll(after: Date | number, before: Date | number, maxCount: number = 100) {
    console.log('in camera');

    const thumbsDirectory = FileSystem.documentDirectory + '0-500/';
    // const thumbsDirectory = FileSystem.cacheDirectory + 'journals/' + 'test/' + 'thumbs/' + '0-500';
    try {
        const dirInfo = await FileSystem.getInfoAsync(thumbsDirectory);
        console.log(dirInfo);
        if (!dirInfo.exists)
            await FileSystem.makeDirectoryAsync(thumbsDirectory);
    } catch (ex) {
        console.log(ex);
    }
    console.log('after');

    const medias =
        await MediaLibrary.getAssetsAsync({
            // createdAfter: after,
            // createdBefore: before,
            first: maxCount,
            mediaType: ['photo', 'video']
        });
    const entries: JournalEntry[] = [];
    for (const item of medias.assets) {
        const itemThumbPath = thumbsDirectory + item.filename;
        if (item.mediaType === 'photo') {
            await GenerateImageThumbnail(item.uri, itemThumbPath, item.width, item.height);
            const entry = new ImageEntry(item.uri,
                itemThumbPath,
                item.height >= item.width ? Orientation.Portrait : Orientation.Landscape,
                undefined,
                item.creationTime,
                item.creationTime);
            entries.push(entry);
        } else {
            await GenerateVideoThumbnail(item.uri, itemThumbPath);
            const entry = new VideoEntry(item.uri,
                undefined,
                itemThumbPath,
                item.height >= item.width ? Orientation.Portrait : Orientation.Landscape,
                undefined,
                item.creationTime,
                item.creationTime);
            entries.push(entry);
        }
    }
    return entries;
}