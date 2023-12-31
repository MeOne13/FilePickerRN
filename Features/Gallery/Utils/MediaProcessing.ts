import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';

const DESIRED_HEIGHT = 400;

export async function GenerateImageThumbnail(source: string, destination: string, originalWidth: number, originalHeight: number): Promise<void> {
    const thumbInfo = await FileSystem.getInfoAsync(destination, {size: false});
    if (thumbInfo.exists) {
        return;
    }
    const proportion = originalHeight / DESIRED_HEIGHT;
    const desiredWidth = Math.trunc(originalWidth / proportion);

    const resized = await manipulateAsync(source, [{
        resize: {
            height: DESIRED_HEIGHT,
            width: desiredWidth
        }
    }], {compress: 0.5, format: SaveFormat.JPEG});
    await FileSystem.moveAsync({from: resized.uri, to: destination});
}

export async function GenerateVideoThumbnail(source: string, destination: string): Promise<void> {
    const thumbInfo = await FileSystem.getInfoAsync(destination, {size: false});
    if (thumbInfo.exists) {
        return;
    }
    const thumbnail = await VideoThumbnails.getThumbnailAsync(source, {time: 1000, quality: 1});
    await GenerateImageThumbnail(thumbnail.uri, destination, thumbnail.width, thumbnail.height);
}