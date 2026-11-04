/* OWT STEP 8.8 — PUBLIC BANNER WIDGET
 * Include this file after the Supabase CDN and existing website scripts.
 * Read-only: uses the existing publishable key and public RLS policy.
 */
(()=>{'use strict';
  if(window.__OWT_BANNER_WIDGET_LOADED__)return;
  window.__OWT_BANNER_WIDGET_LOADED__=true;
  const SUPABASE_URL='https://soezkybqsrjgqbyxokdk.supabase.co';
  const SUPABASE_KEY='sb_publishable_65ASq1FDolpTAu3b8LDAgg_G5cNLYQ9';
  const db=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null;
  if(!db){console.warn('[OWT Banner] Supabase client not found. Load supabase-js before owt-banner-widget.js');return;}
  const placements=['top','hero','news','footer'];
  const css=`
  .owt-banner-host{width:100%;max-width:100%;padding:0 4%;margin:12px auto;position:relative;z-index:2}
  .owt-banner-list{max-width:1480px;margin:0 auto;display:grid;gap:12px}
  .owt-live-banner{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,2fr);overflow:hidden;border:1px solid #d8b66a88;border-radius:16px;background:linear-gradient(115deg,#111827,#1b2340 65%,#321b2b);box-shadow:0 14px 38px #0004;color:#f7f3e9;min-height:140px}
  .owt-live-banner.no-image{grid-template-columns:1fr;min-height:0}
  .owt-live-banner-media{min-height:140px;background:#0b1020;position:relative}
  .owt-live-banner-media img{width:100%;height:100%;min-height:140px;max-height:250px;object-fit:cover;display:block}
  .owt-live-banner-copy{padding:18px 22px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px;min-width:0}
  .owt-live-banner-kicker{font-size:10px;letter-spacing:2px;font-weight:900;color:#e1c16b;text-transform:uppercase}
  .owt-live-banner h2{font-size:clamp(18px,2.8vw,27px);line-height:1.15;margin:0;color:#fff;overflow-wrap:anywhere}
  .owt-live-banner p{font-size:13px;line-height:1.65;color:#c7d0df;margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
  .owt-live-banner-cta{display:inline-flex;align-items:center;justify-content:center;margin-top:3px;padding:10px 15px;border-radius:8px;background:linear-gradient(100deg,#c5a14e,#f0d993);color:#171717!important;text-decoration:none!important;font-size:10px;font-weight:900;letter-spacing:1px}
  .owt-live-banner.placement-top{grid-template-columns:170px minmax(0,1fr);min-height:105px;border-radius:0;max-width:none;border-left:0;border-right:0}
  .owt-live-banner.placement-top .owt-live-banner-media,.owt-live-banner.placement-top .owt-live-banner-media img{min-height:105px;max-height:125px}
  .owt-live-banner.placement-top .owt-live-banner-copy{padding:12px 18px}
  .owt-live-banner.placement-top h2{font-size:clamp(15px,2vw,21px)}
  .owt-live-banner.placement-top p{font-size:12px}
  .owt-live-banner.placement-hero{min-height:180px}
  .owt-live-banner.placement-hero .owt-live-banner-media,.owt-live-banner.placement-hero .owt-live-banner-media img{min-height:180px;max-height:300px}
  @media(max-width:700px){.owt-banner-host{padding:0 10px;margin:10px auto}.owt-live-banner,.owt-live-banner.placement-top{grid-template-columns:1fr}.owt-live-banner-media,.owt-live-banner-media img,.owt-live-banner.placement-top .owt-live-banner-media,.owt-live-banner.placement-top .owt-live-banner-media img{min-height:120px;max-height:190px}.owt-live-banner-copy,.owt-live-banner.placement-top .owt-live-banner-copy{padding:14px}.owt-live-banner h2{font-size:19px}}
  `;
  function escText(value){return String(value??'');}
  function safeUrl(value){const v=String(value||'').trim();if(!v)return '';if(v.startsWith('/')||v.startsWith('#'))return v;try{const u=new URL(v,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}}
  function hostFor(placement){
    const id='owt-banner-host-'+placement;let host=document.getElementById(id);if(host)return host;
    host=document.createElement('div');host.id=id;host.className='owt-banner-host';host.dataset.owtPlacement=placement;
    const header=document.querySelector('body > header');
    const announcement=document.getElementById('siteAnnouncement');
    const homeHero=document.querySelector('#page-home .hero');
    const newsContent=document.querySelector('#page-news .container.content');
    const footer=document.querySelector('body > footer');
    if(placement==='top'){
      if(announcement?.parentNode)announcement.insertAdjacentElement('afterend',host);
      else if(header?.parentNode)header.insertAdjacentElement('afterend',host);
      else document.body.prepend(host);
    }else if(placement==='hero'){
      if(homeHero?.parentNode)homeHero.insertAdjacentElement('afterend',host);
      else document.querySelector('main')?.prepend(host);
    }else if(placement==='news'){
      if(newsContent?.parentNode)newsContent.parentNode.insertBefore(host,newsContent);
      else document.querySelector('#page-news')?.prepend(host);
    }else{
      if(footer?.parentNode)footer.parentNode.insertBefore(host,footer);
      else document.body.append(host);
    }
    return host;
  }
  function makeCard(item){
    const card=document.createElement('article');card.className='owt-live-banner placement-'+(placements.includes(item.placement)?item.placement:'top');
    if(!item.image_url)card.classList.add('no-image');
    if(item.image_url){const media=document.createElement('div');media.className='owt-live-banner-media';const img=document.createElement('img');img.src=item.image_url;img.alt=escText(item.title);img.loading='lazy';img.onerror=()=>media.remove();media.append(img);card.append(media);}
    const copy=document.createElement('div');copy.className='owt-live-banner-copy';
    const kicker=document.createElement('div');kicker.className='owt-live-banner-kicker';kicker.textContent='OCEAN WORLD TOUR · OFFICIAL';
    const title=document.createElement('h2');title.textContent=escText(item.title);
    copy.append(kicker,title);
    if(item.subtitle){const p=document.createElement('p');p.textContent=escText(item.subtitle);copy.append(p);}
    const href=safeUrl(item.cta_url);
    if(item.cta_label&&href){const a=document.createElement('a');a.className='owt-live-banner-cta';a.href=href;a.textContent=escText(item.cta_label);if(/^https?:\/\//i.test(href)&&new URL(href,location.href).origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer';}copy.append(a);}
    card.append(copy);return card;
  }
  function isInSchedule(item,now){const start=item.starts_at?new Date(item.starts_at).getTime():null;const end=item.ends_at?new Date(item.ends_at).getTime():null;return (!start||start<=now)&&(!end||end>now);}
  function render(rows){for(const placement of placements){const host=hostFor(placement);host.replaceChildren();const list=document.createElement('div');list.className='owt-banner-list';rows.filter(x=>(placements.includes(x.placement)?x.placement:'top')===placement).forEach(x=>list.append(makeCard(x)));if(list.childElementCount)host.append(list);}}
  async function load(){try{const {data,error}=await db.from('owt_banners').select('id,title,subtitle,image_url,placement,cta_label,cta_url,status,is_active,sort_order,starts_at,ends_at').eq('status','published').eq('is_active',true).order('sort_order',{ascending:true}).order('created_at',{ascending:false});if(error)throw error;const now=Date.now();const visible=(data||[]).filter(x=>isInSchedule(x,now));render(visible);}catch(error){console.warn('[OWT Banner] Could not load public banners:',error.message||error);}}
  const style=document.createElement('style');style.id='owt-banner-widget-style';style.textContent=css;document.head.append(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)load();});
  window.setInterval(load,60000);
  window.OWTBanners={refresh:load};
})();
