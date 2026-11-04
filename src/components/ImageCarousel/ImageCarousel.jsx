"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX, FiImage } from "react-icons/fi";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { getCallHref, getWhatsAppHref } from "@/config/contact";
import "swiper/css";

const imageUrl = image =>
  (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/$/, "") + "/storage/" + image.path;
const imageLabel = (image, index) => image.caption?.trim() || `MV Teknaf - Photo ${index + 1}`;
const controlClass = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-900 hover:bg-blue-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-40";

function GalleryLightbox({ open, onClose, image, index, total, onPrevious, onNext }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="MV Teknaf photo viewer"
      aria-modal="true"
      className="m-auto w-[calc(100%-24px)] max-w-[1500px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-0 text-white shadow-2xl backdrop:bg-slate-950/90"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="text-sm font-medium">MV Teknaf <span className="ml-2 text-slate-400">Photo Gallery</span></p>
        <button type="button" onClick={onClose} aria-label="Close photo viewer" className="rounded-full p-3 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><FiX size={22} /></button>
      </div>
      {open && image && (
        <div className="relative h-[55vh] sm:h-[70vh]" onClick={event => event.stopPropagation()}>
          <Image src={imageUrl(image)} alt={imageLabel(image, index)} fill sizes="(min-width: 1524px) 1500px, calc(100vw - 24px)" className="object-contain" />
        </div>
      )}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-sm text-slate-300" aria-live="polite">{image ? imageLabel(image, index) : ""}</p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" disabled={total < 2} onClick={onPrevious} aria-label="Previous photo" className="rounded-full p-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 disabled:opacity-40"><FiArrowLeft size={20} /></button>
          <span className="min-w-12 text-center text-sm tabular-nums">{index + 1} / {total}</span>
          <button type="button" disabled={total < 2} onClick={onNext} aria-label="Next photo" className="rounded-full p-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 disabled:opacity-40"><FiArrowRight size={20} /></button>
        </div>
      </div>
    </dialog>
  );
}

