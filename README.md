# AutoMind - Vehicle Service Booking Demo

A simple, cream-coloured version of the uploaded AutoMind vehicle service project. It keeps the original project's idea and four-page flow, but uses a quieter, more human-made interface.

## Pages
- `index.html` — home page and four-step overview
- `login.html` — sign in, create account, one-click demo login
- `vehicle.html` — vehicle make/model/year, fuel type, odometer, registration and symptoms
- `ai-solution.html` — rule-based symptom matching, possible causes, severity, safety note and estimated cost range
- `booking.html` — service mode, appointment date/time, price breakdown, request reference and printable service pass
- `my-requests.html` — customer request history and live status display (pending, accepted or declined)
- `owner-login.html` — separate owner sign-in
- `owner-dashboard.html` — owner inbox with request filters, full vehicle/customer details, and accept/decline controls

## How to run
1. Extract the ZIP.
2. Open the `AutoMind-Cream` folder in VS Code.
3. Open `index.html` using Live Server, or open it directly in a browser.
4. Customer flow: Home → Login → Add Vehicle → Diagnosis → Booking → My Requests.
5. Owner flow: open `owner-login.html` and sign in using the demo owner credentials below.

No build tools or backend are required. Styling and JavaScript are in `css/styles.css`, `js/data.js`, and `js/common.js`.

## Demo behaviour and limitations
- Accounts, vehicle information, diagnostic suggestion and booking records use browser `localStorage`.
- The diagnosis is a keyword/rule-based suggestion. It is not a real cloud AI model, vehicle telemetry scan, confirmed diagnosis or professional estimate.
- Service requests are saved locally in this browser. The owner dashboard can review requests created in the same browser profile and accept or decline them; the customer sees the updated status in My Requests.
- This front-end-only demo does not sync between separate devices or browsers. For a real customer and owner using different devices, connect a backend/database and secure server-side authentication.
- Passwords are stored in browser storage for demo purposes only. Do not use a real password or sensitive personal information.

## Demo owner account
- Email: `owner@automind.in`
- Password: `Owner@2026`

The owner account is separate from customer accounts. These fixed credentials and localStorage-based sessions are for a classroom demo only, not production security.
