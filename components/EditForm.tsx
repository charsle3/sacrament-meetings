'use client'

import { handleUpdateMeeting, State } from "@/lib/actions";
import { SacramentMeeting } from "@/lib/types";
import { useActionState } from "react";


const initialState: State = { message: null, errors: {} };

export default function EditMeeting({ meeting }: { meeting: SacramentMeeting }) {
    const meetingId = meeting.id;

    const [state, formAction, isPending] = useActionState(handleUpdateMeeting.bind(null, meetingId), initialState);

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <form action={formAction}>
                <fieldset className="border p-4 mb-4 flex flex-col">
                    <legend>Update Meeting Details</legend>
                    <label>Date
                        <input className="ml-2" type="text" name="date" placeholder="YYYY-MM-DD" required aria-describedby='dateHelp' defaultValue={meeting.date} />
                    </label>
                    <div id="dateHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.date?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="testimony" defaultChecked={meeting.meetingType === 'testimony'} />
                            Testimony
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="regular" defaultChecked={meeting.meetingType === 'regular'} />
                            Regular
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="stake" defaultChecked={meeting.meetingType === 'stake'} />
                            Stake
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="general" defaultChecked={meeting.meetingType === 'general'} />
                            General
                        </label>
                    </div>

                    <label>Presiding:
                        <input className="ml-2" type="text" name="presiding" placeholder="Presiding" aria-describedby='presidingHelp' required defaultValue={meeting.presiding} />
                    </label>
                    <div id="presidingHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.presiding?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Conducting:
                        <input className="ml-2" type="text" name="conducting" placeholder="Conducting" aria-describedby='conductingHelp' required defaultValue={meeting.conducting} />
                    </label>
                    <div id="conductingHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.conducting?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Announcements:
                        <input className="ml-2 w-100" type="text" name="announcements" placeholder="Comma separated announcements" defaultValue={meeting.announcements} />
                    </label>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Opening Hymn</legend>
                        <label>Number:
                            <input className="ml-2 w-100" type="number" name="openingHymnNumber" placeholder="Opening Hymn Number" aria-describedby='openingHymnHelp' required defaultValue={meeting.openingHymn.number} />
                        </label>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="openingHymnTitle" placeholder="Opening Hymn Title" aria-describedby='openingHymnHelp' required defaultValue={meeting.openingHymn.title} />
                        </label>
                        <div id="openingHymnHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.openingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <label>Opening Prayer:
                        <input className="ml-2" type="text" name="openingPrayer" placeholder="Opening Prayer" aria-describedby='openingPrayerHelp' required defaultValue={meeting.openingPrayer} />
                    </label>
                    <div id="openingPrayerHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingPrayer?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Ward Business:
                        <input className="ml-2 w-100" type="text" name="wardBusiness" placeholder="Comma separated ward business items" aria-describedby='wardBusinessHelp' defaultValue={meeting.wardBusiness.map(item => item.description).join(', ')} />
                    </label>
                    <div id="wardBusinessHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.wardBusiness?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Stake Business:
                        <input className="ml-2" type="checkbox" name="stakeBusiness" defaultChecked={meeting.stakeBusiness} />
                    </label>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Sacrament Hymn</legend>
                        <label>Number:
                            <input className="ml-2 w-100" type="number" name="sacramentHymnNumber" placeholder="Sacrament Hymn Number" aria-describedby='sacramentHymnHelp' required defaultValue={meeting.sacramentHymn.number} />
                        </label>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="sacramentHymnTitle" placeholder="Sacrament Hymn Title" aria-describedby='sacramentHymnHelp' required defaultValue={meeting.sacramentHymn.title} />
                        </label>
                        <div id="sacramentHymnHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.sacramentHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Speakers</legend>
                        <label>Names (comma separated):
                            <input className="ml-2 w-100" type="text" name="speakers" placeholder="Speakers" aria-describedby='speakersHelp' required defaultValue={meeting.speakers.map(speaker => speaker.name).join(', ')} />
                        </label>
                        <div id="speakersHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.speakers?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Topics (comma separated):
                            <input className="ml-2 w-100" type="text" name="speakerTopics" placeholder="Speaker Topics" aria-describedby='speakerTopicsHelp' required defaultValue={meeting.speakers.map(speaker => speaker.topic).join(', ')} />
                        </label>
                        <div id="speakerTopicsHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.speakers?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Type (speaker/musical-number):
                            <input className="ml-2 w-100" type="text" name="speakerTypes" placeholder="Speaker Type" aria-describedby='speakerTypesHelp' required defaultValue={meeting.speakers.map(speaker => speaker.type).join(', ')} />
                        </label>
                        <div id="speakerTypesHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.speakers?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Closing Hymn</legend>
                        <label>Number:
                            <input className="ml-2 w-100" type="number" name="closingHymnNumber" placeholder="Closing Hymn Number" aria-describedby='closingHymnHelp' required defaultValue={meeting.closingHymn.number} />
                        </label>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="closingHymnTitle" placeholder="Closing Hymn Title" aria-describedby='closingHymnHelp' required defaultValue={meeting.closingHymn.title} />
                        </label>
                        <div id="closingHymnHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.closingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <label>Closing Prayer:
                        <input className="ml-2" type="text" name="closingPrayer" placeholder="Closing Prayer" aria-describedby='closingPrayerHelp' required defaultValue={meeting.closingPrayer} />
                    </label>
                    <div id="closingPrayerHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingPrayer?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                </fieldset>

                {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

                <button type="submit" className="bg-blue-500 text-navy px-4 py-2 rounded">
                    {isPending ? 'Updating Meeting...' : 'Update Meeting'}
                </button>
            </form>
        </main>
    );
}