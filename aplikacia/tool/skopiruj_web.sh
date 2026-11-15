#!/bin/sh
# Skopíruje aktuálnu webovú časť (../web) do aplikácie
# a overí, že každý priečinok je uvedený v pubspec.yaml (inak by v aplikácii chýbal).
cd "$(dirname "$0")/.." && rm -rf assets/web && mkdir -p assets && cp -r ../web assets/web
chyba=0
for d in $(find assets/web -type d); do
  if ! grep -q "^    - $d/\$" pubspec.yaml; then
    echo "CHYBA: priečinok $d/ chýba v pubspec.yaml (flutter: assets:)"
    chyba=1
  fi
done
[ $chyba -eq 0 ] && echo "Web skopírovaný, všetky priečinky sú v pubspec.yaml."
exit $chyba
