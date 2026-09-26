/**
 * Renders inline emphasis in data strings: `*term*` becomes `<em>term</em>`.
 * Used for romanized Japanese terms and work titles, which are set in italics.
 * All other characters are HTML-escaped, so the result is safe for `set:html`.
 */
export function renderInline(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
