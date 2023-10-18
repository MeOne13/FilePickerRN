import uuid from 'react-native-uuid';
import {ImageEntry} from "./Items";
export default class JournalVM{
    Guid: string
    Title: string
    Description: string
    Year: number
    Date: number
    Month: string
    Countries: string[]
    Participients: User[]
    Tags: string[]
    POW: User
    Entries: ImageEntry[]
}
export class Summary{
    Days: number = 0;
    DistanceKM: number = 0;
    ImagesCount: number = 0;
    VideosCount: number = 0;
}
export class User {
    AvatarPath: string
    Name: string
}