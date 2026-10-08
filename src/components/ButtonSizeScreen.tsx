import { useEffect, useRef, useState } from 'react';
import iconExit from '../assets/figma/button-size/exit.svg';
import iconTheme from '../assets/figma/button-size/theme.svg';
import iconUndo from '../assets/figma/button-size/undo.svg';
import iconRedo from '../assets/figma/button-size/redo.svg';
import iconMirroring from '../assets/figma/button-size/mirroring.svg';
import iconChevronDownPage from '../assets/figma/button-size/chevron-down-page.svg';
import iconChevronDownPanel from '../assets/figma/button-size/chevron-down-panel.svg';
import iconDesktop from '../assets/figma/button-size/desktop.svg';
import iconMobile from '../assets/figma/button-size/mobile.svg';
import iconCheck from '../assets/figma/button-size/check.svg';
import iconChevronRightEdge from '../assets/figma/button-size/chevron-right-edge.svg';
import iconPaddingX from '../assets/figma/button-size/padding-x.svg';
import iconPaddingY from '../assets/figma/button-size/padding-y.svg';
import iconMinusSmall from '../assets/figma/button-size/minus-small.svg';
import iconPlusSmall from '../assets/figma/button-size/plus-small.svg';
import iconMinusSmallDisabled from '../assets/figma/button-size/minus-small-disabled.svg';
import iconPlusSmallDisabled from '../assets/figma/button-size/plus-small-disabled.svg';
import iconCheckSmall from '../assets/figma/button-size/check-small.svg';
import iconDesignFilled from '../assets/figma/button-size/design-filled.svg';
import iconDesignSecondary from '../assets/figma/button-size/design-secondary.svg';
import iconDesignOutline from '../assets/figma/button-size/design-outline.svg';
import iconDesignOutlineLight from '../assets/figma/button-size/design-outline-light.svg';
import iconDesignText from '../assets/figma/button-size/design-text.svg';
import iconChevronRight from '../assets/figma/button-size/chevron-right.svg';
import thumbnail from '../assets/figma/button-size/thumbnail.png';

const DM_SANS_OPSZ = { fontVariationSettings: '"opsz" 14' } as const;

function Divider() {
  return <div className="h-[16px] w-px shrink-0 bg-[rgba(51,62,76,0.16)]" />;
}

