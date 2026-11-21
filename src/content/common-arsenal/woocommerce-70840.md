---
title: Prepare the input once
summary: My follow-up patch and regression tests for WooCommerce’s ability input handling.
date: 2026-11-19
evidence:
  - label: WooCommerce pull request 70840
    url: https://github.com/woocommerce/woocommerce/pull/70840
  - label: The original review
    url: https://github.com/woocommerce/woocommerce/pull/70836#issuecomment-6772716823
---

I submitted [WooCommerce #70840](https://github.com/woocommerce/woocommerce/pull/70840) after a review by [Greg Ziółkowski](https://github.com/gziolo). The patch removes a second preparation step and covers the direct-call behavior in the test suite.

The maintainers merged it into `update/ability-prepare-input` on 19 November 2026. The pull request records the compatibility requirements and the test results for the WordPress versions involved.
