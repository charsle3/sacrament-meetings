import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'President Carter',
    conducting: 'Brother Martinez',
    openingHymn: { number: 140, title: 'The Lord Is My Light' },
    openingPrayer: 'Brother Lee',
    wardBusiness: [
      { description: 'Announcements for youth conference' },
      { description: 'Volunteer sign-ups for service project' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 194, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Brother Walker', topic: 'The Blessings of Obedience', type: 'speaker' },
      { name: 'Elder Johnson', topic: 'Missionary Service', type: 'speaker' },
      { name: 'Relief Society Quartet', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 136, title: 'Now Let Us Rejoice' },
    closingPrayer: 'Sister Adams',
    announcements: ['Stake youth activity: May 15', 'Ward cleanup day: May 18']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'testimony',
    presiding: 'Elder Thompson',
    conducting: 'Brother Nguyen',
    openingHymn: { number: 78, title: 'I Need Thee Every Hour' },
    openingPrayer: 'Brother Hall',
    wardBusiness: [{ description: 'Fast offering update and bishopric report' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Sister Parker', topic: 'Personal testimony of the Book of Mormon', type: 'speaker' },
      { name: 'Brother Foster', topic: 'Finding peace through prayer', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 116, title: 'Lord, I Would Follow Thee' },
    closingPrayer: 'Sister Hill',
    announcements: ['Family history class: May 22']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President Lewis',
    conducting: 'Brother Clark',
    openingHymn: { number: 89, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Evans',
    wardBusiness: [
      { description: 'Stake temple recommend interviews' },
      { description: 'Ward member missionary opportunities' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 154, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Brother Scott', topic: 'Enduring to the end', type: 'speaker' },
      { name: 'Stake Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 19, title: 'Softly Beam the Sacred Greetings' },
    closingPrayer: 'Brother Morris',
    announcements: ['Stake conference broadcast: May 30', 'Ward dinner fundraiser: June 2']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Davis',
    openingHymn: { number: 117, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Morgan',
    wardBusiness: [
      { description: 'Welcome new family to the ward' },
      { description: 'Ward Relief Society birthday celebration' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 178, title: 'This Is the Christ' },
    speakers: [
      { name: 'Brother White', topic: 'Service as a disciple of Christ', type: 'speaker' },
      { name: 'Young Women Ensemble', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 133, title: 'How Great Thou Art' },
    closingPrayer: 'Brother Harris',
    announcements: ['Ward picnic: June 8', 'Temple prep class begins next Sunday']
  },
  {
    id: 6,
    date: '2026-09-13',
    meetingType: 'general',
    presiding: 'Elder Ramirez',
    conducting: 'Brother King',
    openingHymn: { number: 95, title: 'For the Beauty of the Earth' },
    openingPrayer: 'Sister Brooks',
    wardBusiness: [{ description: 'General conference review and lesson schedule' }],
    stakeBusiness: true,
    sacramentHymn: { number: 161, title: 'When I Survey the Wondrous Cross' },
    speakers: [
      { name: 'Sister Gomez', topic: 'Living the gospel daily', type: 'speaker' },
      { name: 'Primary Children', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 119, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Brother Turner',
    announcements: ['Youth temple trip: June 12', 'Ward missionary training: June 15']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}