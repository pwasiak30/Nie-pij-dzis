# Nowy Dzień — Tracker Trzeźwości

Apka PWA (Progressive Web App) — instalujesz ją na Androidzie jak zwykłą aplikację,
działa offline, a wszystkie dane trzymane są **wyłącznie lokalnie na Twoim telefonie**
(w `localStorage` przeglądarki). Nigdzie nic nie jest wysyłane.

## Co jest w środku

- **Dziś** — licznik dni/godzin trzeźwości (osobno dla każdego śledzonego nałogu),
  łuk postępu do następnego kamienia milowego, codzienna przysięga, zaoszczędzone
  pieniądze i czas.
- **Postępy** — siatka kamieni milowych (1 dzień → 5 lat) z konfetti przy odblokowaniu,
  statystyki najczęstszych wyzwalaczy, dziennik nastroju.
- **Powody** — Twoje powody (tekst + opcjonalne zdjęcie) i "Moja historia" — osobisty
  dziennik chwil, z możliwością udostępnienia (Web Share API — wysyłasz np. na WhatsApp).
- **Wiedza** — link do dzisiejszej Codziennej Refleksji na refleksje.online (patrz niżej,
  dlaczego to link a nie wbudowany tekst) + ogólny, poglądowy harmonogram odstawienia
  z zastrzeżeniem medycznym.
- **Ty** — profil, zarządzanie trackerami (możesz śledzić kilka rzeczy naraz — alkohol,
  nikotynę, itd.), eksport/import kopii zapasowej jako plik `.json`.

## Ważna decyzja: "Refleksja dnia"

Nie mogłem wbudować treści z książki "Codzienne refleksje" (AA) na stałe do apki —
to materiał chroniony prawem autorskim, a kopiowanie go do własnej bazy danych byłoby
naruszeniem, nawet do użytku prywatnego. Zamiast tego apka ma przycisk, który otwiera
dzisiejszą stronę na refleksje.online w nowej karcie — czyli dokładnie to, co i tak
byś zrobił ręcznie, tylko jednym dotknięciem.

Jeśli wolisz mieć własne cytaty *wewnątrz* apki (np. przepisane z Twojego papierowego
egzemplarza — to już Twój prywatny użytek, w pełni legalny), daj znać — dopiszę prosty
plik z cytatami, które apka będzie losować.

## Jak wgrać na telefon (GitHub Pages)

1. Załóż w swoim repo na GitHubie nowy folder, np. `nowy-dzien/`, i wrzuć tam
   **wszystkie pliki z tego folderu** (zachowując strukturę: `index.html`, `manifest.json`,
   `service-worker.js`, folder `fonts/`, folder `icons/`).
2. W ustawieniach repo: **Settings → Pages → Source: Deploy from a branch** (branch `main`,
   folder `/` lub `/nowy-dzien` w zależności gdzie wrzuciłeś).
3. Po chwili apka będzie pod adresem `https://twoj-login.github.io/nazwa-repo/nowy-dzien/`.
4. Na telefonie otwórz ten adres w Chrome → menu (⋮) → **"Dodaj do ekranu głównego"**.
   Od tej pory otwiera się jak normalna apka, w pełnym ekranie, bez paska przeglądarki.

**Ważne:** Podbijaj numer w `CACHE_NAME` na górze `service-worker.js` (np. `v1` → `v2`)
za każdym razem, gdy zmienisz pliki i wgrasz nową wersję — inaczej telefony będą trzymać
starą wersję z pamięci podręcznej.

## Czego celowo nie ma

- **Powiadomienia push / przypomnienia o określonej porze** — statyczna apka bez
  własnego serwera nie jest w stanie niezawodnie budzić Cię codziennie o 8:00, żeby
  przypomnieć o przysiędze (przeglądarka nie działa w tle, gdy apka jest zamknięta).
  Zrobienie tego porządnie wymagałoby backendu z Web Push — to możliwe jako kolejny krok,
  ale to już inny poziom złożoności.
- **Backup w chmurze / synchronizacja między urządzeniami** — wszystko lokalnie,
  dlatego ważne żeby czasem zrobić eksport (zakładka Ty → Eksportuj kopię zapasową)
  i zapisać plik gdzieś bezpiecznie (np. w Google Drive).
- **Grupy / społeczność** — to już wymagałoby prawdziwego serwera i kont użytkowników.

## Zdjęcia i pamięć

Zdjęcia dodane do powodów / historii są kompresowane i trzymane jako tekst w
`localStorage`, który ma limit ok. 5–10 MB na przeglądarkę. To starczy na sporo wpisów,
ale nie w nieskończoność — jeśli kiedyś zacznie brakować miejsca, warto przejść na
IndexedDB (mogę to dopisać, gdy będzie potrzebne).
