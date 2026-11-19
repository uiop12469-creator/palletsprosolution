import { useState, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type { CameraAnglePreset, ProductCategoryId } from '../types/packaging';

interface PhotorealisticProductStageProps {
  productId: ProductCategoryId;
  initialAngle?: CameraAnglePreset;
  rotateOnHoverOnly?: boolean;
  showAssemblyControls?: boolean;
  compact?: boolean;
}

const PRODUCT_IMAGE_MAP: Record<ProductCategoryId, { src: string; alt: string }> = {
  'wooden-pallets': {
    src: '/assets/products/wooden-pallet.png',
    alt: 'Photorealistic industrial 4-way wooden pallet',
  },
  'plastic-pallets': {
    src: '/assets/products/plastic-pallet.png',
    alt: 'Photorealistic royal blue industrial HDPE plastic pallet',
  },
  'wooden-packing-boxes': {
    src: '/assets/products/wooden-packing-box.png',
    alt: 'Photorealistic reinforced wooden packing box crate with corner brackets',
  },
};

const ANGLE_TRANSFORMS: Record<
  CameraAnglePreset,
  { label: string; rotateX: number; rotateY: number; scale: number }
> = {
  isometric: { label: '3D Studio', rotateX: 0, rotateY: 0, scale: 1 },
  top: { label: 'Elevated', rotateX: 16, rotateY: -6, scale: 1.06 },
  'fork-entry': { label: 'Fork Entry', rotateX: -8, rotateY: 14, scale: 1.1 },
  'low-profile': { label: 'Detail Zoom', rotateX: 4, rotateY: -12, scale: 1.18 },
};

export function PhotorealisticProductStage({
  productId,
  initialAngle = 'isometric',
  rotateOnHoverOnly = false,
  showAssemblyControls = false,
  compact = false,
}: PhotorealisticProductStageProps) {
  const [activeAngle, setActiveAngle] = useState<CameraAnglePreset>(initialAngle);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [showStructureLayers, setShowStructureLayers] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(compact);

  const asset = PRODUCT_IMAGE_MAP[productId];
  const preset = ANGLE_TRANSFORMS[activeAngle];

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -ny * (rotateOnHoverOnly ? 16 : 11),
      ry: nx * (rotateOnHoverOnly ? 22 : 14),
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const effectiveScale = preset.scale * (zoomed ? 1.16 : 1);

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#071526]"
      style={{ perspective: '1200px' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle website-matched deep navy backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(16, 27, 42, 0.92) 0%, rgba(7, 21, 38, 1) 74%)',
        }}
      />

      {/* Soft grounded floor shadow beneath the transparent cutout */}
      <div
        className="pointer-events-none absolute bottom-[18%] left-1/2 h-8 w-[64%] -translate-x-1/2 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(2, 8, 18, 0.85) 0%, transparent 72%)',
        }}
      />

      {/* Interactive 3D Perspective Product Stage */}
      <motion.div
        animate={{
          rotateX: preset.rotateX + tilt.rx,
          rotateY: preset.rotateY + tilt.ry,
          scale: effectiveScale,
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 22,
          mass: 0.7,
        }}
        className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex max-h-full w-full max-w-[540px] items-center justify-center">
          <img
            src={asset.src}
            alt={asset.alt}
            className="max-h-[300px] w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.6)] sm:max-h-[340px]"
          />

          {/* Structural Blueprint Callouts when toggled for Wooden Packing Boxes */}
          {showAssemblyControls && showStructureLayers && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[14%] top-[16%] rounded border border-[#A5F044]/70 bg-[#071526]/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg">
                Galvanized Steel Corner Brackets
              </div>
              <div className="absolute right-[10%] top-[44%] rounded border border-[#A5F044]/70 bg-[#071526]/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg">
                Framed Timber Battens &amp; Infill Panels
              </div>
              <div className="absolute bottom-[10%] left-[22%] rounded border border-[#A5F044]/70 bg-[#071526]/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg">
                4-Way Palletized Skid Base
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Collapsible Bottom Dock */}
      {!compact && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex flex-col items-center px-3">
          <button
            type="button"
            onClick={() => setControlsCollapsed((v) => !v)}
            className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#071526]/95 px-2.5 py-1 text-[11px] font-medium text-[#AEB8C5] transition-colors hover:border-[#A5F044]/50 hover:text-white"
          >
            {controlsCollapsed ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 text-[#A5F044]" />
                <span>Show Inspection Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 text-[#A5F044]" />
                <span>Hide Controls</span>
              </>
            )}
          </button>

          {!controlsCollapsed && (
            <div className="pointer-events-auto flex w-full max-w-[96%] flex-wrap items-center justify-between gap-2 rounded-lg border border-white/12 bg-[#071526]/95 px-3 py-2 shadow-xl">
              <div className="flex flex-wrap items-center gap-1">
                {(Object.keys(ANGLE_TRANSFORMS) as CameraAnglePreset[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveAngle(key)}
                    className={`whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                      activeAngle === key
                        ? 'bg-[#A5F044] text-[#071526]'
                        : 'text-[#AEB8C5] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {ANGLE_TRANSFORMS[key].label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {showAssemblyControls && (
                  <button
                    type="button"
                    onClick={() => setShowStructureLayers((s) => !s)}
                    className={`rounded border px-2.5 py-1 text-xs font-medium transition-colors ${
                      showStructureLayers
                        ? 'border-[#A5F044] bg-[#A5F044]/15 text-[#A5F044]'
                        : 'border-white/15 bg-[#101B2A] text-white hover:border-[#A5F044]/60'
                    }`}
                  >
                    {showStructureLayers ? 'Hide Structural Specs' : 'Structural Breakdown'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="inline-flex items-center gap-1 rounded border border-white/15 bg-[#101B2A] px-2.5 py-1 text-xs font-medium text-[#AEB8C5] transition-colors hover:border-[#A5F044]/60 hover:text-white"
                >
                  {zoomed ? (
                    <>
                      <ZoomOut className="h-3.5 w-3.5 text-[#A5F044]" />
                      <span>Reset Zoom</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-3.5 w-3.5 text-[#A5F044]" />
                      <span>Zoom</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveAngle('isometric');
                    setZoomed(false);
                    setTilt({ rx: 0, ry: 0 });
                  }}
                  aria-label="Reset view"
                  className="inline-flex items-center gap-1 rounded border border-white/15 bg-[#101B2A] px-2 py-1 text-xs font-medium text-[#AEB8C5] transition-colors hover:border-[#A5F044]/60 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-[#A5F044]" />
                </button>

                {rotateOnHoverOnly && (
                  <span className="hidden text-[11px] font-medium text-[#A5F044] sm:inline">
                    {isHovered ? '3D Tilt Active' : 'Hover to Tilt'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
