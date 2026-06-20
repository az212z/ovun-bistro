# DESIGN-QUALITY-REPORT — أوفن بيسترو (Ovun Bistro)

**Design read:** ultra-premium one-page restaurant site for an upscale Riyadh European bistro, audience = design-conscious diners + reservation-intent owners, cinematic fine-dining language, dark moody charcoal/aubergine + warm gold + cream + sage. Vanilla static (GitHub Pages) — skills' React/Tailwind defaults translated into hand-authored CSS/JS.

**Dials (translated to vanilla):** DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 3.

## 1) Skills invoked + how applied
| Skill | Application |
|---|---|
| `ui-ux-pro-max` | Ran `search.py "european bistro fine dining elegant cinematic" --design-system`. It returned a generic SaaS Liquid-Glass/pink palette + Inter — **rejected** as off-brief for fine dining; kept its CRITICAL rules (contrast 4.5:1, focus-visible, no-emoji SVG icons, reduced-motion, responsive 375→1440, touch ≥44px) and overrode palette/type with the dossier's cinematic charcoal/aubergine + gold + cream + sage and El Messiri/Tajawal pairing. |
| `design-taste-frontend` | Anti-slop: zero em-dashes, one accent family (gold) locked page-wide, one radius scale, single dark theme locked (no mid-page inversion), hero ≤2-line headline + short sub + 2 CTAs, eyebrow restraint, real curated photos (no div fakes), CTA contrast/wrap checks, copy self-audit. No banned beige+brass premium-consumer default (we use charcoal+gold+sage). |
| `emil-design-eng` | Custom easing `cubic-bezier(.16,1,.3,1)`; buttons `scale(.97)` on `:active`; nothing animates from `scale(0)` (plate starts `.92`); origin-aware reveals; durations ≤300ms for micro, longer only for signature; reduced-motion resolves to final state; sheen via transform only. |
| `high-end-visual-design` | Cinematic vibe archetype (Editorial Luxury / dark), macro whitespace (`py` clamp to ~118px), nested/elevated cards with tinted shadows (no harsh black), button-in-icon CTAs, no banned fonts/icons, GPU-only transform/opacity/filter, blur only on fixed header/overlays. |

## 2) ui-ux-pro-max design-system output (and override)
- Tool output: pattern Feature-Rich Showcase; style Liquid Glass; colors pink `#DB2777`+gold; type Inter.
- **Final system (override, on-brief):** bg `#15110f` charcoal, panel `#1d1714`, aubergine `#2a1c24`, ink `#f4ece1` cream, gold `#cda35a`/`#e7c688`, sage `#8aa07e`. Display **El Messiri** + body **Tajawal** (preconnect + `display=swap`). Kept the tool's pattern spirit (hero → showcase → trust → CTA) and all its accessibility checklist items.

## 3) Core UI/UX decisions
- Sticky header → blurred only after scroll; animated SVG monogram (O over a V-shaped stroke draws on load).
- Hero split (copy / cloche stage); trust bar (4.5 + 4,404 count-up); dish showcase (6 real categories, no prices = "حسب القائمة"); cinematic story; gallery + lightbox; demo reservation form; location + hours + maps; final CTA; footer; floating WhatsApp/Call/Maps FABs.
- Section-layout variety: split hero, 4-stat bar, 3-col dish grid, 2-col story, masonry gallery, 2-col form, 2-col location, centered final CTA — ≥4 distinct families.

## 4) Why these colors/fonts
Deep charcoal/aubergine reads moody and expensive at night-dining mood; warm gold = European fine-dining signal + Saudi luxury cue; cream keeps long-form Arabic legible at AA; sage is the single cool accent (used on the demo-form note + interior greenery echo). El Messiri gives an elegant Arabic display character; Tajawal is a clean, highly legible Arabic body.

## 5) Signature + ambient motion (documented)
- **Signature — Cloche lift:** silver dome `lidLift` (translate up + fade) reveals the plated dish (`plateIn` scale `.92→1`), with a gold `shimmer` sweep, three rising `steam` puffs, and a continuous cinematic `beam` sweeping the hero. All transform/opacity/filter.
- **Ambient life:** pointer parallax on hero layers capped ≤12px (off touch); a `<canvas>` gold dust-mote field drifting slowly (paused when hero off-screen via IntersectionObserver); breathing beam glow.
- **Scroll-choreography:** staggered springy `reveal-up` (translateY + blur→0) via IntersectionObserver with a 2.5s safety fallback that forces visibility.
- **Micro-interactions:** magnetic CTAs (motion-value-style transform, not state), sheen on hover, animated nav underlines, dish-card lift + image parallax-zoom, count-up on the 4.5 rating + 4,404 reviews.
- **Performance:** ≤2–3 moving groups per viewport, 60fps (transform/opacity/filter only), `prefers-reduced-motion` disables lid/beam/particles/parallax and resolves plate + reveals to final state.

## 6) Hooked / engagement
Trigger (rating + cloche curiosity) → Action (one-tap احجز/واتساب) → Variable reward (revealed dish, toast confirmation) → Investment (saved reservation in localStorage).

## 7) iOS HIG / touch
Targets ≥44px with ≥8px spacing; `:active` scale feedback <150ms; `min-h-[100dvh]`; safe full-screen overlay menu; semantic input types (`tel`/`date`/`time`) for correct mobile keyboards.

## 8) Accessibility
RTL semantic landmarks (header/nav/main/section/footer), h1→h3 no skip; cream-on-charcoal and gold-on-charcoal verified ≥4.5:1; gold-button text `#23170a` on light gold passes AA; `:focus-visible` 3px gold outline kept everywhere; every `<img>` Arabic alt + width/height + lazy (non-hero) + async decode; icon-only buttons have `aria-label`; toast `aria-live="polite"`; form errors inline below field; reduced-motion fully honored.

## 9) Taste / Impeccable acceptance
Looks expensive and cinematic? yes. Saudi-appropriate + gender-neutral copy (احجز/تواصل, never احجزي/لكِ)? yes. Convinces in 3s (rating + cloche reveal)? yes. Not a free template? bespoke palette + signature cloche animation. Spacing/images/buttons/motion cohesive? yes. **Pass.**

## 10) Curation log
Kept (9 referenced): ov-3, ov-4, ov-5, ov-6, **ov-7 (hero plate)**, ov-8 (interior), ov-9, ov-10, ov-11. Excluded: **ov-1** (storefront with a different-business "Lebanese Bistro / Cuisine" signage, off the European-bistro brand) and **ov-2** (price/menu board — bans on price boards + invented prices).
