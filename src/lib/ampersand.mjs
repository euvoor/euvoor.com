export const specimen = '&';

/** Model only the ampersand substitution in the upstream test filter.
 * @param {string} raw
 */
export function comparePasses(raw) {
  const prepare = (/** @type {string} */ value) => value.replaceAll('&', '&amp;');
  const prepared = prepare(raw);
  return {
    original: [prepared, prepare(prepared)],
    patched: [prepared, prepared],
  };
}
