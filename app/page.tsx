"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tab } from "./types";
import HomeTab from "./components/HomeTab";
import ClassificationTab from "./components/ClassificationTab";
import DatasetTab from "./components/DatasetTab";
import AnalyticsTab from "./components/AnalyticsTab";
import AboutTab from "./components/AboutTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-base">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="material-symbols-outlined text-primary cursor-pointer md:hidden hover:bg-surface-container p-2 rounded-full transition-colors"
          >
            menu
          </button>
          <span className="font-title-lg text-title-lg font-bold text-primary select-none">
            Lepidoptera Archive
          </span>
        </div>
        
        {/* Desktop Header Links */}
        <div className="hidden md:flex ml-auto gap-lg select-none">
          <button
            onClick={() => handleTabChange("home")}
            className={`transition-colors font-label-md text-label-md cursor-pointer ${
              activeTab === "home" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleTabChange("classification")}
            className={`transition-colors font-label-md text-label-md cursor-pointer ${
              activeTab === "classification" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Identify
          </button>
          <button
            onClick={() => handleTabChange("dataset")}
            className={`transition-colors font-label-md text-label-md cursor-pointer ${
              activeTab === "dataset" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Dataset
          </button>

          <button
            onClick={() => handleTabChange("analytics")}
            className={`transition-colors font-label-md text-label-md cursor-pointer ${
              activeTab === "analytics" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => handleTabChange("about")}
            className={`transition-colors font-label-md text-label-md cursor-pointer ${
              activeTab === "about" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            About
          </button>
        </div>
      </header>

      {/* NavigationDrawer (Desktop Only) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 p-4 w-80 bg-surface border-r border-outline-variant mt-16 select-none justify-between">
        <div className="flex flex-col gap-xs mt-4">
          <button
            onClick={() => handleTabChange("home")}
            className={`flex items-center gap-md px-md py-sm rounded-full transition-all duration-200 cursor-pointer w-full text-left ${
              activeTab === "home"
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: activeTab === "home" ? "'FILL' 1" : undefined }}
            >
              home
            </span>
            <span className="font-title-lg text-title-lg">Home</span>
          </button>

          <button
            onClick={() => handleTabChange("classification")}
            className={`flex items-center gap-md px-md py-sm rounded-full transition-all duration-200 cursor-pointer w-full text-left ${
              activeTab === "classification"
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: activeTab === "classification" ? "'FILL' 1" : undefined }}
            >
              biotech
            </span>
            <span className="font-title-lg text-title-lg">Classification</span>
          </button>

          <button
            onClick={() => handleTabChange("dataset")}
            className={`flex items-center gap-md px-md py-sm rounded-full transition-all duration-200 cursor-pointer w-full text-left ${
              activeTab === "dataset"
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: activeTab === "dataset" ? "'FILL' 1" : undefined }}
            >
              database
            </span>
            <span className="font-title-lg text-title-lg">Dataset</span>
          </button>



          <button
            onClick={() => handleTabChange("analytics")}
            className={`flex items-center gap-md px-md py-sm rounded-full transition-all duration-200 cursor-pointer w-full text-left ${
              activeTab === "analytics"
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: activeTab === "analytics" ? "'FILL' 1" : undefined }}
            >
              bar_chart
            </span>
            <span className="font-title-lg text-title-lg">Analytics</span>
          </button>

          <button
            onClick={() => handleTabChange("about")}
            className={`flex items-center gap-md px-md py-sm rounded-full transition-all duration-200 cursor-pointer w-full text-left ${
              activeTab === "about"
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: activeTab === "about" ? "'FILL' 1" : undefined }}
            >
              info
            </span>
            <span className="font-title-lg text-title-lg">About</span>
          </button>
        </div>

        <div className="pt-lg border-t border-outline-variant mb-20">
          <span className="font-title-lg text-title-lg font-bold text-primary tracking-tight select-none">
            Lepidoptera Archive
          </span>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          ></div>
          {/* Drawer content */}
          <div className="relative flex flex-col w-80 max-w-sm bg-surface h-full p-6 shadow-2xl border-r border-outline-variant pt-20 animate-slide-in">
            <nav className="flex flex-col gap-sm">
              <button
                onClick={() => handleTabChange("home")}
                className={`flex items-center gap-md px-4 py-3 rounded-full text-left w-full cursor-pointer ${
                  activeTab === "home" ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="font-title-lg text-title-lg">Home</span>
              </button>
              <button
                onClick={() => handleTabChange("classification")}
                className={`flex items-center gap-md px-4 py-3 rounded-full text-left w-full cursor-pointer ${
                  activeTab === "classification" ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">biotech</span>
                <span className="font-title-lg text-title-lg">Classification</span>
              </button>
              <button
                onClick={() => handleTabChange("dataset")}
                className={`flex items-center gap-md px-4 py-3 rounded-full text-left w-full cursor-pointer ${
                  activeTab === "dataset" ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">database</span>
                <span className="font-title-lg text-title-lg">Dataset</span>
              </button>

              <button
                onClick={() => handleTabChange("analytics")}
                className={`flex items-center gap-md px-4 py-3 rounded-full text-left w-full cursor-pointer ${
                  activeTab === "analytics" ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">bar_chart</span>
                <span className="font-title-lg text-title-lg">Analytics</span>
              </button>
              <button
                onClick={() => handleTabChange("about")}
                className={`flex items-center gap-md px-4 py-3 rounded-full text-left w-full cursor-pointer ${
                  activeTab === "about" ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">info</span>
                <span className="font-title-lg text-title-lg">About</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-80 mt-16 flex flex-col justify-between">
        <div className="flex-1">
          {activeTab === "home" && <HomeTab setActiveTab={handleTabChange} />}
          {activeTab === "classification" && <ClassificationTab />}
          {activeTab === "dataset" && <DatasetTab />}

          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "about" && <AboutTab />}
        </div>

        {/* Footer */}
        <footer className="w-full py-8 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant select-none">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-1">
            <span className="font-title-lg text-title-lg font-bold text-primary">
              Lepidoptera Archive
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-tight">
              Identifikasi Spesies Lepidoptera<br />Melalui Pola Sayap
            </p>
          </div>
        </footer>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 md:hidden bg-surface border-t border-outline-variant select-none">
        <button
          onClick={() => handleTabChange("home")}
          className={`flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 ${
            activeTab === "home" ? "text-primary font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: activeTab === "home" ? "'FILL' 1" : undefined }}
          >
            home
          </span>
          <span className="font-label-md text-label-md">Home</span>
        </button>

        <button
          onClick={() => handleTabChange("classification")}
          className={`flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 ${
            activeTab === "classification" ? "text-primary font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: activeTab === "classification" ? "'FILL' 1" : undefined }}
          >
            biotech
          </span>
          <span className="font-label-md text-label-md">Identify</span>
        </button>

        <button
          onClick={() => handleTabChange("dataset")}
          className={`flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 ${
            activeTab === "dataset" ? "text-primary font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: activeTab === "dataset" ? "'FILL' 1" : undefined }}
          >
            database
          </span>
          <span className="font-label-md text-label-md">Dataset</span>
        </button>



        <button
          onClick={() => handleTabChange("analytics")}
          className={`flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 ${
            activeTab === "analytics" ? "text-primary font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: activeTab === "analytics" ? "'FILL' 1" : undefined }}
          >
            bar_chart
          </span>
          <span className="font-label-md text-label-md">Analytics</span>
        </button>

        <button
          onClick={() => handleTabChange("about")}
          className={`flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 ${
            activeTab === "about" ? "text-primary font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: activeTab === "about" ? "'FILL' 1" : undefined }}
          >
            info
          </span>
          <span className="font-label-md text-label-md">About</span>
        </button>
      </nav>
    </div>
  );
}
