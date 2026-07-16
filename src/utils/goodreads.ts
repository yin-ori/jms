import { XMLParser } from 'fast-xml-parser';

const USER_ID = '68880738';
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

export interface Book {
  title: string;
  author: string;
  link: string;
  cover: string;
  rating: number;
  readAt: Date | null;
  addedAt: Date | null;
}

// Goodreads-Titel enthalten oft Serien-Klammern und lange Verlags-Untertitel
function cleanTitle(raw: string): string {
  let t = raw.replace(/\s*\(.*?\)\s*$/, '');
  t = t.split(/\s+[-–—]\s+/)[0];
  t = t.split(/:\s/)[0];
  return t.trim();
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function toBook(item: Record<string, unknown>): Book {
  const cover = String(item.book_large_image_url || item.book_image_url || '');
  return {
    title: cleanTitle(String(item.title ?? '')),
    author: String(item.author_name ?? '').trim().replace(/\s+/g, ' '),
    link: String(item.link ?? ''),
    // Goodreads liefert verkleinerte Cover (._SX98_ o.ä.) – Suffix entfernen für volle Auflösung
    cover: cover.replace(/\._S[XY]\d+_/, ''),
    rating: Number(item.user_rating) || 0,
    readAt: parseDate(item.user_read_at),
    addedAt: parseDate(item.user_date_added),
  };
}

async function fetchShelfPage(shelf: string, page: number): Promise<Record<string, unknown>[]> {
  const url = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}&sort=date_read&order=d&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Goodreads feed ${shelf} p${page}: HTTP ${res.status}`);
  const parser = new XMLParser({ ignoreAttributes: false });
  const data = parser.parse(await res.text());
  const items = data?.rss?.channel?.item ?? [];
  return Array.isArray(items) ? items : [items];
}

export async function getCurrentlyReading(): Promise<Book[]> {
  try {
    const items = await fetchShelfPage('currently-reading', 1);
    return items.map(toBook);
  } catch (e) {
    console.warn('[goodreads] currently-reading nicht erreichbar:', e);
    return [];
  }
}

export async function getReadBooks(): Promise<Book[]> {
  try {
    const all: Record<string, unknown>[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const items = await fetchShelfPage('read', page);
      all.push(...items);
      if (items.length < PAGE_SIZE) break;
    }
    return all.map(toBook).filter((b) => b.readAt !== null);
  } catch (e) {
    console.warn('[goodreads] read-Regal nicht erreichbar:', e);
    return [];
  }
}

// Nach Lesejahr gruppiert, neuestes Jahr und neuestes Buch zuerst
export function groupByYear(books: Book[]): [number, Book[]][] {
  const map = new Map<number, Book[]>();
  for (const b of books) {
    const year = b.readAt!.getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(b);
  }
  for (const list of map.values()) {
    list.sort((a, b) => b.readAt!.getTime() - a.readAt!.getTime());
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
