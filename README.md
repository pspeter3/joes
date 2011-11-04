Uncle Joe's Recruitment App
========================

This app is being developed for the Uncle Joe's program at Washington University
in St. Louis. The app is designed for helping their recruitment process,
specifically scheduling the events.

Algorithm
---------

The algorithm uses the heuristic of assigning the most conflicted recruit to the
most free interview pair. While it does not produce perfect results, it does do
a pretty good job approximating. The algorithm roughly runs in O(n * n * ln(n)).
