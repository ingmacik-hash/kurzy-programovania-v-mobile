/* Pomôcky pre obsah kurzov (CSS, JS, Python, C++). */
(function () {
  var P = K.pom = {};
  P.TXT = 'font-family="Inter,sans-serif"';
  P.MONO = 'font-family="JBMono,monospace"';
  P.kod = function (text, jazyk, stitok) { return K.blokKodu(text, jazyk, stitok); };
  P.tabulka = function (h, r) { return '<div class="tabulka"><table><thead><tr>' + h.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + r.map(function (x) { return "<tr>" + x.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; };
  P.text = function (el) { return el ? el.textContent.trim() : ""; };

  /* Živá ukážka: kód CSS (+ HTML) a pod ním skutočný výsledok v izolovanom okne. */
  P.ziva = function (html, css, vyska, ukazHtml) {
    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;margin:0;padding:10px;line-height:1.4;color:#111;background:#fff}' + (css || "") + "</style></head><body>" + html + "</body></html>";
    return '<div class="kod-obal">' + (ukazHtml ? K.blokKodu(html, "html", "HTML") : "") + (css ? K.blokKodu(css, "css", "CSS") : "") +
      '<iframe class="ziva-ukazka" sandbox="" style="height:' + (vyska || 120) + 'px" srcdoc="' + K.esc(doc) + '" title="Ukážka výsledku"></iframe></div>';
  };

  /* Kontroly v náhľade */
  P.styl = function (d, sel, vlastnost) { var e = typeof sel === "string" ? d.querySelector(sel) : sel; return e ? d.defaultView.getComputedStyle(e).getPropertyValue(vlastnost).trim() : null; };
  P.farba = function (d, hodnota) { var e = d.createElement("i"); e.style.color = hodnota; d.body.appendChild(e); var v = d.defaultView.getComputedStyle(e).color; e.remove(); return v; };
  P.rovnakaFarba = function (d, sel, vlastnost, ocakavana) { var v = P.styl(d, sel, vlastnost); return v !== null && v === P.farba(d, ocakavana); };
  P.px = function (d, sel, vlastnost) { return parseFloat(P.styl(d, sel, vlastnost)) || 0; };
  P.vystup = function (d) { return (d.defaultView.__vystup || []).join("\n"); };
  /* Program (Python/C++): riadky výstupu bez prázdnych na konci */
  P.riadky = function (vystup) { return vystup.replace(/\s+$/, "").split("\n").map(function (r) { return r.replace(/\s+$/, ""); }); };
})();
