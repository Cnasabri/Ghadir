'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const quiet=matchMedia('(prefers-reduced-motion: reduce)');
const floorNames=['اول','دوم','سوم','چهارم','پنجم','ششم','هفتم'];
const floorPages=[17,18,21,22,25,26,29];
const names=['هویت پروژه','گروه ساختمانی زاگرس','موقعیت پروژه','نقشه و نمای هوایی','معرفی ساختمان','ساختار و امکانات','معماری و نمای شب','ورودی و لابی','فضای لابی','جزئیات لابی','تراس و فضای سبز','زندگی در تراس','مجموعه آبی','امکانات ورزشی','پارکینگ','معماری و نمای ساختمان','پلان طبقه اول','پلان طبقه دوم','طراحی فضای داخلی','فضاهای نشیمن','پلان طبقه سوم','پلان طبقه چهارم','اتاق خواب','جزئیات فضای خواب','پلان طبقه پنجم','پلان طبقه ششم','نشیمن و طراحی داخلی','فضاهای داخلی','پلان طبقه هفتم','سرویس و حمام','نمای بیرونی','چشم‌انداز ساختمان','نمای شب و پایان آلبوم'];
// Source-plan coordinates (100 × 100), not guessed DOM hit boxes.
const shape={
 A:[ '67,69 75,69 75,86 67,86', '76,75 90,75 90,86 76,86', '78,59 90,59 90,75 78,75 78,69 75,69 75,65 78,65', '67,49 75,49 75,62 67,62', '78,37 90,37 90,47 78,47', '78,25 90,25 90,37 78,37 78,33 75,33 75,28 78,28', '75,13 90,13 90,25 79,25 79,29 68,29 68,23 75,23', '61,15 70,15 70,23 68,23 68,29 61,29', '53,15 61,15 61,29 65,29 65,32 53,32' ],
 B:[ '7,65 17,65 17,80 13,80 13,86 7,86', '13,80 17,80 17,74 26,74 26,80 22,80 22,86 13,86', '26,74 32,74 32,71 44,71 44,86 26,86', '25,63 42,63 44,66 44,71 25,71', '7,54 17,54 17,65 7,65', '21,40 29,40 29,52 21,52', '7,31 17,31 17,44 7,44', '7,26 13,26 13,31 17,31 17,37 7,37', '7,21 28,21 28,31 30,31 30,34 19,34 19,30 13,30 13,26 7,26' ]
};
// Values transcribed from the supplied specification pages; decimal slash means decimal point.
const areas=[
 {A:[105.7,132.7,139.5,83.5,79.2,102.2,137,95.7,101],B:[107,107,97,101,87.5,80,78.5,141,132]},
 {A:[105.7,125,137.8,81.2,79.2,113,137,95.7,101],B:[101.8,107,97,101,87.5,80.5,78.5,134.3,135.5]},
 {A:[105.7,137,153.6,92,79.2,102.2,137,95.7,101],B:[107,107,97,101,87.5,80,78.5,141,132]},
 {A:[105.7,120.6,145.4,79.2,92,108.2,130.7,101,95.7],B:[101.8,107,97,101,87.5,80,78.5,141,111.6]},
 {A:[105.7,137,153.6,79.2,92,102.2,137,101,95.7],B:[107,107,97,101,87.5,80,78.5,141,132]},
 {A:[105.7,125.5,145.4,79.2,92,108.2,137,101,95],B:[101.8,107,97,101,87.5,80,78.5,140,111.6]},
 {A:[105.7,135.5,153.7,79.2,92,101.2,137.5,95.5,101],B:[107,107,97,87.5,101,80.5,78.5,139.5,132]}
];
// Trace the unit boundary including its terraces. Floors have different A4/A5 positions.
shape.A[4]='53,32 69,32 69,39 61,39 61,40 53,40';
shape.B[2]='26,74 32,74 32,73 36,73 36,86 26,86';
shape.B[3]='32,71 44,71 44,86 36,86 36,73 32,73';
shape.B[5]='25,63 42,63 44,66 44,71 25,71';
shape.B[6]='21,40 29,40 29,52 21,52';
shape.B[7]='7,26 13,26 13,31 17,31 17,44 7,44';
const threeBeds=[['A2','A3','A7','B8','B9'],['A2','A3','A7','B8','B9'],['A2','A3','B8'],['A2','A3','B8'],['A2','A3','A7','B8'],['A2','A3','A7','B8'],['A2','A3','B8']];
let floor=1,selected=null,filter='all';
function units(){return ['A','B'].flatMap(block=>Array.from({length:9},(_,i)=>{let points=shape[block][i];if(block==='A'){
 if(i===3&&floor===3)points='78,37 90,37 90,47 78,47';
 if(i===4&&floor===3)points='53,32 69,32 69,62 67,62 67,39 61,39 61,40 53,40';
 if(i===3&&floor>3)points='53,32 69,32 69,62 67,62 67,39 61,39 61,40 53,40';
 if(i===4&&floor>3)points='78,37 90,37 90,47 78,47';
 if([4,5,6].includes(floor)&&i===7)points=shape.A[8];
 if([4,5,6].includes(floor)&&i===8)points=shape.A[7];
}return {id:`${block}-${(floor-1)*9+i+1}`,block,index:i,floor,area:areas[floor-1][block][i],beds:threeBeds[floor-1].includes(block+(i+1))?3:2,points};}));}
function figure(src,title,extra=''){return `<button class="photo" data-src="${src}" data-title="${title}" ${extra}><img src="${src}" alt="${title}" loading="lazy"></button>`;}
const dock=[['پروژه','غدیر، با امضای زاگرس','معرفی ساختمان، موقعیت و معماری پروژه.','story','کشف پروژه'],['پلان','خانه‌تان را پیدا کنید','هفت طبقه، دو بلوک و انتخاب مستقل واحدها.','plans','انتخاب واحد'],['فضاها','زندگی در جزئیات','لابی، تراس، مجموعه آبی و فضاهای داخلی.','spaces','کشف فضاها'],['آلبوم','روایت کامل غدیر','۳۳ صفحه، با ترتیب اصلی و نمایش تمام‌صفحه.','album','مرور آلبوم']];
$('#dock').innerHTML=dock.map((d,i)=>`<div class="dock-cell"><div class="dock-panel" id="dock-${i}" hidden><p class="eyebrow">غدیر / ${fa(i+1)}</p><h3>${d[1]}</h3><p>${d[2]}</p><a href="#${d[3]}">${d[4]} ↙</a></div><button class="dock-button" aria-expanded="false" aria-controls="dock-${i}"><span>${d[0]}</span><small>${fa(i+1)} / ＋</small></button></div>`).join('');
$$('.dock-button').forEach(b=>b.onclick=()=>{const open=b.getAttribute('aria-expanded')==='true';$$('.dock-panel').forEach(p=>p.hidden=true);$$('.dock-button').forEach(x=>x.setAttribute('aria-expanded','false'));if(!open){$('#'+b.getAttribute('aria-controls')).hidden=false;b.setAttribute('aria-expanded','true');}});
const spaces=[['lobby','ورود به آرامش','لابی و فضاهای پذیرایی مشترک'],['garden','سبز، در ارتفاع','تراس‌ها و فضاهای باز ساختمان'],['pool','لحظه‌ای برای خودتان','مجموعه آبی و امکانات ورزشی'],['parking','آسودگی، در هر قدم','پارکینگ و فضاهای خدماتی']];
$('#space-grid').innerHTML=spaces.map(s=>`<article class="space-card reveal"><div class="marked">${figure(`assets/web/${s[0]}.webp`,s[1])}<button class="marker" aria-label="اطلاعات ${s[1]}" aria-expanded="false">＋</button><div class="marker-note" hidden>${s[2]}<br>تصویر از بروشور پروژه غدیر</div></div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join('');
$$('.marker').forEach(m=>m.onclick=()=>{const show=m.getAttribute('aria-expanded')!=='true';$$('.marker-note').forEach(n=>n.hidden=true);$$('.marker').forEach(x=>x.setAttribute('aria-expanded','false'));m.setAttribute('aria-expanded',String(show));m.nextElementSibling.hidden=!show;});
document.addEventListener('click',e=>{if(!e.target.closest('.marker,.marker-note')){$$('.marker-note').forEach(n=>n.hidden=true);$$('.marker').forEach(x=>x.setAttribute('aria-expanded','false'));}});
let detail=0;const detailPhotos=['living','bedroom','lobby','garden'];
function detailRender(){ $('#detail-images').innerHTML=Array.from({length:4},(_,i)=>{const n=(i+detail)%4;return figure(`assets/web/${detailPhotos[n]}.webp`,['نشیمن','اتاق خواب','لابی','تراس'][n]);}).join('');$('#detail-count').textContent=`${fa(detail+1)} / ۴`;$('#detail-images').classList.toggle('shift',detail%2===1);}
detailRender();$('#detail-prev').onclick=()=>{detail=(detail+3)%4;detailRender();};$('#detail-next').onclick=()=>{detail=(detail+1)%4;detailRender();};
let detailVisible=false;new IntersectionObserver(es=>{detailVisible=es[0].isIntersecting;if(!detailVisible){detail=0;detailRender();}},{threshold:.25}).observe($('.detail-story'));
setInterval(()=>{if(detailVisible&&!document.hidden&&!quiet.matches&&!$('#viewer').open){detail=(detail+1)%4;detailRender();}},6500);
$('#floor-tabs').innerHTML=floorNames.map((name,i)=>`<button id="floor-tab-${i+1}" role="tab" aria-controls="plan-canvas" aria-selected="${i===0}" data-floor="${i+1}">طبقه ${name}</button>`).join('');
function cropStyle(u){const pairs=u.points.split(' ').map(p=>p.split(',').map(Number));const xs=pairs.map(p=>p[0]),ys=pairs.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};}
function unitCrop(u){const c=cropStyle(u);return `<svg class="unit-plan" viewBox="${c.x-1} ${c.y-1} ${c.w+2} ${c.h+2}" role="img" aria-label="پلان مستقل واحد ${u.id}"><defs><clipPath id="crop-${u.id}"><polygon points="${u.points}"/></clipPath></defs><image href="assets/plans/floor-${u.floor}.jpg" width="100" height="100" clip-path="url(#crop-${u.id})"/></svg>`;}
function unitSelect(id,go=false){selected=units().find(u=>u.id===id);if(!selected)return;const u=selected;
$$('.unit-zone').forEach(p=>{p.classList.toggle('selected',p.dataset.unit===id);p.setAttribute('aria-pressed',String(p.dataset.unit===id));});$$('.unit-list button').forEach(b=>b.classList.toggle('selected',b.dataset.unit===id));
$('#unit-card').innerHTML=`<p class="eyebrow">بلوک ${u.block} / طبقه ${floorNames[floor-1]}</p><h3>واحد <bdi>${u.id}</bdi></h3><div class="unit-facts"><span><b>${fa(u.area)}</b>متر مربع</span><span><b>${fa(u.beds)}</b>خواب</span><span><b>${fa(floor)}</b>طبقه</span></div>${unitCrop(u)}<p>پلان این واحد از پلان همان طبقه جدا شده است. مشخصات چاپ‌شده را در بخش جزئیات بررسی کنید.</p><button class="primary" id="unit-explore">مشاهده جزئیات واحد ↙</button>`;
$('#unit-explore').onclick=()=>showUnit(true);if(go)showUnit(true);
}
function showUnit(scroll=false){if(!selected)return;const u=selected;const target=$('#unit-detail');target.hidden=false;target.innerHTML=`<p class="eyebrow">خانه انتخابی شما / طبقه ${floorNames[floor-1]}</p><h3>واحد <bdi>${u.id}</bdi> · ${fa(u.area)} متر مربع</h3><div class="unit-detail-grid"><div>${unitCrop(u)}<p>پلان مستقل واحد انتخاب‌شده. برای مشاهده جزئیات و نوشته‌های نقشه، پلان کامل طبقه را بزرگ کنید.</p><button class="text-link" data-src="assets/plans/floor-${floor}.jpg" data-title="پلان طبقه ${floorNames[floor-1]}">بزرگنمایی پلان کامل ↗</button></div><div>${figure(`assets/plans/specs-${floor}.jpg`,`مشخصات چاپ‌شده طبقه ${floorNames[floor-1]}`)}<p>مشخصات تمام واحدهای این طبقه در سند اصلی؛ رندرهای داخلی آلبوم معرفی طراحی پروژه‌اند و انتساب اختصاصی آن‌ها به این واحد در PDF مشخص نشده است.</p><button class="primary" id="copy-unit">کپی درخواست این واحد</button></div></div>`;$('#copy-unit').onclick=()=>copyRequest(u,$('#copy-unit'));if(scroll)target.scrollIntoView({behavior:quiet.matches?'instant':'smooth',block:'start'});}
function renderFloor(){const list=units();$('#floor-title').textContent=`طبقه ${floorNames[floor-1]} · ۱۸ واحد`;$('#plan-canvas').setAttribute('role','tabpanel');$('#plan-canvas').setAttribute('aria-labelledby',`floor-tab-${floor}`);$('#plan-canvas').innerHTML=`<svg viewBox="0 0 100 100" aria-label="پلان تعاملی طبقه ${floorNames[floor-1]}"><image href="assets/plans/floor-${floor}.jpg" width="100" height="100"/>${list.map(u=>`<polygon class="unit-zone" points="${u.points}" role="button" tabindex="0" aria-label="واحد ${u.id}، ${fa(u.area)} متر مربع" aria-pressed="false" data-unit="${u.id}"><title>واحد ${u.id}</title></polygon>`).join('')}</svg>`;renderList();$('#unit-detail').hidden=true;unitSelect(list[0].id);$$('[data-floor]').forEach(b=>{b.setAttribute('aria-selected',String(Number(b.dataset.floor)===floor));b.tabIndex=Number(b.dataset.floor)===floor?0:-1;});}
function renderList(){$('#unit-list').innerHTML=units().filter(u=>filter==='all'||u.block===filter).map(u=>`<button data-unit="${u.id}"><bdi>${u.id}</bdi> · ${fa(u.area)} م²</button>`).join('');}
$('#floor-tabs').onclick=e=>{const b=e.target.closest('[data-floor]');if(b){floor=Number(b.dataset.floor);renderFloor();}};
$('#floor-tabs').onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();floor=e.key==='Home'?1:e.key==='End'?7:(floor-1+(e.key==='ArrowLeft'?1:6))%7+1;renderFloor();$(`#floor-tab-${floor}`).focus();}};
$('#block-filter').onchange=e=>{filter=e.target.value;renderList();if(selected)$$('.unit-list button').forEach(b=>b.classList.toggle('selected',b.dataset.unit===selected.id));};
document.addEventListener('click',e=>{const unit=e.target.closest('[data-unit]');if(unit){const second=unit.classList.contains('unit-zone')&&selected?.id===unit.dataset.unit;unitSelect(unit.dataset.unit,second);}});
document.addEventListener('keydown',e=>{const unit=e.target.closest('.unit-zone');if(unit&&['Enter',' '].includes(e.key)){e.preventDefault();unitSelect(unit.dataset.unit);}});
$('#open-floor').onclick=()=>openViewer([{src:`assets/plans/floor-${floor}.jpg`,title:`پلان طبقه ${floorNames[floor-1]}`}],0);
renderFloor();
const categories=['همه صفحات','پروژه و موقعیت','فضاهای مشترک','پلان‌ها','فضاهای داخلی','نماها'];
function category(i){if(floorPages.includes(i+1))return 3;if(i<6)return 1;if(i<15)return 2;if([18,19,22,23,26,27,29].includes(i))return 4;return 5;}
$('#album-filters').innerHTML=categories.map((c,i)=>`<button data-category="${i}" aria-pressed="${i===0}">${c}</button>`).join('');
function renderAlbum(c=0){$('#album-grid').innerHTML=names.map((n,i)=>({n,i})).filter(({i})=>c===0||category(i)===c).map(({n,i})=>`<article class="album-item">${figure(`assets/web/page-${String(i+1).padStart(2,'0')}.webp`,n,`data-page="${i+1}"`)}<p>${fa(String(i+1).padStart(2,'0'))} / ${n}</p></article>`).join('');}
renderAlbum();$('#album-filters').onclick=e=>{const b=e.target.closest('[data-category]');if(b){$$('[data-category]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderAlbum(Number(b.dataset.category));}};
// Viewer preserves scroll and focus; image click toggles zoom, never dismissal.
const viewer=$('#viewer');let gallery=[],current=0,origin=null,originScroll=0,closing=false;
function refreshViewer(){$('#viewer-image').src=gallery[current].src;$('#viewer-image').alt=gallery[current].title;$('#viewer-title').textContent=gallery[current].title;$('#viewer-count').textContent=`${fa(current+1)} / ${fa(gallery.length)}`;viewer.classList.remove('image-zoomed');$('#viewer-image').setAttribute('aria-pressed','false');$('#viewer-prev').hidden=gallery.length<2;$('#viewer-next').hidden=gallery.length<2;const key=$('#viewer-keyplan');key.hidden=!selected||!gallery[current].title.includes('پلان');if(!key.hidden)key.innerHTML=`${unitCrop(selected)}<bdi>${selected.id}</bdi>`;}
function openViewer(items,index){gallery=items;current=index;origin=document.activeElement;originScroll=scrollY;const source=origin?.querySelector?.('img'),from=source?.getBoundingClientRect();refreshViewer();viewer.showModal();document.body.style.overflow='hidden';if(!quiet.matches){viewer.animate([{opacity:0},{opacity:1}],{duration:500});if(source&&from.width){const target=$('#viewer-image');target.decode().catch(()=>{}).then(()=>{if(!viewer.open||closing)return;const to=target.getBoundingClientRect(),ghost=document.createElement('img');ghost.src=source.currentSrc;ghost.className='morph-image';viewer.append(ghost);target.style.visibility='hidden';ghost.animate([{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px'},{left:to.left+'px',top:to.top+'px',width:to.width+'px',height:to.height+'px'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}).finished.catch(()=>{}).finally(()=>{ghost.remove();target.style.visibility='';});});}}$('#viewer-close').focus();}
async function closeViewer(){if(closing||!viewer.open)return;closing=true;$$('.morph-image').forEach(g=>{g.getAnimations().forEach(a=>a.cancel());g.remove();});$('#viewer-image').style.visibility='';if(!quiet.matches)await viewer.animate([{opacity:1},{opacity:0}],{duration:280}).finished.catch(()=>{});viewer.close();document.body.style.overflow='';window.scrollTo({top:originScroll,behavior:'instant'});origin?.focus({preventScroll:true});closing=false;}
$('#viewer-close').onclick=closeViewer;viewer.addEventListener('cancel',e=>{e.preventDefault();closeViewer();});
function moveViewer(delta){current=(current+delta+gallery.length)%gallery.length;refreshViewer();}
$('#viewer-prev').onclick=()=>moveViewer(-1);$('#viewer-next').onclick=()=>moveViewer(1);
function zoom(){const active=viewer.classList.toggle('image-zoomed');$('#viewer-image').setAttribute('aria-pressed',String(active));}
$('#viewer-image').onclick=zoom;$('#viewer-image').onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();zoom();}};
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight')moveViewer(-1);if(e.key==='ArrowLeft')moveViewer(1);if(e.key==='Tab'){const els=[...viewer.querySelectorAll('button,[tabindex="0"]')].filter(x=>!x.hidden);const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
document.addEventListener('click',e=>{const p=e.target.closest('[data-page]');if(p){const pages=names.map((n,i)=>({src:`assets/pages/page-${String(i).padStart(3,'0')}.jpg`,title:`صفحه ${fa(i+1)} / ${n}`}));openViewer(pages,Number(p.dataset.page)-1);return;}const b=e.target.closest('[data-src]');if(b)openViewer([{src:b.dataset.src,title:b.dataset.title}],0);});
async function copyRequest(u,status){const text=u?`سلام، برای دریافت اطلاعات و هماهنگی بازدید واحد ${u.id} در طبقه ${floorNames[u.floor-1]} پروژه غدیر، با مساحت ${fa(u.area)} متر مربع، درخواست راهنمایی دارم.`:'سلام، برای دریافت اطلاعات و هماهنگی بازدید پروژه غدیر درخواست راهنمایی دارم.';try{await navigator.clipboard.writeText(text);status.textContent='درخواست کپی شد';}catch{status.textContent=text;}}
$('#copy-request').onclick=()=>copyRequest(selected,$('#copy-status'));
// Reveal at 68% viewport height, reset only after full exit, replay on return.
if(!quiet.matches){document.documentElement.classList.add('js-motion');const reveals=$$('.reveal');function reveal(){for(const el of reveals){const r=el.getBoundingClientRect();if(r.top<innerHeight*.68&&r.bottom>0)el.classList.add('visible');else if(r.bottom<=0||r.top>=innerHeight)el.classList.remove('visible');}}let queued=false;addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{reveal();queued=false;});}},{passive:true});addEventListener('resize',reveal);reveal();}
