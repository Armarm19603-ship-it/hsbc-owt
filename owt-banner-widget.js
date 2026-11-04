/* OWT STEP 8.7 — PUBLIC PROMOTIONAL BANNER WIDGET
   Include Supabase JS v2 before this script, then include this file.
   Example:
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="owt-banner-widget.js" defer></script>
*/
(()=>{'use strict';
const URL='https://soezkybqsrjgqbyxokdk.supabase.co';
const KEY='sb_publishable_65ASq1FDolpTAu3b8LDAgg_G5cNLYQ9';
const db=window.supabase?.createClient?.(URL,KEY);
if(!db){console.warn('OWT banner widget: Supabase JS v2 is not loaded.');return;}
const css=`
.owt-banner-widget{position:relative;max-width:1440px;margin:18px auto 0;padding:0 4%;color:#fff;font-family:Inter,Arial,system-ui,sans-serif}
.owt-banner-widget .owt-bn-stage{position:relative;overflow:hidden;min-height:210px;border:1px solid #d8b66a66;border-radius:14px;background:#111827;box-shadow:0 18px 50px #0005}
.owt-banner-widget .owt-bn-slide{display:none;position:relative;min-height:clamp(220px,32vw,420px);isolation:isolate}
.owt-banner-widget .owt-bn-slide.active{display:flex;align-items:flex-end}
.owt-banner-widget .owt-bn-slide:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#080b13ed 0%,#080b13a8 48%,#080b1320 100%);z-index:-1}
.owt-banner-widget .owt-bn-slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.owt-banner-widget .owt-bn-copy{padding:clamp(22px,5vw,54px);max-width:760px}
.owt-banner-widget .owt-bn-kicker{color:#f2dda2;font-size:10px;letter-spacing:2px;font-weight:900;text-transform:uppercase}
.owt-banner-widget h2{font-size:clamp(24px,4.5vw,48px);line-height:1.05;margin:12px 0;color:#fff}
.owt-banner-widget p{font-size:clamp(12px,1.5vw,15px);line-height:1.7;color:#e0e5ee;max-width:600px;margin:0}
.owt-banner-widget .owt-bn-cta{display:inline-block;margin-top:18px;padding:12px 18px;border-radius:6px;background:linear-gradient(110deg,#f0d996,#b88d3e);color:#17130d;font-weight:900;font-size:11px;letter-spacing:1px;text-decoration:none}
.owt-banner-widget .owt-bn-dots{display:flex;justify-content:center;gap:7px;padding:10px}
.owt-banner-widget .owt-bn-dot{width:7px;height:7px;border:0;border-radius:50%;padding:0;background:#697386}
.owt-banner-widget .owt-bn-dot.active{background:#e1c16b;width:22px;border-radius:8px}
@media(max-width:650px){.owt-banner-widget{padding:0 10px;margin-top:12px}.owt-banner-widget .owt-bn-stage{min-height:230px}.owt-banner-widget .owt-bn-slide{min-height:260px}.owt-banner-widget .owt-bn-slide:before{background:linear-gradient(0deg,#080b13ed 0%,#080b1380 65%,#080b1310 100%)}.owt-banner-widget .owt-bn-copy{padding:20px}}
`;
function safeUrl(value){if(!value)return '';try{const u=new URL(value,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}}
function escText(node,value){node.textContent=value||'';}
function renderGroup(rows,placement,target){
 if(!rows.length||!target)return;
 const rootId='owt-banner-widget-'+placement;
 let root=document.getElementById(rootId);
 if(!root){root=document.createElement('section');root.id=rootId;root.className='owt-banner-widget';root.setAttribute('aria-label','OWT promotional banners');}
 const style=document.createElement('style');style.textContent=css;if(!document.getElementById('owt-banner-widget-style')){style.id='owt-banner-widget-style';document.head.appendChild(style);}
 root.innerHTML='';
 const stage=document.createElement('div');stage.className='owt-bn-stage';
 if(placement==='home_strip')stage.style.minHeight='170px';
 rows.forEach((b,i)=>{
  const slide=document.createElement('article');slide.className='owt-bn-slide'+(i===0?' active':'');
  const img=document.createElement('img');img.src=safeUrl(b.image_url);img.alt=b.title||'OWT Banner';img.loading=i===0?'eager':'lazy';slide.appendChild(img);
  const copy=document.createElement('div');copy.className='owt-bn-copy';
  const kicker=document.createElement('div');kicker.className='owt-bn-kicker';escText(kicker,'OCEAN WORLD TOUR · '+placement.replace('_',' '));
  const title=document.createElement('h2');escText(title,b.title);
  const subtitle=document.createElement('p');escText(subtitle,b.subtitle);
  copy.append(kicker,title,subtitle);
  const href=safeUrl(b.cta_url);if(b.cta_label&&href){const a=document.createElement('a');a.className='owt-bn-cta';a.href=href;a.textContent=b.cta_label;a.rel='noopener noreferrer';copy.appendChild(a);}
  slide.appendChild(copy);stage.appendChild(slide);
 });
 root.appendChild(stage);
 if(rows.length>1){
  const dots=document.createElement('div');dots.className='owt-bn-dots';
  rows.forEach((b,i)=>{const button=document.createElement('button');button.className='owt-bn-dot'+(i===0?' active':'');button.type='button';button.setAttribute('aria-label','แสดงแบนเนอร์ '+(i+1));button.addEventListener('click',()=>setSlide(i));dots.appendChild(button);});
  root.appendChild(dots);
 }
 let current=0,timer=null;
 function setSlide(i){const slides=stage.querySelectorAll('.owt-bn-slide');const buttons=root.querySelectorAll('.owt-bn-dot');slides.forEach((el,n)=>el.classList.toggle('active',n===i));buttons.forEach((el,n)=>el.classList.toggle('active',n===i));current=i;if(timer){clearInterval(timer);timer=null;}if(rows.length>1)timer=setInterval(()=>setSlide((current+1)%rows.length),6500);}
 if(rows.length>1)timer=setInterval(()=>setSlide((current+1)%rows.length),6500);
 if(!root.isConnected)target.parent.insertBefore(root,target.before||null);
}
function render(rows){
 const main=document.querySelector('main');
 if(!main){console.warn('OWT banner widget: no <main> element found.');return;}
 const groups={home_hero:[],home_strip:[],tournament:[],results:[]};
 rows.forEach(b=>{if(groups[b.placement])groups[b.placement].push(b);});
 const homeHeroTarget={parent:main,before:main.firstChild};
 if(groups.home_hero.length)renderGroup(groups.home_hero,'home_hero',homeHeroTarget);
 else document.getElementById('owt-banner-widget-home_hero')?.remove();

 const featureBand=main.querySelector('.feature-band');
 const stripAnchor=main.querySelector('.stats')||main.querySelector('.hero');
 const stripTarget=featureBand?{parent:featureBand.parentNode,before:featureBand}:stripAnchor?{parent:stripAnchor.parentNode,before:stripAnchor.nextSibling}:{parent:main,before:main.firstChild};
 if(groups.home_strip.length)renderGroup(groups.home_strip,'home_strip',stripTarget);
 else document.getElementById('owt-banner-widget-home_strip')?.remove();

 const tournamentPage=main.querySelector('#page-tournaments');
 const tournamentAnchor=tournamentPage?.querySelector('.content-section')||tournamentPage;
 const tournamentTarget=tournamentAnchor?{parent:tournamentAnchor,before:tournamentAnchor.firstChild}:null;
 if(groups.tournament.length&&tournamentTarget)renderGroup(groups.tournament,'tournament',tournamentTarget);
 else document.getElementById('owt-banner-widget-tournament')?.remove();

 const resultsPage=main.querySelector('#page-rankings');
 const resultsAnchor=resultsPage?.querySelector('.content-section')||resultsPage;
 const resultsTarget=resultsAnchor?{parent:resultsAnchor,before:resultsAnchor.firstChild}:null;
 if(groups.results.length&&resultsTarget)renderGroup(groups.results,'results',resultsTarget);
 else document.getElementById('owt-banner-widget-results')?.remove();
}
async function load(){
 try{
  const {data,error}=await db.from('owt_banners').select('id,title,subtitle,image_url,placement,cta_label,cta_url,sort_order,starts_at,ends_at').order('sort_order',{ascending:true}).order('created_at',{ascending:false});
  if(error)throw error;
  render((data||[]).filter(b=>safeUrl(b.image_url)));
 }catch(e){console.warn('OWT banner widget could not load banners:',e.message||e);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
