# My Bank — Valyuta Kurslari

React + Vite + TypeScript + Tailwind CSS yordamida yaratilgan valyuta kurslari veb-ilovasi.

## Xususiyatlar

- **Bosh sahifa** — USD, EUR va RUB kurslarini chiroyli kartochkalar ko'rinishida ko'rsatadi
- **Admin panel** — kurslarni login/parol orqali boshqarish imkoniyati
- **Focus Mode** — bosh sahifada header va footer yashiriladi, faqat kurslar qoladi
- **LocalStorage** — kurslar brauzer xotirasida saqlanadi
- **Responsive** — mobil, planshet va kompyuter ekranlarida to'g'ri ko'rinadi

## Texnologiyalar

| Texnologiya | Versiya |
|---|---|
| React | 18 |
| TypeScript | ~5.8 |
| Vite | ^6 |
| Tailwind CSS | ^4 |
| React Router DOM | ^7 |
| Lucide React | latest |

## Ishga tushirish

### Talablar

- Node.js 18+
- npm yoki yarn

### O'rnatish

```bash
# Repozitoriyani klonlash
git clone <repo-url>
cd mybank

# Dependencylarni o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env
```

### `.env` fayli

`.env` faylida admin login va parol saqlanadi:

```env
VITE_ADMIN_LOGIN=admin
VITE_ADMIN_PASSWORD=admin123
```

### Development server

```bash
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.

### Production build

```bash
npm run build
npm run preview
```

## Sahifalar

### Bosh sahifa (`/`)

- 3 ta valyuta kurslari (USD, EUR, RUB) kartochkalarida ko'rsatiladi
- Kurslar `localStorage`dan `mybank_rates` kaliti bilan o'qiladi
- Default kurslar: USD=12650, EUR=13800, RUB=135

### Admin panel (`/admin`)

- Login va parol kiritish formasi
- `.env` faylida belgilangan ma'lumotlar bilan tekshiriladi
- Muvaffaqiyatli logindan so'ng kurslarni o'zgartirish mumkin
- Saqlash tugmasi `localStorage`ni yangilaydi
- "Chiqish" tugmasi bosh sahifaga qaytaradi

## Loyiha tuzilishi

```
mybank/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Sticky header: logo, focus mode, admin button
│   │   ├── Logo.tsx         # Aylanuvchi SVG logo
│   │   ├── CurrencyCard.tsx # Valyuta kartochkasi
│   │   └── Footer.tsx       # Footer
│   ├── hooks/
│   │   └── useRates.ts      # LocalStorage bilan ishlash
│   ├── pages/
│   │   ├── Home.tsx         # Bosh sahifa
│   │   └── Admin.tsx        # Admin panel
│   ├── types/
│   │   └── index.ts         # TypeScript tiplar
│   ├── App.tsx              # Root komponent, routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind import
├── .env                     # Muhit o'zgaruvchilari (gitga qo'shilmaydi)
├── .env.example             # Namuna .env fayli
├── index.html
├── vite.config.ts
└── package.json
```

## Litsenziya

MIT
