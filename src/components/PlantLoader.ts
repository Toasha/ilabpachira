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

      <!-- 植物アニメーション領域 (土なし・水/ロードバーから芽がすくすく育つ) -->
      <div class="relative w-44 h-40 flex items-center justify-center mb-2">

        <!-- 植物の芽・双葉 SVG (ロードバーからニュキっと伸びる) -->
        <div class="relative z-10 w-full h-full flex items-end justify-center pb-1 animate-sway-group">
          <svg class="w-36 h-36 overflow-visible" viewBox="0 0 100 100">
            <!-- 細身で華奢な茎 (水面直上からすっと生える) -->
            <path 
              d="M 50,90 Q 49,75 50,60" 
              fill="none" 
              stroke="#7fae64" 
              stroke-width="3.6" 
              stroke-linecap="round" 
              class="animate-sprout"
            />
            
            <!-- 左の丸い双葉 (最初の配色: #9ac681) -->
            <g class="animate-leaf-left" style="transform-origin: 50px 60px;">
              <path 
                d="M 50,60 C 24,62 12,42 30,42 C 44,41 47,52 50,60 Z" 
                fill="#9ac681" 
              />
              <!-- 葉脈 -->
              <path d="M 50,60 Q 35,50 26,45" fill="none" stroke="#e5f2e1" stroke-width="1.8" opacity="0.8" stroke-linecap="round" />
            </g>

            <!-- 右の丸い双葉 (最初の配色: #7fae64) -->
            <g class="animate-leaf-right" style="transform-origin: 50px 60px;">
              <path 
                d="M 50,60 C 76,62 88,42 70,42 C 56,41 53,52 50,60 Z" 
                fill="#7fae64" 
              />
              <!-- 葉脈 -->
              <path d="M 50,60 Q 65,50 74,45" fill="none" stroke="#e5f2e1" stroke-width="1.8" opacity="0.8" stroke-linecap="round" />
            </g>
          </svg>
        </div>
      </div>

      <!-- 波みたいに揺れながら前進するアクアロードバー (縮まない/退縮なし) -->
      <div class="w-52 h-5 water-bar-track my-3 relative overflow-hidden animate-bar-sway">
        <div class="water-bar-fill h-full relative overflow-hidden">
          <!-- 1層目の深みのある水波 -->
          <svg class="animate-wave-layer1 absolute -top-1.5 left-0 w-[200%] h-7" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,30 Q150,65 300,30 T600,30 T900,30 T1200,30 L1200,120 L0,120 Z" fill="#0284c7" opacity="0.45" />
          </svg>
          <!-- 2層目の明るい波面 -->
          <svg class="animate-wave-layer2 absolute -top-2 left-0 w-[200%] h-7" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,45 Q150,10 300,45 T600,45 T900,45 T1200,45 L1200,120 L0,120 Z" fill="#38bdf8" opacity="0.8" />
          </svg>
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
