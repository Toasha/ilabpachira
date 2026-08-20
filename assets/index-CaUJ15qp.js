var T=Object.defineProperty;var W=(e,t,s)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var m=(e,t,s)=>W(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();async function N(e){if(!e.startsWith("http"))return null;try{const t=await fetch(e,{method:"GET",redirect:"follow"});if(!t.ok)return console.warn("Failed to fetch from Google Sheets API",t.statusText),null;const s=await t.json();return s.status==="success"&&s.data?s.data:null}catch(t){return console.error("Error fetching from spreadsheet API:",t),null}}async function $(e,t){if(!e||!e.startsWith("http"))return!1;try{const s=new URL(e);s.searchParams.set("action","update"),s.searchParams.set("date",t.date),s.searchParams.set("soil",String(t.soil)),s.searchParams.set("mist",String(t.mist));const r=await fetch(s.toString(),{method:"GET",redirect:"follow"});return r.ok?(await r.json()).status==="success":!1}catch(s){return console.error("Error sending log to spreadsheet:",s),!1}}const C="pachira_simple_log_v2",O="pachira_gas_api_url_v1";function k(){return localStorage.getItem(O)||"https://script.google.com/macros/s/AKfycbz5YgmLc-IQPS_bD-onLyz6No-i4rTts64PR0T3mASLeWhPyrVWhLXXi5E6Au4c9Y0pzQ/exec"}function M(){try{const e=localStorage.getItem(C);return e?JSON.parse(e):{}}catch(e){return console.error("Failed to load local logs",e),{}}}function S(e){try{localStorage.setItem(C,JSON.stringify(e))}catch(t){console.error("Failed to save local logs",t)}}function D(e){const t=M(),s=t[e]||{date:e,soil:!1,mist:!1},r={...s,soil:!s.soil};t[e]=r,S(t);const a=k();return $(a,r),t}function j(e){const t=M(),s=t[e]||{date:e,soil:!1,mist:!1},r={...s,mist:!s.mist};t[e]=r,S(t);const a=k();return $(a,r),t}function q({currentView:e,onViewChange:t}){var r,a;const s=document.createElement("header");return s.className="flex items-center justify-between py-4 mb-6 px-1",s.innerHTML=`
    <!-- タイトル -->
    <button id="nav-brand" class="flex items-center space-x-3 text-left focus:outline-none group">
      <div class="w-11 h-11 neu-card flex items-center justify-center text-pachira-400 group-hover:scale-105 transition-transform duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22v-9"/>
          <path d="M12 13C12 7.5 7.5 4 3 4c0 5.5 3.5 10 9 9Z"/>
          <path d="M12 13C12 7.5 16.5 4 21 4c0 5.5-3.5 10-9 9Z"/>
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold font-maru text-pachira-text tracking-tight">
          パキラの水やり記録
        </h1>
        <p class="text-xs text-pachira-textMuted tracking-wider font-sans">Watering & Leaf Mist Log</p>
      </div>
    </button>

    <!-- カレンダー / ホーム 切り替えボタン -->
    <button id="btn-toggle-view" class="px-4 py-2 text-sm font-bold font-maru ${e==="calendar"?"neu-pressed text-pachira-700":"neu-button text-pachira-text"} flex items-center gap-2">
      ${e==="home"?`
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
        カレンダー
      `:`
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        ホーム
      `}
    </button>
  `,(r=s.querySelector("#nav-brand"))==null||r.addEventListener("click",()=>t("home")),(a=s.querySelector("#btn-toggle-view"))==null||a.addEventListener("click",()=>{t(e==="home"?"calendar":"home")}),s}function b(e){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${r}`}function P(e){const t=e.getFullYear(),s=e.getMonth()+1,r=e.getDate(),n=["日","月","火","水","木","金","土"][e.getDay()];return`${t}年${s}月${r}日 (${n})`}function A(e,t){const s=b(new Date),r=new Date(e,t,1),a=new Date(e,t+1,0),n=r.getDay(),l=a.getDate(),d=[],f=new Date(e,t,0).getDate();for(let c=n-1;c>=0;c--){const h=new Date(e,t-1,f-c),p=b(h);d.push({date:h,dateStr:p,dayNumber:h.getDate(),isCurrentMonth:!1,isToday:p===s})}for(let c=1;c<=l;c++){const h=new Date(e,t,c),p=b(h);d.push({date:h,dateStr:p,dayNumber:c,isCurrentMonth:!0,isToday:p===s})}const x=(d.length<=35?35:42)-d.length;for(let c=1;c<=x;c++){const h=new Date(e,t+1,c),p=b(h);d.push({date:h,dateStr:p,dayNumber:c,isCurrentMonth:!1,isToday:p===s})}return d}function Y({logs:e,onLogUpdate:t,onOpenCalendar:s}){var d,f,u;const r=document.createElement("div");r.className="space-y-6 animate-pop";const a=new Date,n=b(a),l=e[n]||{soil:!1,mist:!1};return r.innerHTML=`
    <div class="neu-card p-6 md:p-8 text-center space-y-6">
      <!-- 今日の日付 -->
      <div>
        <span class="text-xs font-bold text-pachira-textMuted tracking-wider uppercase">TODAY</span>
        <h2 class="text-2xl md:text-3xl font-bold font-maru text-pachira-text mt-1">
          ${P(a)}
        </h2>
      </div>

      <!-- 2種類のチェックボタン (土への水やり & 葉水) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <!-- 1. 土への水やり -->
        <button id="btn-today-soil" class="relative group p-6 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none ${l.soil?"neu-green-pressed text-white":"neu-button text-pachira-text hover:scale-[1.02]"}">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform ${l.soil?"bg-white/20 scale-110":"neu-card text-pachira-500"}">
            <!-- 土・鉢アイコン -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10h10l-1 9H8z"/>
              <path d="M6 6h12v4H6z"/>
              <path d="M12 2v4"/>
            </svg>
          </div>

          <span class="text-lg font-bold font-maru">
            土への水やり
          </span>

          <div class="mt-2 flex items-center gap-1.5 font-bold text-sm font-maru ${l.soil?"text-white":"text-pachira-textMuted"}">
            ${l.soil?`
              <span class="text-base">◯</span>
              <span>水やり完了</span>
            `:`
              <span class="w-4 h-4 rounded-full border-2 border-pachira-400 inline-block"></span>
              <span>チェックする</span>
            `}
          </div>
        </button>

        <!-- 2. 葉水 (スプレー) -->
        <button id="btn-today-mist" class="relative group p-6 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none ${l.mist?"neu-green-pressed text-white":"neu-button text-pachira-text hover:scale-[1.02]"}">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform ${l.mist?"bg-white/20 scale-110":"neu-card text-pachira-500"}">
            <!-- スプレー/水滴アイコン -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </div>

          <span class="text-lg font-bold font-maru">
            葉水（スプレー）
          </span>

          <div class="mt-2 flex items-center gap-1.5 font-bold text-sm font-maru ${l.mist?"text-white":"text-pachira-textMuted"}">
            ${l.mist?`
              <span class="text-base">◯</span>
              <span>葉水完了</span>
            `:`
              <span class="w-4 h-4 rounded-full border-2 border-pachira-400 inline-block"></span>
              <span>チェックする</span>
            `}
          </div>
        </button>
      </div>

      <!-- カレンダー遷移リンク -->
      <div class="pt-4 border-t border-pachira-darkShadow/15 flex justify-center">
        <button id="btn-open-calendar-bottom" class="px-6 py-3 neu-button text-sm font-bold font-maru text-pachira-text flex items-center gap-2 hover:text-pachira-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
          カレンダーで確認する →
        </button>
      </div>
    </div>
  `,(d=r.querySelector("#btn-today-soil"))==null||d.addEventListener("click",()=>{const x=D(n);t(x)}),(f=r.querySelector("#btn-today-mist"))==null||f.addEventListener("click",()=>{const x=j(n);t(x)}),(u=r.querySelector("#btn-open-calendar-bottom"))==null||u.addEventListener("click",s),r}function B({logs:e,currentYear:t,currentMonthIndex:s,onMonthChange:r,onLogUpdate:a}){var p,L,E;const n=document.createElement("div");n.className="space-y-6 animate-pop";const l=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],d=[{label:"日",isWeekend:!0},{label:"月",isWeekend:!1},{label:"火",isWeekend:!1},{label:"水",isWeekend:!1},{label:"木",isWeekend:!1},{label:"金",isWeekend:!1},{label:"土",isWeekend:!0}],f=A(t,s),u=`${t}-${String(s+1).padStart(2,"0")}`,x=Object.keys(e).filter(o=>{var i;return o.startsWith(u)&&((i=e[o])==null?void 0:i.soil)}).length,c=Object.keys(e).filter(o=>{var i;return o.startsWith(u)&&((i=e[o])==null?void 0:i.mist)}).length;return n.innerHTML=`
    <div class="neu-card p-4 sm:p-6 md:p-8 space-y-6">
      <!-- ナビゲーション -->
      <div class="flex items-center justify-between">
        <button id="btn-prev-month" class="w-10 h-10 neu-button flex items-center justify-center text-pachira-text hover:text-pachira-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div class="text-center">
          <h2 class="text-xl sm:text-2xl font-bold font-maru text-pachira-text">
            ${t}年 ${l[s]}
          </h2>
          <button id="btn-today-month" class="text-xs font-bold text-pachira-500 hover:underline">今月へ</button>
        </div>

        <button id="btn-next-month" class="w-10 h-10 neu-button flex items-center justify-center text-pachira-text hover:text-pachira-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- 曜日ヘッダー -->
      <div class="grid grid-cols-7 gap-1 text-center">
        ${d.map(o=>`
          <div class="text-xs font-bold font-maru ${o.isWeekend?"text-pachira-600/70":"text-pachira-textMuted"} py-1">
            ${o.label}
          </div>
        `).join("")}
      </div>

      <!-- 日付グリッド -->
      <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
        ${f.map(o=>{const i=e[o.dateStr],w=(i==null?void 0:i.soil)||!1,v=(i==null?void 0:i.mist)||!1;let g="aspect-square p-1 sm:p-2 rounded-2xl flex flex-col items-center justify-between transition-all select-none cursor-pointer ";o.isCurrentMonth?o.isToday?g+=w||v?"neu-green-pressed border-2 border-white/60 ":"neu-pressed border-2 border-pachira-400 ":w||v?g+="neu-green-btn ":g+="neu-card-sm hover:scale-105 active:scale-95 ":g+="opacity-30 bg-pachira-bg/40 ";const y=w||v;return`
            <div class="calendar-cell ${g}" data-date="${o.dateStr}">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-bold font-maru ${y?"text-white":o.isCurrentMonth?"text-pachira-text":"text-pachira-textMuted"}">
                  ${o.dayNumber}
                </span>
                ${o.isToday?`
                  <span class="text-[9px] px-1 rounded font-bold ${y?"bg-white/30 text-white":"bg-pachira-400 text-white"}">今日</span>
                `:""}
              </div>

              <!-- 印 (土 / 葉水) -->
              <div class="my-auto flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold">
                ${w?`
                  <span class="${y?"text-white":"text-pachira-700"}">土 ◯</span>
                `:""}
                ${v?`
                  <span class="${y?"text-white/90":"text-pachira-600"}">葉水 ◯</span>
                `:""}
              </div>
            </div>
          `}).join("")}
      </div>

      <!-- 今月の集計 -->
      <div class="pt-4 border-t border-pachira-darkShadow/15 flex justify-around text-xs font-maru font-bold text-pachira-text">
        <div>🪴 土の水やり: <span class="text-pachira-600 text-sm">${x}</span> 回</div>
        <div>🚿 葉水: <span class="text-pachira-600 text-sm">${c}</span> 回</div>
      </div>
    </div>
  `,(p=n.querySelector("#btn-prev-month"))==null||p.addEventListener("click",()=>{let o=s-1,i=t;o<0&&(o=11,i-=1),r(i,o)}),(L=n.querySelector("#btn-next-month"))==null||L.addEventListener("click",()=>{let o=s+1,i=t;o>11&&(o=0,i+=1),r(i,o)}),(E=n.querySelector("#btn-today-month"))==null||E.addEventListener("click",()=>{const o=new Date;r(o.getFullYear(),o.getMonth())}),n.querySelectorAll(".calendar-cell").forEach(o=>{o.addEventListener("click",()=>{const i=o.getAttribute("data-date");i&&_(i,e,a)})}),n}function _(e,t,s){var l,d,f;const r=document.getElementById("day-edit-modal");r&&r.remove();const a=t[e]||{soil:!1,mist:!1},n=document.createElement("div");n.id="day-edit-modal",n.className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-pop",n.innerHTML=`
    <div class="neu-card p-6 w-full max-w-xs text-center space-y-5">
      <h3 class="text-base font-bold font-maru text-pachira-text">
        ${e} の記録
      </h3>

      <div class="space-y-3">
        <!-- 土への水やり -->
        <button id="modal-btn-soil" class="w-full py-3 px-4 rounded-2xl font-bold font-maru flex items-center justify-between transition-all ${a.soil?"neu-green-btn":"neu-button text-pachira-text"}">
          <span class="flex items-center gap-2">🪴 土への水やり</span>
          <span>${a.soil?"◯ 済み":"未チェック"}</span>
        </button>

        <!-- 葉水 -->
        <button id="modal-btn-mist" class="w-full py-3 px-4 rounded-2xl font-bold font-maru flex items-center justify-between transition-all ${a.mist?"neu-green-btn":"neu-button text-pachira-text"}">
          <span class="flex items-center gap-2">🚿 葉水</span>
          <span>${a.mist?"◯ 済み":"未チェック"}</span>
        </button>
      </div>

      <button id="modal-btn-close" class="w-full py-2 text-sm font-bold font-maru text-pachira-textMuted hover:text-pachira-text">
        閉じる
      </button>
    </div>
  `,document.body.appendChild(n),(l=n.querySelector("#modal-btn-soil"))==null||l.addEventListener("click",()=>{const u=D(e);n.remove(),s(u)}),(d=n.querySelector("#modal-btn-mist"))==null||d.addEventListener("click",()=>{const u=j(e);n.remove(),s(u)}),(f=n.querySelector("#modal-btn-close"))==null||f.addEventListener("click",()=>{n.remove()}),n.addEventListener("click",u=>{u.target===n&&n.remove()})}class H{constructor(t){m(this,"appElement");m(this,"logs");m(this,"currentView","home");m(this,"currentYear");m(this,"currentMonthIndex");m(this,"handleLogUpdate",t=>{this.logs=t,this.render()});m(this,"handleViewChange",t=>{this.currentView=t,this.render()});m(this,"handleMonthChange",(t,s)=>{this.currentYear=t,this.currentMonthIndex=s,this.render()});this.appElement=t,this.logs=M();const s=new Date;this.currentYear=s.getFullYear(),this.currentMonthIndex=s.getMonth(),this.render(),this.syncWithSpreadsheet()}async syncWithSpreadsheet(){const t=k(),s=await N(t);s&&(this.logs={...this.logs,...s},S(this.logs),this.render())}render(){this.appElement.innerHTML="";const t=q({currentView:this.currentView,onViewChange:this.handleViewChange});this.appElement.appendChild(t);const s=document.createElement("main");if(s.className="flex-1 mb-8",this.currentView==="home"){const a=Y({logs:this.logs,onLogUpdate:this.handleLogUpdate,onOpenCalendar:()=>this.handleViewChange("calendar")});s.appendChild(a)}else{const a=B({logs:this.logs,currentYear:this.currentYear,currentMonthIndex:this.currentMonthIndex,onMonthChange:this.handleMonthChange,onLogUpdate:this.handleLogUpdate});s.appendChild(a)}this.appElement.appendChild(s);const r=document.createElement("footer");r.className="text-center py-4 text-xs font-maru text-pachira-textMuted border-t border-pachira-darkShadow/15",r.innerHTML=`
      <p>🌱 パキラの水やり記録</p>
    `,this.appElement.appendChild(r)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");e&&new H(e)});
