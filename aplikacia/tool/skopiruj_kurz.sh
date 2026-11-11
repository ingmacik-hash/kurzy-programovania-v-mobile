#!/bin/sh
# Skopíruje aktuálny kurz (../index.html) do aplikácie.
cd "$(dirname "$0")/.." && cp ../index.html assets/kurz/index.html
