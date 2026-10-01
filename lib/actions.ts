'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { SacramentMeeting, Hymn, SpeakerItem, WardBusinessItem, MeetingType } from './types';

const meetingFormSchema = z.object({
  date: z.string().min(10, 'Date is required, YYYY-MM-DD Format'),
  meetingType: z.string().min(1, 'Meeting type is required'),
  presiding: z.string().min(3, 'Presiding is required, minimum 3 characters'),
  conducting: z.string().min(3, 'Conducting is required, minimum 3 characters'),
  announcements: z.array(z.string()).optional(),
  openingHymn: z.object({
    number: z.number().min(1, 'Opening hymn number must be above 0'),
    title: z.string().min(3, 'Opening hymn title is required, minimum 3 characters'),
  }),
  openingPrayer: z.string().min(3, 'Opening prayer is required, minimum 3 characters'),
  wardBusiness: z.array(z.object({
    description: z.string().min(1, 'Ward business description is required'),
  })).optional(),
  stakeBusiness: z.boolean().optional(),
  sacramentHymn: z.object({
    number: z.number().min(1, 'Sacrament hymn number must be above 0'),
    title: z.string().min(3, 'Sacrament hymn title is required, minimum 3 characters'),
  }),
  speakers: z.array(z.object({
    name: z.string().min(1, 'Speaker name is required'),
    topic: z.string().min(1, 'Speaker topic is required'),
    type: z.enum(['speaker', 'musical-number']),
  })).min(1, 'Speakers are required'),
  closingHymn: z.object({
    number: z.number().min(1, 'Closing hymn number must be above 0'),
    title: z.string().min(3, 'Closing hymn title is required, minimum 3 characters'),
  }),
  closingPrayer: z.string().min(3, 'Closing prayer is required, minimum 3 characters'),
});

export type State = {
  message?: string | null;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
};


export async function handleAddMeeting(prevState: State, formData: FormData): Promise<State> {
  const raw = {
    date: formData.get('date') as string,
    meetingType: formData.get('meetingType') as MeetingType,
    presiding: formData.get('presiding') as string,
    conducting: formData.get('conducting') as string,
    announcements: (formData.get('announcements') as string).split(',').map(item => item.trim()) as string[],
    openingHymn: {
      number: Number(formData.get('openingHymnNumber')) as number,
      title: formData.get('openingHymnTitle') as string,
    } as unknown as Hymn,
    openingPrayer: formData.get('openingPrayer') as string,
    wardBusiness: (formData.get('wardBusiness') as string).split(',').map(item => ({description : item.trim()})) as unknown as WardBusinessItem[],
    stakeBusiness: (formData.get('stakeBusiness') as string) === 'on',
    sacramentHymn: {
      number: Number(formData.get('sacramentHymnNumber')) as number,
      title: formData.get('sacramentHymnTitle') as string,
    } as unknown as Hymn,
    speakers: (formData.get('speakers') as string).split(',').map(item => ({name: item.trim()})) as unknown as SpeakerItem[],
    closingHymn: {
      number: Number(formData.get('closingHymnNumber')) as number,
      title: formData.get('closingHymnTitle') as string,
    } as unknown as Hymn,
    closingPrayer: formData.get('closingPrayer') as string,
  };

  const speakerTopics = (formData.get('speakerTopics') as string).split(',').map(item => item.trim());
  raw.speakers.map((speaker, index) => speaker.topic = speakerTopics[index]);

  const speakerTypes = (formData.get('speakerTypes') as string).split(',').map(item => {
    if (item.trim() === 'speaker') return 'speaker'
    else return 'musical-number';
  });
  raw.speakers.map((speaker, index) => speaker.type = speakerTypes[index]);

  const parsed = meetingFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const data = parsed.data as unknown as Omit<SacramentMeeting, 'id'>;

  try {
    await addMeeting(data);
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to add meeting:', error);
    return {
        message: 'Failed to create meeting.',
        errors: {},
    };
  }

  redirect(`/meetings`);
}

export async function handleUpdateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
    const raw = {
    date: formData.get('date') as string,
    meetingType: formData.get('meetingType') as MeetingType,
    presiding: formData.get('presiding') as string,
    conducting: formData.get('conducting') as string,
    announcements: (formData.get('announcements') as string).split(',').map(item => item.trim()) as string[],
    openingHymn: {
      number: Number(formData.get('openingHymnNumber')) as number,
      title: formData.get('openingHymnTitle') as string,
    } as unknown as Hymn,
    openingPrayer: formData.get('openingPrayer') as string,
    wardBusiness: (formData.get('wardBusiness') as string).split(',').map(item => ({description : item.trim()})) as unknown as WardBusinessItem[],
    stakeBusiness: (formData.get('stakeBusiness') as string) === 'on',
    sacramentHymn: {
      number: Number(formData.get('sacramentHymnNumber')) as number,
      title: formData.get('sacramentHymnTitle') as string,
    } as unknown as Hymn,
    speakers: (formData.get('speakers') as string).split(',').map(item => ({name: item.trim()})) as unknown as SpeakerItem[],
    closingHymn: {
      number: Number(formData.get('closingHymnNumber')) as number,
      title: formData.get('closingHymnTitle') as string,
    } as unknown as Hymn,
    closingPrayer: formData.get('closingPrayer') as string,
  };

  const speakerTopics = (formData.get('speakerTopics') as string).split(',').map(item => item.trim());
  raw.speakers.map((speaker, index) => speaker.topic = speakerTopics[index]);

  const speakerTypes = (formData.get('speakerTypes') as string).split(',').map(item => {
    if (item.trim() === 'speaker') return 'speaker'
    else return 'musical-number';
  });
  raw.speakers.map((speaker, index) => speaker.type = speakerTypes[index]);

  const parsed = meetingFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const updates = parsed.data as unknown as Omit<SacramentMeeting, 'id'>;

  try {
    await updateMeeting(id, updates);
    revalidatePath(`/meetings`);
    
  } catch (error) {
    console.error('Failed to update meeting:', error);
    return {
        message: 'Failed to update meeting.',
        errors: {},
    };
  }

  redirect(`/meetings/${id}`);
}

export async function handleDeleteMeeting(id: number) {
    try {
      await deleteMeeting(id);
      revalidatePath('/meetings');
      redirect('/meetings');
    } catch (error) {
      console.error('Failed to delete meeting:', error);
    }
}