function ThumbnailGrid({ images, activeIndex, limit, className, onSelect, onViewMore }) {
  const hasMore = images.length > limit;
  const regularCount = hasMore ? limit - 1 : images.length;

  return (
    <div role="group" aria-label="Choose a gallery photo" className={`grid gap-2 border-t border-slate-100 bg-slate-50/80 p-3 sm:gap-3 sm:p-4 ${className}`}>
      {images.slice(0, limit).map((image, photoIndex) => {
        const isMore = hasMore && photoIndex === limit - 1;
        const remaining = images.length - regularCount;
        const isActive = isMore ? activeIndex >= regularCount : photoIndex === activeIndex;

        return (
          <button
            key={image.image_id || image.path}
            type="button"
            onClick={() => { onSelect(photoIndex); if (isMore) onViewMore(); }}
            aria-label={isMore ? `View ${remaining} more photos` : `Show ${imageLabel(image, photoIndex)}`}
            aria-current={isActive ? "true" : undefined}
            className={`relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${isActive ? "border-blue-700" : "border-transparent hover:border-slate-300"}`}
          >
            <Image src={imageUrl(image)} alt="" fill sizes="(min-width: 1152px) 166px, (min-width: 1024px) calc((100vw - 156px) / 6), (min-width: 640px) calc((100vw - 140px) / 6), calc((100vw - 80px) / 4)" className="object-cover" />
            {isMore && <span className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/65 text-white"><span className="text-xl font-semibold tabular-nums sm:text-2xl">+{remaining}</span><span className="mt-0.5 text-[10px] font-medium sm:text-xs">more photos</span></span>}
          </button>
        );
      })}
    </div>
  );
}

export default function ImageCarousel({ propertyImages }) {
  const images = Array.isArray(propertyImages) ? propertyImages.filter(image => image?.path) : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const swiperRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const index = Math.min(activeIndex, Math.max(0, images.length - 1));
  const activeImage = images[index];
  const closeViewer = useCallback(() => setViewerOpen(false), []);

  useEffect(() => {
    const keyboard = swiperRef.current?.keyboard;
    if (viewerOpen) keyboard?.disable();
    else keyboard?.enable();
  }, [viewerOpen]);

  const selectPhoto = nextIndex => {
    if (!images.length) return;
    const normalized = (nextIndex + images.length) % images.length;
    swiperRef.current?.slideTo(normalized);
    setActiveIndex(normalized);
  };


  return (
    <section aria-labelledby="photo-gallery-title" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">A glimpse on board</p>
            <h2 id="photo-gallery-title" className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">Photo <span className="text-red-700">Gallery</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">Take a closer look at MV Teknaf before your next journey.</p>
          </div>
          {images.length > 0 && <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600"><FiImage aria-hidden="true" />{images.length} photos</span>}
        </div>

        {activeImage ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_-20px_rgba(15,23,42,0.25)] sm:rounded-3xl">
            <div className="relative bg-slate-900">
              <Swiper
                modules={[A11y, Keyboard]}
                keyboard={{ enabled: !viewerOpen, onlyInViewport: true }}
                a11y={{ containerMessage: "MV Teknaf photo gallery", itemRoleDescriptionMessage: "photo" }}
                speed={400}
                rewind
                onSwiper={swiper => { swiperRef.current = swiper; }}
                onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
                className="w-full"
              >
                {images.map((image, photoIndex) => (
                  <SwiperSlide key={image.image_id || image.path}>
                    <button type="button" onClick={() => setViewerOpen(true)} aria-label={`Enlarge ${imageLabel(image, photoIndex)}`} className="relative block aspect-[4/3] w-full cursor-zoom-in focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white sm:aspect-[16/9]">
                      <Image src={imageUrl(image)} alt={imageLabel(image, photoIndex)} fill sizes="(min-width: 1152px) 1088px, (min-width: 1024px) calc(100vw - 64px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)" className="object-cover" />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-4 sm:p-6">
                <span className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur-sm">{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => setViewerOpen(true)} className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><FiMaximize2 aria-hidden="true" />View photo</button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Explore the ship</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-800 sm:text-base" aria-live="polite">{imageLabel(activeImage, index)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled={images.length < 2} onClick={() => selectPhoto(index - 1)} aria-label="Previous gallery photo" className={controlClass}><FiArrowLeft size={20} /></button>
                <button type="button" disabled={images.length < 2} onClick={() => selectPhoto(index + 1)} aria-label="Next gallery photo" className={controlClass}><FiArrowRight size={20} /></button>
              </div>
            </div>
            <ThumbnailGrid images={images} activeIndex={index} limit={4} className="grid-cols-4 sm:hidden" onSelect={selectPhoto} onViewMore={() => setViewerOpen(true)} />
            <ThumbnailGrid images={images} activeIndex={index} limit={6} className="hidden grid-cols-6 sm:grid" onSelect={selectPhoto} onViewMore={() => setViewerOpen(true)} />
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"><FiImage size={32} className="mb-3 text-slate-400" aria-hidden="true" /><p className="font-medium text-slate-700">New views are on the way</p><p className="mt-2 text-sm text-slate-500">Our photo gallery is being updated. Contact us to learn more about the ship.</p></div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-blue-50/60 px-5 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-600">Like what you see? <span className="font-medium text-blue-950">Plan your journey with us.</span></p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={getCallHref()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-900/20 bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"><FaPhoneAlt size={13} aria-hidden="true" />Call Now</a>
            <a href={getWhatsAppHref("Hello, I'm interested in booking a package on MV Teknaf.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><FaWhatsapp size={18} aria-hidden="true" />Book Now</a>
          </div>
        </div>
      </div>
      <GalleryLightbox open={viewerOpen} onClose={closeViewer} image={activeImage} index={index} total={images.length} onPrevious={() => selectPhoto(index - 1)} onNext={() => selectPhoto(index + 1)} />
    </section>
  );
}
