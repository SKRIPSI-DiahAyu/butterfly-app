"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutTab() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-24 pb-32 md:pb-16 px-margin-mobile md:px-margin-desktop">
      {/* Hero Section */}
      <section className="mb-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center select-none">
        {/* Left Side: Brand badge, Title & Description */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <div className="inline-flex items-center px-sm py-xs bg-primary-container text-on-primary-container rounded-full border border-primary/20 shadow-sm animate-pulse-slow">
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
              PLATFORM IDENTIFIKASI &amp; ARSIP LEPIDOPTERA
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold leading-tight tracking-tight">
            Mengapa Lepidoptera Archive?
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mt-2">
            Lepidoptera Archive merupakan platform berbasis kecerdasan buatan yang dirancang untuk membantu identifikasi dan dokumentasi spesies kupu-kupu serta ngengat. Sistem ini mengintegrasikan klasifikasi citra, pengelolaan dataset, dan visualisasi data dalam satu antarmuka yang mudah digunakan untuk penelitian dan edukasi.
          </p>
        </div>

        {/* Right Side: Beautiful scientific specimen visual anchor with markings */}
        <div className="lg:col-span-5 relative w-full h-[320px] lg:h-[380px] rounded-xl overflow-hidden border border-outline-variant shadow-lg bg-surface-container-lowest">
          <Image
            alt="Specimen Anatomi Lepidoptera"
            className="object-cover transition-transform duration-700 hover:scale-105"
            src="/assets/pattern_analysis.jpg"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors duration-300"></div>

          {/* SVG Marker overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
            {/* Forewing Marker */}
            <circle cx="160" cy="100" r="6" className="fill-secondary stroke-white stroke-2 animate-ping" />
            <circle cx="160" cy="100" r="4" className="fill-secondary stroke-white stroke-2" />
            <path d="M160,100 L240,60" className="stroke-white/80 stroke-1 stroke-dasharray-[4,4]" />

            {/* Hindwing Marker */}
            <circle cx="280" cy="180" r="6" className="fill-tertiary-fixed-dim stroke-white stroke-2 animate-ping" style={{ animationDelay: "1s" }} />
            <circle cx="280" cy="180" r="4" className="fill-tertiary-fixed-dim stroke-white stroke-2" />
            <path d="M280,180 L320,220" className="stroke-white/80 stroke-1 stroke-dasharray-[4,4]" />

            {/* Antenna Marker */}
            <circle cx="110" cy="140" r="6" className="fill-primary stroke-white stroke-2 animate-ping" style={{ animationDelay: "2s" }} />
            <circle cx="110" cy="140" r="4" className="fill-primary stroke-white stroke-2" />
            <path d="M110,140 L50,110" className="stroke-white/80 stroke-1 stroke-dasharray-[4,4]" />
          </svg>

          {/* Annotation Text Badges */}
          <div className="absolute top-8 right-4 bg-surface/90 backdrop-blur-sm border border-outline-variant px-2 py-1 rounded text-[10px] font-label-md shadow-sm select-none">
            <span className="text-secondary font-bold">Apex Forewing</span>: Deteksi Pola
          </div>

          <div className="absolute bottom-12 right-4 bg-surface/90 backdrop-blur-sm border border-outline-variant px-2 py-1 rounded text-[10px] font-label-md shadow-sm select-none">
            <span className="text-on-tertiary-container font-bold">Hindwing Margin</span>: Analisis Garis
          </div>

          <div className="absolute top-20 left-4 bg-surface/90 backdrop-blur-sm border border-outline-variant px-2 py-1 rounded text-[10px] font-label-md shadow-sm select-none">
            <span className="text-primary font-bold">Antenna Segment</span>: Sensorik
          </div>

          {/* Floating Info Card */}
          <div className="absolute bottom-4 left-4 bg-primary-container/90 backdrop-blur-sm border border-primary/30 px-md py-sm rounded-lg text-xs text-on-primary-container shadow-md select-none max-w-[280px]">
            <p className="font-bold flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">biotech</span>
              Analisis Biomarker Digital
            </p>
            <p className="text-[10px] mt-1 text-on-primary-container/80 leading-normal">
              Identifikasi terfokus pada titik geometris &amp; kontras warna sayap lepidoptera.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="mb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature Card 1: Identifikasi Otomatis */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group">
            <div>
              <div className="flex items-center gap-base mb-md text-secondary select-none">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined font-bold">biotech</span>
                </div>
                <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                  Fitur Utama
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-md font-bold group-hover:text-secondary transition-colors">
                Identifikasi Otomatis
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
                Mengklasifikasikan spesies Lepidoptera dari gambar yang diunggah menggunakan model EfficientNet-B0 secara cepat dan akurat.
              </p>
            </div>

            {/* CSS Mockup of Scan */}
            <div className="mt-4 relative border border-outline-variant/60 rounded-lg overflow-hidden bg-surface h-48 flex items-center justify-center">
              <Image
                alt="Scan simulation specimen"
                src="/assets/great_eggfly.jpg"
                className="object-cover"
                fill
              />
              {/* Scanning line animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF9F1C] to-transparent shadow-[0_0_8px_#FF9F1C] animate-scan-y"></div>

              {/* Scanner Overlay HUD */}
              <div className="absolute inset-x-2 bottom-2 bg-surface-container-lowest/95 backdrop-blur-sm border border-outline-variant/80 p-2 rounded-md flex items-center justify-between shadow-md">
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline font-label-sm">SPECIES DETECTED</span>
                  <span className="text-xs font-bold text-primary italic">Hypolimnas bolina</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#2c694e] font-bold bg-[#b1f0ce]/40 px-2 py-0.5 rounded-full">96.4% Match</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2: Karakteristik Visual */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group">
            <div>
              <div className="flex items-center gap-base mb-md text-[#2c694e] select-none">
                <div className="w-10 h-10 rounded-full bg-[#2c694e]/10 flex items-center justify-center text-[#2c694e]">
                  <span className="material-symbols-outlined font-bold">visibility</span>
                </div>
                <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                  Deteksi Ciri
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-md font-bold group-hover:text-secondary transition-colors">
                Karakteristik Visual
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
                Sistem mengidentifikasi spesies Lepidoptera berdasarkan karakteristik visual yang terlihat pada citra sayap.
              </p>
            </div>

            {/* CSS Mockup of Visual Characteristics */}
            <div className="mt-4 grid grid-cols-2 gap-3 bg-surface p-4 rounded-lg border border-outline-variant/60 h-48 justify-center items-center select-none">
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/30 p-2 rounded-md transition-all hover:border-secondary">
                <span className="material-symbols-outlined text-secondary text-[18px]">pattern</span>
                <span className="text-xs font-semibold text-primary">Pola Sayap</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/30 p-2 rounded-md transition-all hover:border-secondary">
                <span className="material-symbols-outlined text-secondary text-[18px]">palette</span>
                <span className="text-xs font-semibold text-primary">Warna Dominan</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/30 p-2 rounded-md transition-all hover:border-secondary">
                <span className="material-symbols-outlined text-secondary text-[18px]">category</span>
                <span className="text-xs font-semibold text-primary">Bentuk Sayap</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/30 p-2 rounded-md transition-all hover:border-secondary">
                <span className="material-symbols-outlined text-secondary text-[18px]">texture</span>
                <span className="text-xs font-semibold text-primary">Tekstur Visual</span>
              </div>
            </div>
          </div>

          {/* Feature Card 3: Proses Identifikasi */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group">
            <div>
              <div className="flex items-center gap-base mb-md text-primary select-none">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-bold">schema</span>
                </div>
                <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                  Langkah Kerja
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-md font-bold group-hover:text-secondary transition-colors">
                Proses Identifikasi
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
                Model menganalisis pola visual pada gambar dan menghasilkan prediksi spesies berdasarkan fitur yang telah dipelajari selama proses pelatihan.
              </p>
            </div>

            {/* CSS Mockup of Identification Steps */}
            <div className="mt-4 border border-outline-variant/60 rounded-lg p-4 bg-surface flex flex-col gap-2.5 h-48 justify-center select-none text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-[10px]">1</span>
                <span className="font-semibold text-primary">Unggah Gambar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-[10px]">2</span>
                <span className="font-semibold text-primary">Analisis Citra</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-[10px]">3</span>
                <span className="font-semibold text-primary">Ekstraksi Fitur</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#FF9F1C] text-[#212529] font-bold flex items-center justify-center text-[10px] animate-pulse">4</span>
                <span className="font-bold text-primary font-title-lg">Prediksi Spesies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Kerja Identifikasi & Referensi */}
      <section className="bg-white border border-outline-variant p-xl rounded-xl shadow-sm max-w-7xl mx-auto">
        <div className="text-center mb-12 select-none">
          <h3 className="font-headline-md text-headline-md text-primary mb-4 font-bold">
            Alur Kerja Identifikasi &amp; Referensi
          </h3>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Proses mudah mengidentifikasi spesimen dan mempelajari taksonomi Lepidoptera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border-4 border-white shadow-md select-none mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">photo_camera</span>
            </div>
            <div className="flex flex-col items-center select-none mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-container-high rounded text-outline font-label-md mb-1">STEP 01</span>
              <h4 className="font-title-lg text-on-surface font-bold">Pilih Gambar</h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm px-2 mt-1 leading-relaxed">
              Unggah foto kupu-kupu atau ngengat dari komputer atau perangkat seluler Anda.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container border-4 border-white shadow-md select-none mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">online_prediction</span>
            </div>
            <div className="flex flex-col items-center select-none mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#b1f0ce]/40 rounded text-secondary font-label-md mb-1">STEP 02</span>
              <h4 className="font-title-lg text-on-surface font-bold">Identifikasi AI</h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm px-2 mt-1 leading-relaxed">
              Kecerdasan buatan menganalisis karakteristik sayap menggunakan EfficientNet-B0 secara instan.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container border-4 border-white shadow-md select-none mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">fact_check</span>
            </div>
            <div className="flex flex-col items-center select-none mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 rounded text-primary font-label-md mb-1">STEP 03</span>
              <h4 className="font-title-lg text-on-surface font-bold">Lihat Hasil</h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm px-2 mt-1 leading-relaxed">
              Dapatkan prediksi nama spesies secara langsung beserta skor keyakinan klasifikasi.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed border-4 border-white shadow-md select-none mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl font-bold">menu_book</span>
            </div>
            <div className="flex flex-col items-center select-none mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-tertiary-fixed-dim/40 rounded text-tertiary font-label-md mb-1">STEP 04</span>
              <h4 className="font-title-lg text-on-surface font-bold">Katalog Referensi</h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm px-2 mt-1 leading-relaxed">
              Pelajari detail taksonomi, karakteristik fisik, dan deskripsi morfologi spesies teridentifikasi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
