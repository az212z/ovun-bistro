# أوفن بيسترو · Ovun Bistro

موقع تعريفي فاخر (بسترو أوروبي راقٍ) في الرياض — عربي RTL، صفحة واحدة (vanilla static)، جاهز للنشر على GitHub Pages.

## الرابط المباشر
- بعد النشر: `https://az212z.github.io/ovun-bistro/`

## حالة الـ Backend
- **لا يوجد backend.** الموقع ثابت (static) بالكامل.
- نموذج «احجز طاولة» **تجريبي**: يتحقّق من الحقول، يحفظ نسخة في `localStorage`، ثم يفتح محادثة واتساب (`wa.me/966533615888`) برسالة عربية جاهزة بتفاصيل الحجز + يعرض إشعار (toast). لا تُرسَل بيانات لأي خادم.

## مصدر الصور
- صور حقيقية من ملف المطعم على **خرائط قوقل**، تمّت معالجتها وتحسينها مسبقًا (color-grading احترافي).
- تمّت تنقية الصور (Curation): استُبعدت لوحة الأسعار/المنيو وصورة الواجهة ذات لافتة جهة أخرى. المُستخدَم: `ov-3, ov-4, ov-5, ov-6, ov-7, ov-8, ov-9, ov-10, ov-11`.

## بيانات النشاط
- الاسم: أوفن بيسترو (Ovun Bistro) · الرياض
- النوع: بسترو أوروبي راقٍ (أطباق عالمية، باستا وريزوتو، لحوم ومأكولات بحرية، سلطات ومقبّلات، حلويات)
- التقييم: **4.5** على خرائط قوقل (**4,404** مراجعة) — مذكور بوضوح في الموقع
- الهاتف: 0533615888 · واتساب: 966533615888
- الموقع: https://www.google.com/maps/search/?api=1&query=Ovun%20Bistro%20Riyadh

## المميزات
- موشن توقيعي: غطاء فضي (cloche) يرتفع ليكشف الطبق + بخار + لمعة ذهبية + شعاع ضوء سينمائي.
- حياة محيطة: بارالاكس خفيف على الهيرو (مؤشر، ≤12px، معطّل على اللمس)، جزيئات ذهبية بطيئة، توهّج يتنفّس.
- كوريغرافيا سكول متدرّجة، أزرار مغناطيسية + sheen، count-up للتقييم، رسم مونوغرام SVG عند التحميل.
- قائمة جوال ملء الشاشة (100vw/100dvh)، lightbox للمعرض، FABs عائمة (واتساب/اتصال/خرائط).
- a11y: تباين ≥4.5:1، focus-visible، aria-labels، دعم `prefers-reduced-motion` كامل.

## التشغيل محليًا
```bash
npx http-server -p 4173 -c-1 .
# ثم افتح http://localhost:4173
```

## الاختبارات (Playwright)
```bash
npm i -D @playwright/test http-server
npx playwright install
npx playwright test
```

## الملفات
`index.html` · `404.html` · `assets/css/style.css` · `assets/js/main.js` · `assets/img/*` · `favicon.svg` · `tests/site.spec.ts` · `playwright.config.ts` · `DESIGN-QUALITY-REPORT.md` · `sales-message.md` · `.nojekyll`
