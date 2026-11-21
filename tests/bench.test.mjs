import assert from 'node:assert/strict';
import test from 'node:test';
import { comparePasses, specimen } from '../src/lib/ampersand.mjs';
import { compareDeliveries } from '../src/lib/delivery.mjs';

test('the extra preparation changes the ampersand only on the second callback', () => {
  assert.deepEqual(comparePasses(specimen), {
    original: ['&amp;', '&amp;amp;'],
    patched: ['&amp;', '&amp;'],
  });
});
test('a control without an ampersand cannot distinguish the two paths', () => {
  const trace = comparePasses('coffee');
  assert.deepEqual(trace.original, trace.patched);
  assert.deepEqual(comparePasses('').patched, ['', '']);
});
test('each ampersand in the same input participates', () => {
  assert.deepEqual(comparePasses('A&B & C').patched, ['A&amp;B &amp; C', 'A&amp;B &amp; C']);
});
test('repeated deliveries run once per distinct ID in the guarded handler', () => {
  assert.deepEqual(compareDeliveries(['17', '17', '18']), {
    original: ['ran', 'ran', 'ran'],
    patched: ['ran', 'skipped', 'ran'],
  });
  assert.deepEqual(compareDeliveries([]), { original: [], patched: [] });
});
