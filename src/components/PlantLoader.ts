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
          src="/animated_sprout_transparent.gif" 
          alt="植物が育つアニメーション" 
          class="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm animate-sway-group" 
        />
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
