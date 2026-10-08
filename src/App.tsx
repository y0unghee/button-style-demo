import { useEffect, useState } from 'react';
import { ButtonSizeScreen } from './components/ButtonSizeScreen';

const CANVAS_WIDTH = 1512;
const CANVAS_HEIGHT = 982;

function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      // 화면 너비에 맞춰 확대/축소 (1920px 기준 약 1.27배)
      setScale(document.documentElement.clientWidth / CANVAS_WIDTH);
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#e4e6e9]">
      <div
        style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <ButtonSizeScreen />
        </div>
      </div>
    </div>
  );
}

export default App;