function Toolbar() {
  return (
    <div className="absolute top-0 right-0 left-0 flex h-[55px] flex-col items-center justify-center border-b border-[rgba(51,62,76,0.1)] bg-white pt-[9px] pr-[12px] pb-[10px] pl-[10px]">
      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="flex size-[32px] items-center justify-center rounded-[8px] p-[8px]">
            <img src={iconExit} alt="" width={16} height={16} />
          </div>
          <div className="flex items-center gap-[4px]">
            <Divider />
            <div className="flex items-center gap-[4px] rounded-[8px] py-[7px] pr-[12px] pl-[8px]">
              <img src={iconTheme} alt="" width={16} height={16} />
              <span className="font-['Pretendard'] text-[12px] leading-[18px] font-medium whitespace-nowrap text-black">
                스타일
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="flex items-center">
            <div className="flex size-[32px] items-center justify-center rounded-[8px]">
              <img src={iconUndo} alt="" width={20} height={20} />
            </div>
            <div className="flex size-[32px] items-center justify-center rounded-[8px]">
              <img src={iconRedo} alt="" width={20} height={20} />
            </div>
          </div>
          <div className="flex items-center gap-[4px]">
            <Divider />
            <div className="flex h-[32px] items-center gap-[4px] rounded-[8px] py-[3px] pr-[12px] pl-[8px]">
              <img src={iconMirroring} alt="" width={16} height={16} />
              <span className="font-['Pretendard'] text-[12px] leading-[18px] font-medium whitespace-nowrap text-black">
                미러링
              </span>
            </div>
            <Divider />
            <div className="flex h-[32px] items-center justify-center rounded-[8px] px-[12px] py-[7px]">
              <span className="font-['Pretendard'] text-[12px] leading-[18px] font-medium whitespace-nowrap text-black">
                미리보기
              </span>
            </div>
            <div className="flex h-[32px] w-[68px] min-w-[64px] items-center justify-center rounded-[8px] bg-[#181d25] px-[12px] py-[6px]">
              <span className="font-['Pretendard'] text-[12px] leading-[18px] font-medium whitespace-nowrap text-white">
                업데이트
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-[calc(50%+1px)] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[8px]">
          <div className="flex w-[200px] items-center gap-[8px] rounded-[8px] bg-[#f6f7f9] py-[7px] pr-[8px] pl-[12px]">
            <span className="flex-1 font-['Pretendard'] text-[12px] leading-[18px] font-medium text-black">Home</span>
            <img src={iconChevronDownPage} alt="" width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewportBar({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex w-full shrink-0 items-center gap-[4px] overflow-hidden rounded-[4px] bg-[#f6f7f9] px-[10px] py-[9px]">
      <img src={icon} alt="" width={14} height={14} />
      <span className="font-['Pretendard'] text-[11px] leading-[14px] font-medium whitespace-nowrap text-[#414e61]">
        {label}
      </span>
    </div>
  );
}

const DESKTOP_NAV = ['Shop', 'About', 'Journal', 'Info', 'The Story'];
const DESKTOP_UTILITIES = ['Search', 'Sign in', 'Bag (0)'];

const SIZE_OPTIONS = ['크게', '보통', '작게', '사용자 지정'] as const;
type SizeOption = (typeof SIZE_OPTIONS)[number];

// 실제 버튼 컴포넌트 수치 (패딩은 텍스트 크기 기준 em)
const BUTTON_SIZE_SPECS = {
  크게: { fontSize: 14, paddingX: 1.71, paddingY: 1.0 },
  보통: { fontSize: 13, paddingX: 1.85, paddingY: 1.0 },
  작게: { fontSize: 13, paddingX: 0.92, paddingY: 0.62 },
} as const;

type ButtonSpec = { fontSize: number; paddingX: number; paddingY: number; fullWidth?: boolean };

// 사용자 지정: 패딩 입력값(문자열, em)을 뷰포트별로 보관. 텍스트 크기는 보통과 동일
type PaddingInput = { x: string; y: string };
// mobileFillWidth: 모바일 좌우 패딩 '너비 채우기' (버튼을 컨테이너 너비에 맞춤)
// fontSize: 사용자 지정으로 전환하기 직전 프리셋의 텍스트 크기 유지
type CustomPadding = { desktop: PaddingInput; mobile: PaddingInput; mobileFillWidth: boolean; fontSize: number };

const DEFAULT_CUSTOM_PADDING: CustomPadding = {
  desktop: { x: '1.85', y: '1.0' },
  mobile: { x: '1.85', y: '1.0' },
  mobileFillWidth: false,
  fontSize: BUTTON_SIZE_SPECS['보통'].fontSize,
};

// 프리셋(크게/보통/작게) 수치를 사용자 지정 초기값으로 변환
function customPaddingFromPreset(preset: Exclude<SizeOption, '사용자 지정'>): CustomPadding {
  const spec = BUTTON_SIZE_SPECS[preset];
  const padding = { x: formatPadding(spec.paddingX), y: formatPadding(spec.paddingY) };
  return { desktop: padding, mobile: padding, mobileFillWidth: false, fontSize: spec.fontSize };
}

function toEm(value: string) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function resolveButtonSpec(size: SizeOption, custom: PaddingInput, fontSize: number, fillWidth = false): ButtonSpec {
  if (size === '사용자 지정') {
    // 입력 중 최대값을 넘어도 미리보기는 최대값까지만 반영
    return {
      fontSize,
      paddingX: Math.min(toEm(custom.x), PADDING_X_MAX),
      paddingY: Math.min(toEm(custom.y), PADDING_Y_MAX),
      fullWidth: fillWidth,
    };
  }
  return BUTTON_SIZE_SPECS[size];
}

// 미리보기 축소 비율: 데스크탑 1920px → 920px, 모바일 390px → 188px
const DESKTOP_SCALE = 920 / 1920;
const MOBILE_SCALE = 188 / 390;

const DESIGN_OPTIONS = ['강조 버튼', '보조 버튼', '테두리 버튼', '연한 테두리 버튼', '텍스트 버튼'] as const;
type DesignOption = (typeof DESIGN_OPTIONS)[number];

const DESIGN_ICONS: Record<DesignOption, string> = {
  '강조 버튼': iconDesignFilled,
  '보조 버튼': iconDesignSecondary,
  '테두리 버튼': iconDesignOutline,
  '연한 테두리 버튼': iconDesignOutlineLight,
  '텍스트 버튼': iconDesignText,
};

// 디자인별 버튼 스타일 (Framework 버튼 컴포넌트 기준)
// - 보조 버튼: filled 기반 tonal 색상 / 텍스트 버튼: text (no padding) + 오른쪽 chevron 아이콘
const BUTTON_DESIGN_STYLES: Record<DesignOption, { background: string; borderColor: string; color: string; noPadding?: boolean; rightIcon?: string }> = {
  '강조 버튼': { background: '#111', borderColor: 'rgba(17,17,17,0)', color: '#fff' },
  '보조 버튼': { background: 'rgba(17,17,17,0.08)', borderColor: 'rgba(17,17,17,0)', color: '#111' },
  '테두리 버튼': { background: 'rgba(255,255,255,0)', borderColor: '#111', color: '#111' },
  '연한 테두리 버튼': { background: 'rgba(255,255,255,0)', borderColor: 'rgba(17,17,17,0.15)', color: '#111' },
  '텍스트 버튼': { background: 'transparent', borderColor: 'transparent', color: '#111', noPadding: true, rightIcon: iconChevronRight },
};

type PreviewButtonProps = {
  spec: ButtonSpec;
  design: DesignOption;
  scale: number;
  outlineColor: string;
};

function PreviewButton({ spec, design, scale, outlineColor }: PreviewButtonProps) {
  const style = BUTTON_DESIGN_STYLES[design];
  return (
    <div className={spec.fullWidth ? 'relative w-full' : 'relative'}>
      <div
        className="flex items-center justify-center overflow-hidden border-solid"
        style={{
          fontSize: spec.fontSize * scale,
          padding: style.noPadding ? 0 : `${spec.paddingY}em ${spec.paddingX}em`,
          borderWidth: style.noPadding ? 0 : scale,
          borderRadius: 4 * scale,
          gap: 4 * scale,
          background: style.background,
          borderColor: style.borderColor,
          color: style.color,
        }}
      >
        <span className="font-['DM_Sans'] leading-[1.2] font-medium whitespace-nowrap" style={DM_SANS_OPSZ}>
          Learn more
        </span>
        {style.rightIcon && <img src={style.rightIcon} alt="" className="shrink-0" style={{ width: 16 * scale, height: 16 * scale }} />}
      </div>
      <div className="pointer-events-none absolute inset-0 border border-solid" style={{ borderColor: outlineColor }} />
    </div>
  );
}

function DesktopNavItem({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col justify-center px-[3.833px]">
      <span className="font-['Inter'] text-[6.23px] leading-normal font-normal whitespace-nowrap text-black">{label}</span>
    </div>
  );
}

function DesktopPreview({ buttonSpec, design }: { buttonSpec: ButtonSpec; design: DesignOption }) {
  return (
    <div className="absolute top-[95px] left-[40px] flex h-[799px] w-[920px] flex-col items-start gap-[12px]">
      <ViewportBar icon={iconDesktop} label="데스크탑" />
      <div className="relative min-h-px w-full flex-1 overflow-hidden bg-white">
        {/* Header */}
        <div className="absolute top-0 left-0 flex h-[30.667px] w-[920px] items-center px-[14.375px]">
          <div className="relative flex h-full flex-1 items-center justify-between">
            <div className="flex h-full items-start gap-[5.75px]">
              {DESKTOP_NAV.map((label) => (
                <DesktopNavItem key={label} label={label} />
              ))}
            </div>
            <div className="flex h-full items-start justify-end gap-[5.75px]">
              {DESKTOP_UTILITIES.map((label) => (
                <DesktopNavItem key={label} label={label} />
              ))}
            </div>
            <span className="absolute top-[calc(50%+0.24px)] left-[calc(50%-16.77px)] -translate-y-1/2 font-['Inter'] text-[9.58px] leading-[13.417px] font-semibold whitespace-nowrap text-black">
              BRAND
            </span>
          </div>
        </div>

        {/* Section */}
        <div className="absolute top-[30.67px] left-0 flex w-[920px] items-center bg-white">
          <div className="relative aspect-square min-w-px flex-1 overflow-hidden">
            <img src={thumbnail} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="flex aspect-square min-w-px flex-1 flex-col items-center justify-center bg-white">
            <div className="flex w-full flex-col items-center justify-center gap-[17.25px] px-[57.5px]">
              <div className="flex w-full flex-col items-center gap-[5.75px] text-center">
                <p className="w-full font-['DM_Sans'] text-[6.708px] leading-[1.6] font-normal text-[#111]" style={DM_SANS_OPSZ}>
                  Our Philosophy
                </p>
                <p className="w-full font-['DM_Sans'] text-[19.17px] leading-[1.4] font-medium text-[#111]" style={DM_SANS_OPSZ}>
                  New Standard in Quality
                </p>
                <p className="w-full font-['Pretendard'] text-[6.708px] leading-[1.6] font-normal text-[rgba(17,17,17,0.6)]">
                  쉽게 지나칠 수 있는 디테일까지 고민하는 일은 결과의 완성도를 높이고, 더 나은 경험을 만듭니다.
                </p>
              </div>
              <PreviewButton spec={buttonSpec} design={design} scale={DESKTOP_SCALE} outlineColor="#09f" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MobilePreview({ buttonSpec, design }: { buttonSpec: ButtonSpec; design: DesignOption }) {
  return (
    <div className="absolute top-[95px] left-[980px] flex h-[799px] w-[188px] flex-col items-start gap-[12px] overflow-hidden">
      <ViewportBar icon={iconMobile} label="모바일" />
      <div className="relative min-h-px w-full flex-1 overflow-hidden bg-white">
        {/* Header */}
        <div className="absolute top-0 left-0 flex h-[28.923px] w-[188px] items-center justify-between bg-white px-[7.713px]">
          <div className="flex h-[23.138px] min-w-[23.138px] items-center">
            <span className="font-['DM_Sans'] text-[3.02px] leading-[1.6] font-normal whitespace-nowrap text-[#372320] uppercase" style={DM_SANS_OPSZ}>
              Menu
            </span>
          </div>
          <div className="flex h-[23.138px] min-w-[23.138px] items-center justify-end">
            <span className="font-['DM_Sans'] text-[3.02px] leading-[1.6] font-normal whitespace-nowrap text-[#372320] uppercase" style={DM_SANS_OPSZ}>
              Bag [0]
            </span>
          </div>
          <span className="absolute top-1/2 left-[calc(50%-16.87px)] -translate-y-1/2 font-['Inter'] text-[4.65px] leading-[6.506px] font-semibold whitespace-nowrap text-[#372320]">
            BRAND
          </span>
        </div>

        {/* Section */}
        <div className="absolute top-[28.92px] left-0 flex w-[188px] flex-col items-start bg-white">
          <div className="relative aspect-square w-full overflow-hidden">
            <img src={thumbnail} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[15.426px] bg-white px-[15.426px] py-[23.138px]">
            <div className="flex w-full flex-col items-center gap-[5.785px] text-center">
              <p className="w-full font-['DM_Sans'] text-[6.75px] leading-[1.6] font-normal text-[#111]" style={DM_SANS_OPSZ}>
                Our Philosophy
              </p>
              <p className="w-full font-['DM_Sans'] text-[11.57px] leading-[1.4] font-medium text-[#111]" style={DM_SANS_OPSZ}>
                New Standard in Quality
              </p>
              <p className="w-full font-['Pretendard'] text-[6.75px] leading-[1.6] font-normal text-[rgba(17,17,17,0.6)]">
                쉽게 지나칠 수 있는 디테일까지 고민하는 일은 결과의
                <br />
                완성도를 높이고, 더 나은 경험을 만듭니다.
              </p>
            </div>
            <PreviewButton spec={buttonSpec} design={design} scale={MOBILE_SCALE} outlineColor="#80ccff" />
          </div>
        </div>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full font-['Pretendard'] text-[12px] leading-[18px] font-semibold text-[#333e4c]">{children}</p>
  );
}

function TextField({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <div className="flex h-[34px] w-full items-center rounded-[6px] bg-[#f6f7f9] px-[12px] py-[8px]">
      <p
        className={`min-w-px flex-1 truncate font-['Pretendard'] text-[12px] leading-[18px] font-normal ${
          value ? 'text-black' : 'text-[#99a0aa]'
        }`}
      >
        {value ?? placeholder}
      </p>
    </div>
  );
}

type DropdownProps = {
  label: string;
  value: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

function Dropdown({ label, value, isOpen = false, onToggle }: DropdownProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[6px]">
      <p className="w-full font-['Pretendard'] text-[11px] leading-[14px] font-medium text-[#667080]">{label}</p>
      <button
        type="button"
        onClick={onToggle}
        className={`flex h-[34px] w-[240px] cursor-pointer items-center justify-center gap-[6px] overflow-hidden rounded-[6px] border border-solid bg-white py-[9px] pr-[9px] pl-[12px] ${
          isOpen ? 'border-[#1a66ff]' : 'border-[rgba(51,62,76,0.1)]'
        }`}
      >
        <span className="min-w-px flex-1 text-left font-['Pretendard'] text-[12px] leading-[18px] font-normal text-black">{value}</span>
        <img src={iconChevronDownPanel} alt="" width={16} height={16} />
      </button>
    </div>
  );
}


type OptionMenuProps<T extends string> = {
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
  // 드롭다운 바로 아래 위치 (화면 기준 y)
  top: number;
  icons?: Record<T, string>;
};

function OptionMenu<T extends string>({ options, selected, onSelect, top, icons }: OptionMenuProps<T>) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top }}
      className="absolute left-[1232px] flex w-[240px] flex-col items-start overflow-hidden rounded-[8px] border border-solid border-[rgba(51,62,76,0.1)] bg-white pt-[10px] shadow-[0px_0px_1px_0px_rgba(65,78,97,0.08),0px_16px_64px_0px_rgba(65,78,97,0.16)]"
    >
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="flex h-[38px] w-full cursor-pointer items-center gap-[8px] px-[12px] py-[10px] hover:bg-[#f6f7f9]"
          >
            {icons && <img src={icons[option]} alt="" width={24} height={18} />}
            <span
              className={`min-w-px flex-1 truncate text-left font-['Pretendard'] text-[12px] leading-[18px] font-normal ${
                isSelected ? 'text-[#1a66ff]' : 'text-black'
              }`}
            >
              {option}
            </span>
            {isSelected && <img src={iconCheck} alt="" width={16} height={16} />}
          </button>
        );
      })}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-[12px] border-t border-solid border-[rgba(51,62,76,0.1)] px-[12px] pt-[11px] pb-[11px] hover:bg-[#f6f7f9]"
      >
        <span className="min-w-px flex-1 truncate text-left font-['Pretendard'] text-[12px] leading-[18px] font-normal text-black">
          공통 스타일 편집
        </span>
        <img src={iconChevronRightEdge} alt="" width={18} height={18} />
      </button>
    </div>
  );
}

