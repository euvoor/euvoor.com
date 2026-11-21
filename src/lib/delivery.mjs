/** Replay a sequence against two fresh in-memory handlers.
 * @param {string[]} ids
 */
export function compareDeliveries(ids) {
  const seen = new Set();
  return {
    original: ids.map(() => 'ran'),
    patched: ids.map((id) => {
      if (seen.has(id)) return 'skipped';
      seen.add(id);
      return 'ran';
    }),
  };
}
