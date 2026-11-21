---
title: The job that ran twice
summary: Deliver an event twice. Count how many jobs two different handlers run.
date: 2026-11-20
instrument: delivery
---

A small bench experiment. Both handlers receive exactly the event IDs you enter. The first runs a job for every delivery. The second remembers the IDs it has seen in this run and skips a repeat.

Change the second ID and run it again. Two different IDs should produce two jobs on both sides. The memory resets between runs. A service with multiple processes would need to coordinate that decision across them.
