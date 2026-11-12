#!/bin/sh
# Skopíruje aktuálnu webovú časť (../web) do aplikácie.
cd "$(dirname "$0")/.." && rm -rf assets/web && mkdir -p assets && cp -r ../web assets/web
