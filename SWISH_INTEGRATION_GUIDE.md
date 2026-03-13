# Swish Integration Guide

Denna guide beskriver hur Swish-betalningar ska hanteras i TrafficSchool enligt Swish officiella varumärkesriktlinjer.

## 📋 Innehåll

1. [Swish-logotyper](#swish-logotyper)
2. [Godkända meddelanden](#godkända-meddelanden)
3. [Designriktlinjer](#designriktlinjer)
4. [Komponenter](#komponenter)

## 🎨 Swish-logotyper

Swish-logotyper ska placeras i `src/assets/swish/` mappen.

### Logotyper som behövs:

- **Primär logotyp** (vertikal variant med ordmärket)
  - `swish-logo-primary-light.svg` - För ljus bakgrund
  - `swish-logo-primary-dark.svg` - För mörk bakgrund
- **Ikon för QR-koder**
  - `swish-qr-icon.svg`

### Användningsregler:

✅ **GÖR:**

- Placera logotypen på vit eller mycket ljus bakgrund
- Se till att det finns tillräckligt med utrymme runt logotypen
- Använd endast nedladdade originalfiler

❌ **GÖR INTE:**

- Redigera eller förvränga logotypen
- Placera logotypen på mörk bakgrund utan vit platta
- Ta isär logotypen
- Använda "Swish" i domän- eller produktnamn

## ✍️ Godkända meddelanden

Enligt Swish riktlinjer ska vi använda följande fraser:

### Rekommenderade texter:

- ✅ "Vill du betala med Swish?"
- ✅ "Betala med Swish"
- ✅ "Slutför din betalning med Swish"
- ✅ "Din betalning med Swish har slutförts"
- ✅ "Säker betalning med Swish"

### Exempel på ej godkända texter:

- ❌ "Swish din betalning"
- ❌ "Vår Swish-lösning"
- ❌ Använda "Swish" som verb

### Viktig information:

Alltid klargöra att Swish är en **oberoende betaltjänst** och inte en del av TrafficSchool.

## 🎨 Designriktlinjer

### Färger

- **Primär knappfärg**: `bg-gray-900` (mörkgrå/svart)
- **Hover**: `hover:bg-gray-800`
- **Text**: Vit text på mörka knappar
- **Bakgrunder**: Ljusa, neutrala toner (grå-50, vit)

### Knappar

```jsx
// Korrekt format enligt riktlinjer
<button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl">
  Betala med Swish
</button>
```

### QR-kod presentation

```jsx
<div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
  <div className="bg-white p-5 rounded-lg shadow-md border-2 border-gray-200">
    <QRCode value={qrCodeData} size={200} level="H" />
  </div>
  <p className="text-center text-sm text-gray-600 mt-4">
    Scanna QR-koden i Swish-appen
  </p>
</div>
```

## 🧩 Komponenter

### PaymentFlow

Huvudkomponent för betalningsflödet. Hanterar:

- Inmatning av mobilnummer
- Visa QR-kod
- Polling av betalningsstatus
- Success/error hantering

**Fil:** `src/features/payment/components/PaymentFlow.jsx`

### PackageCard

Visar prenumerationspaket med Swish-branding.

**Fil:** `src/features/payment/components/PackageCard.jsx`

### SwishPaymentInstructions

Ger kunder steg-för-steg instruktioner.

**Fil:** `src/features/payment/components/SwishPaymentInstructions.jsx`

## 📱 Användarflöde

1. **Val av paket** - PackageCard visar "Betala med Swish"
2. **Mobilnummer** - Användare anger sitt Swish-nummer
3. **QR-kod** - PaymentFlow visar QR-kod och instruktioner
4. **Bekräftelse** - Success-meddelande när betalning genomförd

## 🔒 Säkerhet & Integritet

Alla meddelanden ska klargöra:

- ✅ "Betalningen hanteras säkert av Swish, en oberoende betaltjänst"
- ✅ Visa att Swish är en separat tjänst
- ✅ Använd HTTPS för alla betalningar

## 📚 Referenser

- [Swish Varumärkesriktlinjer](https://www.swish.nu)
- Swish Logotyper - Tillgängliga för nedladdning från Swish officiella webbplats

## ⚠️ Viktiga påminnelser

1. **Kopiera aldrig Swish varumärke** - Använd din egen visuella identitet
2. **Tydlighet** - Gör det tydligt att ditt varumärke står bakom budskapet
3. **Enkelhet** - Håll det informativt och luftigt
4. **Oberoende** - Swish är en oberoende tjänst, inte del av TrafficSchool

---

**Senast uppdaterad:** 2026-02-18
