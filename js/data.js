
const STORAGE_KEYS={USER:'automind_user',USERS:'automind_users',VEHICLE:'automind_vehicle',AI_SOLUTION:'automind_solution',BOOKING:'automind_booking',BOOKINGS:'automind_bookings',OWNER_SESSION:'automind_owner_session'};
const MAKES={
'Tata':['Nexon','Punch','Tiago','Altroz','Harrier','Safari'],
'Maruti Suzuki':['Swift','Baleno','Brezza','Wagon R','Dzire','Fronx'],
'Hyundai':['i20','Creta','Venue','Verna','Grand i10 Nios'],
'Honda':['City','Amaze','Elevate','Jazz'],
'Toyota':['Innova Hycross','Fortuner','Glanza','Urban Cruiser Hyryder','Camry'],
'Mahindra':['Thar','XUV 3XO','Scorpio-N','XUV700','Bolero'],
'Kia':['Seltos','Sonet','Carens'],
'BMW':['3 Series','5 Series','X1','X3'],
'Mercedes-Benz':['C-Class','E-Class','GLA','GLC'],
'Tesla':['Model 3','Model Y'],
'Ford':['EcoSport','Endeavour','Figo'],
'Audi':['A4','A6','Q3','Q5'],
'Other':['Other']
};
const DIAGNOSTIC_DATABASE=[
{id:'brakes',keywords:['brake','squeal','grinding','grind','stopping'],title:'Brake system inspection',severity:'Warning',confidence:91,summary:'The symptoms may be related to worn brake pads, rotor wear, or debris around the braking system. A physical inspection is needed to identify the actual cause.',causes:['Brake pads may be worn or uneven','Brake rotor surface may be damaged','Dust or debris may be caught near the brake components'],safetyRisk:'If the brakes grind, feel weak, or the stopping distance increases, do not continue driving. Arrange a workshop inspection.',low:1800,high:8500,package:'Brake inspection & service',packageDescription:'Brake pad, rotor and fluid condition check'},
{id:'engine',keywords:['engine','misfire','starting','stall','knock','check engine','rough idle'],title:'Engine performance check',severity:'Warning',confidence:84,summary:'Starting trouble or uneven engine running can come from ignition, air intake, fuel delivery, battery, or sensor issues. A diagnostic check can narrow it down.',causes:['Battery or starter condition may need testing','Ignition or fuel delivery may be inconsistent','A sensor or air intake issue may affect engine operation'],safetyRisk:'If the engine stalls, overheats, or shows a flashing warning light, stop somewhere safe and seek professional assistance.',low:1200,high:9500,package:'Engine diagnostic inspection',packageDescription:'Initial checks for starting, ignition and engine performance'},
{id:'ac',keywords:['ac','air conditioning','warm air','cooling','heater'],title:'Air-conditioning system check',severity:'Routine',confidence:82,summary:'Warm air or weak cooling may be caused by low refrigerant, airflow restriction, or a component that needs inspection.',causes:['Cabin filter may be clogged','Refrigerant level may need checking','Cooling fan or compressor operation may need inspection'],safetyRisk:'Usually not a drivability concern, but get unusual smells, smoke, or electrical symptoms checked promptly.',low:900,high:6500,package:'AC inspection & cooling check',packageDescription:'Airflow, cooling performance and visible component checks'},
{id:'battery',keywords:['battery','clicking','electrical','lights','power'],title:'Battery and electrical check',severity:'Warning',confidence:85,summary:'Clicking on startup or electrical problems can be associated with a weak battery, loose connections, or charging-system faults.',causes:['Battery charge or health may be low','Battery terminals may be loose or corroded','Alternator or starter may need testing'],safetyRisk:'If electrical systems fail while driving, pull over safely. Avoid touching damaged wiring.',low:600,high:5000,package:'Battery & charging check',packageDescription:'Battery health, terminals and charging-system test'},
{id:'tyres',keywords:['tyre','tire','puncture','wheel','vibration','steering'],title:'Tyre and wheel inspection',severity:'Warning',confidence:80,summary:'Vibration, a puncture, or a change in steering can come from tyre damage, pressure, wheel balance, or suspension components.',causes:['Tyre pressure or tread may be uneven','Wheel balancing or alignment may be needed','Visible tyre damage should be checked'],safetyRisk:'Do not drive on a visibly damaged or flat tyre. If steering becomes difficult, stop safely.',low:300,high:4500,package:'Tyre & wheel check',packageDescription:'Tyre condition, pressure and basic wheel inspection'},
{id:'oil',keywords:['oil','leak','fluid','service','filter','routine','maintenance'],title:'Routine service and fluid check',severity:'Routine',confidence:88,summary:'The reported issue may be related to routine maintenance or a fluid leak. The workshop should confirm the source and check fluid levels.',causes:['Oil and filter service may be due','A fluid level or visible leak may need checking','Belts, hoses and common service items may need inspection'],safetyRisk:'If a fluid leak is heavy, an oil-pressure warning appears, or the engine overheats, stop the vehicle and seek help.',low:1200,high:7000,package:'Routine service inspection',packageDescription:'Oil, filters, fluids and general vehicle condition'},
{id:'general',keywords:[],title:'General vehicle inspection',severity:'Routine',confidence:72,summary:'The description does not clearly match one fault category. A general inspection is a sensible first step before deciding on repairs.',causes:['A technician can inspect the reported symptoms','A short road test may help if the vehicle is safe to drive','The workshop can confirm parts and labour after inspection'],safetyRisk:'If you notice smoke, burning smells, major leaks, overheating, or braking or steering problems, do not drive until the vehicle is checked.',low:700,high:8000,package:'General inspection',packageDescription:'Initial assessment and recommendation'}
];
function readStore(key,fallback=null){try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}}
function writeStore(key,value){localStorage.setItem(key,JSON.stringify(value))}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function currentUser(){return readStore(STORAGE_KEYS.USER,null)}
function showToast(message){const el=document.createElement('div');el.className='toast';el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2600)}
function logoutUser(){localStorage.removeItem(STORAGE_KEYS.USER);location.href='login.html'}
function setNavAuth(){const target=document.getElementById('nav-auth-container');if(!target)return;const user=currentUser();target.innerHTML=user?`<a class="header-action" href="vehicle.html">${escapeHtml(user.name.split(' ')[0])} · Continue</a>`:`<a class="header-action" href="login.html">Sign in</a>`}
function renderProgress(active){const steps=[['login','1','Login'],['vehicle','2','Vehicle'],['solution','3','Diagnosis'],['booking','4','Booking']];return `<div class="progress">${steps.map((s,i)=>`${i?'<div class="progress-line"></div>':''}<div class="progress-step ${i<active?'done':i===active?'active':''}"><span class="num">${i<active?'✓':s[1]}</span><span>${s[2]}</span></div>`).join('')}</div>`}
function money(n){return '₹'+Number(n||0).toLocaleString('en-IN')}
function getVehicle(){return readStore(STORAGE_KEYS.VEHICLE,null)}
function getSolution(){return readStore(STORAGE_KEYS.AI_SOLUTION,null)}
function getBooking(){return readStore(STORAGE_KEYS.BOOKING,null)}
function requireLogin(){if(!currentUser()){location.href='login.html';return false}return true}
function renderHeader(){setNavAuth();const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(a=>{if(a.getAttribute('href')===path)a.classList.add('active')})}
document.addEventListener('DOMContentLoaded',renderHeader);

// Fixed credentials for this front-end-only college project demo. Do not use for production authentication.
const OWNER_ACCOUNT={name:'AutoMind Workshop Owner',email:'owner@automind.in',password:'Owner@2026',role:'owner'};
