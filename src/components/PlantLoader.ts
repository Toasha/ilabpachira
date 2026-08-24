import animatedSproutGif from '../assets/animated_sprout_transparent.gif';

/**
 * 植物が育つアニメーション付きローディングコンポーネント
 */
export function createPlantLoader(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 animate-pop';

  container.innerHTML = `
    <div class="neu-card p-8 sm:p-10 flex flex-col items-center max-w-sm w-full relative overflow-hidden border border-white/50">
      <!-- 装飾用のバックグラウンドサークル -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-pachira-200/30 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-pachira-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <!-- ユーザー自作の背景透過GIFアニメーション -->
      <div class="relative w-44 h-40 flex items-center justify-center mb-2">
        <img 
          src="${animatedSproutGif}" 
          alt="植物が育つアニメーション" 
          class="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm animate-sway-group" 
        />
      </div>

      <!-- 波みたいに前進するアクアロードバー (3層パララックス水波) -->
      <div class="w-56 h-7 water-bar-track my-3.5 relative overflow-hidden p-0.5">
        <div class="water-bar-fill h-full relative overflow-hidden rounded-full">
          <!-- 1層目: 奥のディープブルー波 -->
          <svg class="animate-wave-layer-back absolute -top-3 left-0 w-[300%] h-12 pointer-events-none" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,45 C150,85 300,15 450,50 C600,85 750,15 900,50 C1050,85 1200,15 1350,50 L1350,120 L0,120 Z" fill="#0284c7" opacity="0.5" />
          </svg>
          <!-- 2層目: 中間のアクア波 -->
          <svg class="animate-wave-layer-mid absolute -top-2.5 left-0 w-[300%] h-12 pointer-events-none" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 C100,15 250,75 400,35 C550,5 700,65 850,30 C1000,5 1150,65 1300,30 L1300,120 L0,120 Z" fill="#06b6d4" opacity="0.7" />
          </svg>
          <!-- 3層目: 手前のクリスタルスカイ波 -->
          <svg class="animate-wave-layer-front absolute -top-2 left-0 w-[300%] h-12 pointer-events-none" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,35 C80,60 180,18 280,45 C380,72 480,20 580,45 C680,68 780,18 880,45 C980,72 1080,20 1200,45 L1200,120 L0,120 Z" fill="#38bdf8" opacity="0.9" />
          </svg>
          <!-- 水面のツヤ・泡光彩 -->
          <div class="water-foam"></div>
        </div>
      </div>

      <!-- loading... テキストアニメーション -->
      <div class="flex items-center justify-center gap-1 font-maru font-bold text-lg text-pachira-800 tracking-wider">
        <span>loading</span>
        <span class="animate-dot-1 text-pachira-600">.</span>
        <span class="animate-dot-2 text-pachira-600">.</span>
        <span class="animate-dot-3 text-pachira-600">.</span>
      </div>
      
      <p class="text-xs font-maru text-pachira-textMuted mt-1 tracking-wide">
        スプレッドシートからデータを読み込み中
      </p>
    </div>
  `;

  return container;
}
