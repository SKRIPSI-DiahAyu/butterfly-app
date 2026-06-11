"use client";

import React from "react";
import Image from "next/image";
import { Tab } from "../types";

interface HomeTabProps {
  setActiveTab: (tab: Tab) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-lowest py-xl md:py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Content */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center px-sm py-xs bg-secondary-fixed text-on-secondary-fixed rounded-full mb-md select-none">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">
                KLASIFIKASI SPESIES LEPIDOPTERA
              </span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-base leading-tight">
              Sistem Klasifikasi Spesies Kupu-Kupu Berdasarkan Pola Sayap
            </h1>
            <p className="font-title-lg text-title-lg text-secondary mb-md">
              Menggunakan CNN dengan Arsitektur EfficientNet-B0 untuk akurasi tinggi.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-2xl">
              Platform penelitian untuk identifikasi spesies Lepidoptera melalui pemrosesan citra digital
              secara real-time. Membantu peneliti dan pecinta alam mengidentifikasi spesies dengan cepat
              dan akurat.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <button
                onClick={() => setActiveTab("classification")}
                className="bg-[#FF9F1C] text-[#212529] font-title-lg text-title-lg px-lg py-md rounded-lg shadow-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-base cursor-pointer"
              >
                Mulai Klasifikasi
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className="border border-secondary text-secondary font-title-lg text-title-lg px-lg py-md rounded-lg hover:bg-surface-container-high transition-all flex items-center justify-center gap-base cursor-pointer"
              >
                Pelajari Metodologi
              </button>
            </div>
          </div>

          {/* Visual Anchor */}
          <div className="lg:col-span-5 relative mt-lg lg:mt-0">
            <div className="aspect-square rounded-full bg-primary-container/10 absolute -top-10 -right-10 blur-3xl w-full h-full -z-10"></div>
            <div className="relative rounded-xl overflow-hidden border border-outline-variant bg-white p-base shadow-md transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                <Image
                  alt="Specimen Detail"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src="/assets/specimen_morpho.jpg"
                  fill
                  priority
                />
              </div>
              <div className="mt-base flex justify-between items-center">
                <div>
                  <p className="font-label-md text-label-md text-primary">Specimen #8842</p>
                  <p className="font-label-sm text-label-sm text-outline italic">Morpho Menelaus</p>
                </div>
                <div className="px-sm py-xs bg-surface-container-high rounded border border-outline-variant select-none">
                  <span className="font-label-sm text-label-sm text-secondary">98.4% Confidence</span>
                </div>
              </div>
            </div>
            {/* Decorative Floating Card */}

          </div>
        </div>
      </section>

      {/* Goals & Features Bento Grid */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-lg text-center md:text-left select-none">
            <h2 className="font-headline-md text-headline-md text-primary">Tujuan Sistem &amp; Kapabilitas</h2>
            <div className="w-24 h-1 bg-secondary-fixed mt-base mx-auto md:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Feature 1: Identifikasi Akurat (Wide) */}
            <div className="lg:col-span-2 bg-white border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row gap-lg items-center hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-base">
                  Identifikasi Akurat
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Algoritma kami dilatih pada ribuan citra spesimen dari berbagai genus. Mengoptimalkan
                  pola sayap, tekstur, dan gradasi warna untuk memberikan hasil klasifikasi dengan presisi
                  tingkat laboratorium.
                </p>
              </div>
              <div className="w-full md:w-64 h-36 relative bg-surface-container rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  alt="Pattern Analysis"
                  className="object-cover"
                  src="/assets/pattern_analysis.jpg"
                  fill
                />
              </div>
            </div>

            {/* Feature 2: Kecepatan Real-time */}
            <div className="bg-primary-container text-on-primary-container rounded-xl p-lg flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined" style={{ fontSize: "48px" }}>
                speed
              </span>
              <div className="mt-8">
                <h3 className="font-headline-sm text-headline-sm mb-base">Kecepatan Real-time</h3>
                <p className="font-body-md text-body-md opacity-90">
                  Proses klasifikasi diselesaikan dalam milidetik, memungkinkan penggunaan langsung di
                  lapangan melalui perangkat mobile.
                </p>
              </div>
            </div>

            {/* Feature 3: Konservasi Alam */}
            <div className="bg-surface-container-high border border-outline-variant rounded-xl p-lg flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: "48px" }}>
                nature
              </span>
              <div className="mt-8">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-base">
                  Konservasi Alam
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Mendukung upaya pemetaan biodiversitas global dengan menyediakan alat identifikasi terbuka
                  bagi seluruh komunitas penelitian.
                </p>
              </div>
            </div>

            {/* Feature 4: Dataset Terverifikasi (Wide) */}
            <div className="lg:col-span-2 bg-secondary-container text-on-secondary-container rounded-xl p-lg flex flex-col md:flex-row-reverse gap-lg items-center hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="font-headline-sm text-headline-sm mb-base">Dataset Terverifikasi</h3>
                <p className="font-body-lg text-body-lg opacity-90">
                  Setiap hasil klasifikasi dapat dibandingkan dengan dataset historis yang telah divalidasi oleh
                  pakar entomologi, menjamin integritas data penelitian Anda.
                </p>
              </div>
              <div className="w-full md:w-64 h-36 relative bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30 overflow-hidden shrink-0">
                <Image
                  alt="Scientific Data"
                  className="object-cover opacity-80 mix-blend-multiply"
                  src="/assets/scientific_grid.jpg"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
