---
title: An ampersand too far
summary: One character went into WooCommerce. Two callbacks disagreed about what came out.
date: 2026-11-19
instrument: ampersand
related: [laboratory/ampersand-bench, common-arsenal/woocommerce-70840]
evidence:
  - label: Upstream discussion and regression tests
    url: https://github.com/woocommerce/woocommerce/pull/70840
---

The regression test starts with a single character, `&`.

A WooCommerce ability can prepare its input before it runs. In the regression test, a filter escapes text during preparation. The execution callback receives `&amp;`, exactly as expected. The permission callback gets another bite at it. By the time it looks at the same field, the value reads `&amp;amp;`.

## Why a perfectly good test can miss it

Try the word `coffee`. Escape it once, escape it twice, and you still have coffee. A test that compares those strings will happily pass. An ampersand leaves a footprint on every trip through the filter.

## Where the extra pass came from

Execution had already prepared the input. WooCommerce’s permission-check override called preparation again. Greg Ziółkowski’s review on the preceding pull request prompted the follow-up. The fix removes that override. Callers that check permissions directly prepare the input first and handle any error. Callers using the execution path still pass raw input.

## What the test can tell us

The regression test counts the filter calls and checks the value delivered to each callback. One call. The same string on both sides. The patch merged into the integration branch on 19 November 2026.

Try the bench with your own input. It isolates the ampersand substitution. The upstream test exercises the actual PHP callbacks.