// 패딩 슬라이더 범위 (em)
const PADDING_MIN = 0;
const PADDING_X_MAX = 5;
const PADDING_Y_MAX = 5;
const PADDING_STEP = 0.1;

function clampPadding(value: number, max: number) {
  return Math.min(max, Math.max(PADDING_MIN, value));
}

// 패딩 값은 소수 둘째 자리까지 표시, 둘째 자리가 0이면 첫째 자리까지 (1.85 / 1.0)
function formatPadding(value: number) {
  const fixed = value.toFixed(2);
  return fixed.endsWith('0') ? fixed.slice(0, -1) : fixed;
}

type PaddingSliderProps = {
  value: number;
  max: number;
  disabled?: boolean;
  onChange: (value: number) => void;
};

function PaddingSlider({ value, max, disabled = false, onChange }: PaddingSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isKnobHovered, setIsKnobHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const percent = ((clampPadding(value, max) - PADDING_MIN) / (max - PADDING_MIN)) * 100;

  function updateFromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onChange(clampPadding(PADDING_MIN + ratio * (max - PADDING_MIN), max));
  }

  return (
    <div className="flex w-full items-center gap-[4px]">
      <button
        type="button"
        aria-label="줄이기"
        disabled={disabled}
        onClick={() => onChange(clampPadding(value - PADDING_STEP, max))}
        className="shrink-0 cursor-pointer disabled:cursor-default"
      >
        <img src={disabled ? iconMinusSmallDisabled : iconMinusSmall} alt="" width={20} height={20} />
      </button>
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={PADDING_MIN}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onPointerDown={(e) => {
          if (disabled) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setIsDragging(true);
          updateFromPointer(e.clientX);
        }}
        onPointerUp={() => setIsDragging(false)}
        onLostPointerCapture={() => setIsDragging(false)}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) updateFromPointer(e.clientX);
        }}
        className={`relative flex h-[20px] min-w-px flex-1 touch-none flex-col items-start justify-center py-[5px] ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <div
          className={`absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 rounded-[100px] ${disabled ? 'bg-[#f6f7f9]' : 'bg-[#e4e6e9]'}`}
        />
        <div className={`relative h-[2px] rounded-[100px] ${disabled ? 'bg-[#d3d6da]' : 'bg-[#181d25]'}`} style={{ width: `${percent}%` }}>
          {/* 핸들: 기본 10px 점, hover·드래그 시 흰 배경 + 2px 테두리 링(18px) — 값 위치 중심 유지 */}
          <div
            onPointerEnter={() => setIsKnobHovered(true)}
            onPointerLeave={() => setIsKnobHovered(false)}
            className={`absolute top-1/2 right-0 flex size-[18px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[100px] border-2 border-solid p-[2px] ${
              !disabled && (isKnobHovered || isDragging)
                ? 'border-[#181d25] bg-white [filter:drop-shadow(0px_1px_4px_rgba(65,78,97,0.16))_drop-shadow(0px_2px_12px_rgba(65,78,97,0.2))]'
                : 'border-transparent'
            }`}
          >
            <div
              className={`size-[10px] shrink-0 rounded-[100px] ${
                disabled
                  ? 'bg-[#d3d6da]'
                  : 'bg-[#181d25] shadow-[0px_1px_8px_0px_rgba(65,78,97,0.16),0px_2px_24px_0px_rgba(65,78,97,0.2)]'
              }`}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="늘리기"
        disabled={disabled}
        onClick={() => onChange(clampPadding(value + PADDING_STEP, max))}
        className="shrink-0 cursor-pointer disabled:cursor-default"
      >
        <img src={disabled ? iconPlusSmallDisabled : iconPlusSmall} alt="" width={20} height={20} />
      </button>
    </div>
  );
}

function Checkbox({ checked, label, onChange }: { checked: boolean; label: string; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex w-full cursor-pointer items-center justify-center gap-[4px] rounded-[8px]">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span className="relative size-[20px] shrink-0 overflow-hidden rounded-[4px]">
        {checked ? (
          <>
            <span className="absolute top-1/2 left-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-black" />
            <img src={iconCheckSmall} alt="" width={20} height={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </>
        ) : (
          <span className="absolute top-1/2 left-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-solid border-[rgba(51,62,76,0.24)]" />
        )}
      </span>
      <span className="min-w-px flex-1 font-['Pretendard'] text-[11px] leading-[14px] font-normal text-[#414e61]">{label}</span>
    </label>
  );
}

type PaddingFieldProps = {
  icon: string;
  label: string;
  sliderLabel: string;
  sliderMax: number;
  value: string;
  onChange: (value: string) => void;
  // '너비 채우기' 옵션 (모바일 좌우 패딩 전용)
  fillWidth?: boolean;
  onFillWidthChange?: (fillWidth: boolean) => void;
};

function PaddingField({ icon, label, sliderLabel, sliderMax, value, onChange, fillWidth = false, onFillWidthChange }: PaddingFieldProps) {
  const [isActive, setIsActive] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  // 입력창·슬라이더 바깥을 누르면 포커스 상태 해제
  useEffect(() => {
    if (!isActive) return;
    function handlePointerDown(e: PointerEvent) {
      if (!fieldRef.current?.contains(e.target as Node)) setIsActive(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isActive]);

  return (
    <div ref={fieldRef} className="relative min-w-px flex-1">
      <label
        className={`flex h-[34px] w-full cursor-text items-center gap-[6px] rounded-[6px] bg-[#f6f7f9] px-[9px] py-[7px] ${
          isActive ? 'shadow-[inset_0_0_0_1px_#1a66ff]' : 'hover:shadow-[inset_0_0_0_1px_rgba(51,62,76,0.16)]'
        }`}
      >
        <img src={icon} alt="" width={16} height={16} />
        <input
          type="text"
          inputMode="decimal"
          aria-label={label}
          value={fillWidth ? 'Max' : value}
          onFocus={() => setIsActive(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              setIsActive(false);
              e.currentTarget.blur();
            }
          }}
          // Enter·포커스 해제 시 0~최대값으로 맞추고 소수 둘째 자리로 반영
          onBlur={(e) => {
            if (!fillWidth) onChange(formatPadding(clampPadding(toEm(e.currentTarget.value), sliderMax)));
          }}
          // 너비 채우기 상태에서 숫자를 입력하면 상위 onChange에서 해제됨
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
          className="w-full min-w-px flex-1 bg-transparent font-['Pretendard'] text-[12px] leading-[18px] font-normal text-black caret-black outline-none"
        />
        {!fillWidth && (
          <span className="font-['Pretendard'] text-[11px] leading-[14px] font-normal whitespace-nowrap text-[#99a0aa]">em</span>
        )}
      </label>
      {isActive && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-10 flex w-[216px] flex-col items-center gap-[16px] overflow-hidden rounded-[8px] border border-solid border-[rgba(51,62,76,0.1)] bg-white p-[12px] shadow-[0px_4px_10px_0px_rgba(65,78,97,0.08)]">
          <p className="w-[190px] font-['Pretendard'] text-[11px] leading-[14px] font-medium text-[#667080]">{sliderLabel}</p>
          <PaddingSlider value={toEm(value)} max={sliderMax} disabled={fillWidth} onChange={(next) => onChange(formatPadding(next))} />
          {onFillWidthChange && <Checkbox checked={fillWidth} label="너비 채우기" onChange={onFillWidthChange} />}
        </div>
      )}
    </div>
  );
}

type CustomPaddingEditorProps = {
  value: CustomPadding;
  onChange: (value: CustomPadding) => void;
};

function CustomPaddingEditor({ value, onChange }: CustomPaddingEditorProps) {
  const viewports = [
    { key: 'desktop', label: '데스크탑' },
    { key: 'mobile', label: '모바일' },
  ] as const;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[20px] rounded-[6px] border border-solid border-[rgba(51,62,76,0.1)] p-[11px]">
      {viewports.map(({ key, label }) => (
        <div key={key} className="flex w-full flex-col items-start gap-[6px]">
          <p className="w-full font-['Pretendard'] text-[11px] leading-[14px] font-medium text-[#667080]">{label}</p>
          <div className="flex w-full items-start gap-[6px]">
            <PaddingField
              icon={iconPaddingX}
              label={`${label} 좌우 패딩`}
              sliderLabel="좌우 패딩"
              sliderMax={PADDING_X_MAX}
              value={value[key].x}
              onChange={(x) =>
                key === 'mobile'
                  ? onChange({ ...value, mobile: { ...value.mobile, x }, mobileFillWidth: false })
                  : onChange({ ...value, [key]: { ...value[key], x } })
              }
              {...(key === 'mobile' && {
                fillWidth: value.mobileFillWidth,
                onFillWidthChange: (mobileFillWidth: boolean) => onChange({ ...value, mobileFillWidth }),
              })}
            />
            <PaddingField
              icon={iconPaddingY}
              label={`${label} 상하 패딩`}
              sliderLabel="상하 패딩"
              sliderMax={PADDING_Y_MAX}
              value={value[key].y}
              onChange={(y) => onChange({ ...value, [key]: { ...value[key], y } })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

type OpenMenu = 'design' | 'size' | null;

type ButtonPanelProps = {
  size: SizeOption;
  design: DesignOption;
  openMenu: OpenMenu;
  onToggleMenu: (menu: Exclude<OpenMenu, null>) => void;
  customPadding: CustomPadding;
  onChangeCustomPadding: (value: CustomPadding) => void;
};

function ButtonPanel({ size, design, openMenu, onToggleMenu, customPadding, onChangeCustomPadding }: ButtonPanelProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-[75px] right-[20px] flex flex-col items-start rounded-[12px] bg-white shadow-[0px_4px_10px_0px_rgba(65,78,97,0.08)]"
    >
      <div className="flex w-[280px] flex-col items-start rounded-[12px] bg-white drop-shadow-[0px_4px_5px_rgba(65,78,97,0.08)]">
        <div className="flex h-[52px] w-full items-center gap-[8px] py-[16px] pr-[16px] pl-[20px]">
          <p className="font-['Pretendard'] text-[14px] leading-[20px] font-semibold whitespace-nowrap text-black">버튼</p>
        </div>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-start gap-[12px] border-b border-solid border-[rgba(51,62,76,0.1)] px-[20px] pt-[8px] pb-[19px]">
            <SectionLabel>버튼 문구</SectionLabel>
            <TextField value="Learn more" />
          </div>
          <div className="flex w-full flex-col items-start gap-[12px] border-b border-solid border-[rgba(51,62,76,0.1)] px-[20px] pt-[20px] pb-[19px]">
            <SectionLabel>링크</SectionLabel>
            <TextField placeholder="페이지 선택 혹은 URL 주소 입력" />
          </div>
          <div className="flex w-full flex-col items-start gap-[12px] border-b border-solid border-[rgba(51,62,76,0.1)] px-[20px] pt-[20px] pb-[19px]">
            <SectionLabel>스타일</SectionLabel>
            <div className="flex w-full flex-col items-start gap-[20px]">
              <Dropdown label="디자인" value={design} isOpen={openMenu === 'design'} onToggle={() => onToggleMenu('design')} />
              <div className="flex w-full flex-col items-start justify-center gap-[6px]">
                <Dropdown label="크기" value={size} isOpen={openMenu === 'size'} onToggle={() => onToggleMenu('size')} />
                {size === '사용자 지정' && <CustomPaddingEditor value={customPadding} onChange={onChangeCustomPadding} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ButtonSizeScreen() {
  const [size, setSize] = useState<SizeOption>('보통');
  const [design, setDesign] = useState<DesignOption>('강조 버튼');
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [customPadding, setCustomPadding] = useState<CustomPadding>(DEFAULT_CUSTOM_PADDING);

  return (
    <div onClick={() => setOpenMenu(null)} className="relative h-[982px] w-[1512px] overflow-hidden bg-[#e4e6e9]">
      <Toolbar />
      <DesktopPreview design={design} buttonSpec={resolveButtonSpec(size, customPadding.desktop, customPadding.fontSize)} />
      <MobilePreview
        design={design}
        buttonSpec={resolveButtonSpec(size, customPadding.mobile, customPadding.fontSize, customPadding.mobileFillWidth)}
      />
      <ButtonPanel
        size={size}
        design={design}
        openMenu={openMenu}
        onToggleMenu={(menu) => setOpenMenu((current) => (current === menu ? null : menu))}
        customPadding={customPadding}
        onChangeCustomPadding={setCustomPadding}
      />
      {openMenu === 'design' && (
        <OptionMenu
          options={DESIGN_OPTIONS}
          selected={design}
          icons={DESIGN_ICONS}
          top={432}
          onSelect={(option) => {
            setDesign(option);
            // 텍스트 버튼은 패딩이 없어 사용자 지정 미제공 → 보통으로 전환
            if (option === '텍스트 버튼' && size === '사용자 지정') setSize('보통');
            setOpenMenu(null);
          }}
        />
      )}
      {openMenu === 'size' && (
        <OptionMenu
          options={design === '텍스트 버튼' ? SIZE_OPTIONS.filter((option) => option !== '사용자 지정') : SIZE_OPTIONS}
          selected={size}
          top={505}
          onSelect={(option) => {
            // 프리셋 → 사용자 지정 전환 시 직전 프리셋 설정을 그대로 이어받음
            if (option === '사용자 지정' && size !== '사용자 지정') setCustomPadding(customPaddingFromPreset(size));
            setSize(option);
            setOpenMenu(null);
          }}
        />
      )}
    </div>
  );
}
