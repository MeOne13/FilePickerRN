import JournalVM from "../Types/JournalVM";
import {GetTestUsers} from "./Generators/TestUsers";
import {GetJournalEntries} from "./MediaGetters";

//region Journal
// Test journal with 0 guid and just last 100 photos from gallery
// with test users
export async function GetTestJournal(): Promise<JournalVM> {
    const journal = new JournalVM('Test1');
    journal.participants = GetTestUsers();
    journal.tags = ['#recreation', '#carTrip', '#bikeFamily'];
    journal.entries = await GetJournalEntries('');
    return journal;
}

//endregion






