import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';


const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting( data: Omit<SacramentMeeting, 'id'> ): Promise<SacramentMeeting> {
  const result = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType}::VARCHAR,
      ${data.presiding}::VARCHAR,
      ${data.conducting}::VARCHAR,
      ${data.announcements ?? []}::TEXT[],
      ${JSON.stringify(data.openingHymn)}::JSONB,
      ${data.openingPrayer}::VARCHAR,
      ${JSON.stringify(data.wardBusiness)}::JSONB,
      ${data.stakeBusiness}::BOOLEAN,
      ${JSON.stringify(data.sacramentHymn)}::JSONB,
      ${JSON.stringify(data.speakers)}::JSONB,
      ${JSON.stringify(data.closingHymn)}::JSONB,
      ${data.closingPrayer}::VARCHAR
    )
    RETURNING *
  `;

  return result[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  
  const result = await sql`
    UPDATE meetings
    SET
      date = ${updates.date},
      meeting_type = ${updates.meetingType}::VARCHAR,
      presiding = ${updates.presiding}::VARCHAR,
      conducting = ${updates.conducting}::VARCHAR,
      announcements = ${updates.announcements ?? []}::TEXT[],
      opening_hymn = ${JSON.stringify(updates.openingHymn)}::JSONB,
      opening_prayer = ${updates.openingPrayer}::VARCHAR,
      ward_business = ${JSON.stringify(updates.wardBusiness)}::JSONB,
      stake_business = ${updates.stakeBusiness}::BOOLEAN,
      sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)}::JSONB,
      speakers = ${JSON.stringify(updates.speakers)}::JSONB,
      closing_hymn = ${JSON.stringify(updates.closingHymn)}::JSONB,
      closing_prayer = ${updates.closingPrayer}::VARCHAR
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] as unknown as SacramentMeeting;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const result = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING *
  `;
  return result.length > 0;
}