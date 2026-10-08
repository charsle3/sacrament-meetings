'use client'

import { handleAddMeeting, type State } from '@/lib/actions';
import { useActionState } from 'react';

const initialState: State = { message: null, errors: {} };

export default function NewMeeting() {
    const [state, formAction, isPending] = useActionState(handleAddMeeting, initialState);

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <form action={formAction}>
                <fieldset className="border p-4 mb-4 flex flex-col">
                    <legend>New Meeting Details</legend>
                    <label>Date
                        <input className="ml-2" type="text" name="date" placeholder="YYYY-MM-DD" required aria-describedby='dateHelp'/>
                    </label>
                    <div id="dateHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.date?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="testimony" />
                            Testimony
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="regular" defaultChecked />
                            Regular
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="stake" />
                            Stake
                        </label>
                        <label>
                            <input className="mr-2" type="radio" name="meetingType" value="general" />
                            General
                        </label>
                    </div>

                    <label>Presiding:
                        <input className="ml-2" type="text" name="presiding" placeholder="Presiding" aria-describedby='presidingHelp' required />
                    </label>
                    <div id="presidingHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.presiding?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Conducting:
                        <input className="ml-2" type="text" name="conducting" placeholder="Conducting" aria-describedby='conductingHelp' required />
                    </label>
                    <div id="conductingHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.conducting?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Announcements:
                        <input className="ml-2 w-100" type="text" name="announcements" placeholder="Comma separated announcements" />
                    </label>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Opening Hymn</legend>
                        <label>Number:
                            <input className="ml-2 w-100" type="number" name="openingHymnNumber" placeholder="Opening Hymn Number" aria-describedby='openingHymnHelp' required />
                        </label>
                        <div id="openingHymnHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.openingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="openingHymnTitle" placeholder="Opening Hymn Title" aria-describedby='openingHymnTitleHelp' required />
                        </label>
                        <div id="openingHymnTitleHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.openingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <label>Opening Prayer:
                        <input className="ml-2" type="text" name="openingPrayer" placeholder="Opening Prayer" aria-describedby='openingPrayerHelp' required />
                    </label>
                    <div id="openingPrayerHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingPrayer?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Ward Business:
                        <input className="ml-2 w-100" type="text" name="wardBusiness" placeholder="Comma separated ward business items" aria-describedby='wardBusinessHelp' />
                    </label>
                    <div id="wardBusinessHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.wardBusiness?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>

                    <label>Stake Business:
                        <input className="ml-2" type="checkbox" name="stakeBusiness" />
                    </label>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Sacrament Hymn</legend>
                        <label>Number:
                            <input className="ml-2 w-100" type="number" name="sacramentHymnNumber" placeholder="Sacrament Hymn Number" aria-describedby='sacramentHymnHelp' required />
                        </label>
                        <div id="sacramentHymnHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.sacramentHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="sacramentHymnTitle" placeholder="Sacrament Hymn Title" aria-describedby='sacramentHymnTitleHelp' required />
                        </label>
                        <div id="sacramentHymnTitleHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.sacramentHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 mb-4 flex flex-col">
                        <legend>Speakers</legend>
                        <label>Names (comma separated):
                            <input className="ml-2 w-100" type="text" name="speakers" placeholder="Speakers" aria-describedby='speakersHelp' required />
                        </label>
                        <div id="speakersHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.speakers?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Topics (comma separated):
                            <input className="ml-2 w-100" type="text" name="speakerTopics" placeholder="Speaker Topics" aria-describedby='speakerTopicsHelp' required />
                        </label>
                        <div id="speakerTopicsHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.speakers?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Type (speaker/musical-number):
                            <input className="ml-2 w-100" type="text" name="speakerTypes" placeholder="Speaker Type" aria-describedby='speakerTypesHelp' required />
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
                            <input className="ml-2 w-100" type="number" name="closingHymnNumber" placeholder="Closing Hymn Number" aria-describedby='closingHymnNumberHelp' required />
                        </label>
                        <div id="closingHymnNumberHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.closingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                        <label>Title:
                            <input className="ml-2 w-100" type="text" name="closingHymnTitle" placeholder="Closing Hymn Title" aria-describedby='closingHymnTitleHelp' required />
                        </label>
                        <div id="closingHymnTitleHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                            {state.errors?.closingHymn?.map((error) => (
                                <p key={error} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    </fieldset>

                    <label>Closing Prayer:
                        <input className="ml-2" type="text" name="closingPrayer" placeholder="Closing Prayer" aria-describedby='closingPrayerHelp' required />
                    </label>
                    <div id="closingPrayerHelp" className="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingPrayer?.map((error) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                </fieldset>

                {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

                <button type="submit" className="bg-blue-500 text-navy px-4 py-2 rounded">
                    {isPending ? 'Adding Meeting...' : 'Add Meeting'}
                </button>
            </form>
        </main>
    );
}