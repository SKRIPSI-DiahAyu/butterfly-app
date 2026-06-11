"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Species } from "../types";

import { supabase } from "../lib/supabase";

// Mapping gambar referensi spesies untuk tampilan premium
const speciesImages: Record<string, string> = {
  "BANDED ORANGE HELICONIAN": "/assets/pattern_analysis.jpg",
  "BECKERS WHITE": "/assets/scientific_grid.jpg",
  "CABBAGE WHITE": "/assets/wing_scale_macro.jpg",
  "GREAT EGGFLY": "/assets/great_eggfly.jpg",
  "BLUE MORPHO": "/assets/specimen_morpho.jpg",
  "MONARCH": "/assets/specimen_morpho.jpg",
  "ULYSSES": "/assets/specimen_morpho.jpg",
  "default": "/assets/specimen_morpho.jpg"
};

export default function DatasetTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [detailDescription, setDetailDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Load species list from Supabase
  useEffect(() => {
    async function fetchSpecies() {
      try {
        const { data, error } = await supabase
          .from("spesies")
          .select("id, nama_umum, nama_ilmiah, status_verifikasi, is_verified")
          .order("nama_umum", { ascending: true });
        
        if (error) throw error;
        
        const mapped: Species[] = (data || []).map(item => ({
          id: item.id,
          name: item.nama_umum,
          scientificName: item.nama_ilmiah,
          status: item.status_verifikasi as "TERVERIFIKASI" | "PENDING_REVIEW",
          verified: item.is_verified
        }));
        
        setSpeciesList(mapped);
      } catch (err) {
        console.error("Error fetching species:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSpecies();
  }, []);

  // Filter pencarian
  const filteredSpecies = speciesList.filter(
    (sp) =>
      sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset ke halaman 1 jika query pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Kalkulasi pagination
  const totalPages = Math.max(1, Math.ceil(filteredSpecies.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSpecies.length);
  const paginatedSpecies = filteredSpecies.slice(startIndex, endIndex);

  // Navigasi halaman
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleOpenDetail = async (sp: Species) => {
    setSelectedSpecies(sp);
    setDetailDescription("Memuat deskripsi...");
    setIsOpen(true);

    try {
      const { data, error } = await supabase
        .from("spesies")
        .select("deskripsi")
        .eq("id", sp.id)
        .single();
      
      if (error) throw error;
      if (data) {
        setDetailDescription(data.deskripsi || "Deskripsi tidak tersedia.");
      }
    } catch (err) {
      console.error("Error fetching description:", err);
      setDetailDescription("Gagal memuat deskripsi dari database.");
    }
  };

  // Membuat daftar tombol nomor halaman
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="pt-24 pb-32 md:pb-16 px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Header Section */}
      <section className="mb-lg select-none">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-base">
          Katalog Spesies Lepidoptera
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Halaman ini berisi daftar spesies Lepidoptera yang digunakan sebagai referensi dalam sistem klasifikasi. Pengguna dapat mencari spesies dan melihat informasi detail setiap spesies.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="mb-md">
        <div className="relative w-full max-w-xl group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nama umum atau nama ilmiah spesies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all font-body-md text-on-surface"
          />
        </div>
      </section>

      {/* Species List (Table Pattern) */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden mb-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-surface-container-high select-none">
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant w-1/2">Nama Spesies</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant w-2/5">Nama Ilmiah</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant border-b border-outline-variant text-right w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-on-surface">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-md py-8 text-center text-on-surface-variant select-none">
                    <div className="flex flex-col items-center gap-xs">
                      <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
                      <p className="text-xs font-semibold mt-2">Memuat Katalog Spesies...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedSpecies.length > 0 ? (
                paginatedSpecies.map((sp) => (
                  <tr key={sp.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-md py-4 font-title-lg text-title-lg text-primary font-bold">{sp.name}</td>
                    <td className="px-md py-4 font-body-md text-body-md italic text-secondary font-medium">{sp.scientificName}</td>
                    <td className="px-md py-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(sp)}
                        className="p-2 hover:bg-secondary-fixed rounded-full text-secondary hover:text-primary transition-all cursor-pointer inline-flex items-center justify-center hover:scale-105"
                        title="Lihat Detail"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-md py-8 text-center text-on-surface-variant select-none">
                    Spesies tidak ditemukan dalam katalog referensi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info & Controls */}
        <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-base border-t border-outline-variant select-none">
          <span className="text-sm text-on-surface-variant">
            Menampilkan {filteredSpecies.length > 0 ? startIndex + 1 : 0}-{endIndex} dari {filteredSpecies.length} spesies
          </span>
          <div className="flex items-center gap-xs">
            {/* Tombol Sebelumnya */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-on-surface bg-surface ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed hover:bg-surface"
                  : "hover:bg-surface-container-high"
              }`}
            >
              Sebelumnya
            </button>

            {/* Nomor Halaman */}
            <div className="flex gap-xs">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                    currentPage === pageNumber
                      ? "bg-primary text-white font-bold"
                      : "bg-surface border border-outline-variant hover:bg-surface-container-high text-on-surface"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Tombol Berikutnya */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-on-surface bg-surface ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed hover:bg-surface"
                  : "hover:bg-surface-container-high"
              }`}
            >
              Berikutnya
            </button>
          </div>
        </div>
      </section>

      {/* Modal Detail Popup */}
      {isOpen && selectedSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl w-full max-w-2xl p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
              <h3 className="text-lg font-bold text-primary font-title-lg flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary">menu_book</span>
                Referensi Detail Spesies
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-4 text-on-surface text-left">
              {/* Species Image Header */}
              <div className="relative w-full h-52 rounded-lg overflow-hidden border border-outline-variant/60 bg-surface shadow-inner">
                <Image
                  alt={selectedSpecies.name}
                  className="object-cover"
                  src={speciesImages[selectedSpecies.name] || speciesImages["default"]}
                  fill
                />
              </div>

              {/* Title Info */}
              <div>
                <h4 className="text-2xl font-extrabold text-primary leading-tight font-headline-sm">
                  {selectedSpecies.name}
                </h4>
                <p className="italic text-base text-secondary font-medium mt-1">
                  {selectedSpecies.scientificName}
                </p>
              </div>

              {/* Description Block */}
              <div className="border-t border-outline-variant pt-4 mt-2">
                <span className="text-xs uppercase font-bold tracking-wider text-outline block mb-2">
                  Karakteristik &amp; Deskripsi Morfologi:
                </span>
                <div className="p-4 bg-surface-container-low border-l-4 border-secondary rounded-r-lg">
                  <p className="text-sm text-justify leading-relaxed text-on-surface-variant">
                    {detailDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-outline-variant pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-medium text-sm shadow cursor-pointer"
              >
                Tutup Referensi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference Information Section */}
      <section className="bg-primary text-on-primary p-lg rounded-lg flex flex-col md:flex-row items-center gap-lg shadow-md select-none">
        <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden relative shrink-0">
          <Image alt="Referensi Morfologi" className="object-cover" src="/assets/wing_scale_macro.jpg" fill />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-headline-sm text-headline-sm mb-base text-on-primary font-bold">Referensi Spesies Lepidoptera</h3>
          <p className="font-body-md text-body-md text-on-primary-container/90 leading-relaxed">
            Halaman ini menyediakan katalog spesies Lepidoptera yang digunakan sebagai referensi dalam sistem klasifikasi. Setiap entri memuat nama spesies, nama ilmiah, dan deskripsi singkat untuk membantu pengguna memahami karakteristik dasar spesies yang tersedia.
          </p>
        </div>
      </section>
    </main>
  );
}