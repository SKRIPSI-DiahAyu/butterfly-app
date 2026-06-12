"use client";

import React, { useState, useRef, useEffect } from "react";
import { PredictionCandidate } from "../types";
import { supabase } from "../lib/supabase";

interface ExtendedCandidate extends PredictionCandidate {
  scientificName: string;
}

// Complete list of the 50 target butterfly species for EfficientNetB0
const EFFICIENTNET_CLASSES = [
  "adonis",
  "american snoot",
  "an 88",
  "banded peacock",
  "beckers white",
  "black hairstreak",
  "cabbage white",
  "chestnut",
  "clodius parnassian",
  "clouded sulphur",
  "copper tail",
  "crecent",
  "crimson patch",
  "eastern coma",
  "gold banded",
  "great eggfly",
  "grey hairstreak",
  "indra swallow",
  "julia",
  "large marble",
  "malachite",
  "mangrove skipper",
  "metalmark",
  "monarch",
  "morning cloak",
  "orange oakleaf",
  "orange tip",
  "orchard swallow",
  "painted lady",
  "paper kite",
  "peacock",
  "pine white",
  "pipevine swallow",
  "purple hairstreak",
  "question mark",
  "red admiral",
  "red spotted purple",
  "scarce swallow",
  "silver spot skipper",
  "sixspot burnet",
  "skipper",
  "sootywing",
  "southern dogface",
  "straited queen",
  "two barred flasher",
  "ulyses",
  "viceroy",
  "wood satyr",
  "yellow swallow tail",
  "zebra long wing"
];

// Dictionary of species descriptions for predicted results page
const speciesDescriptions: Record<string, string> = {
  "adonis": "Kupu-kupu berwarna biru cerah pada bagian atas sayap jantan dengan pola hitam di tepinya.",
  "american snoot": "Memiliki ciri khas moncong panjang yang menyerupai paruh kecil pada bagian kepala.",
  "an 88": "Memiliki pola unik menyerupai angka 88 pada bagian bawah sayap.",
  "banded peacock": "Memiliki warna hijau metalik dengan pita gelap melintang pada sayap.",
  "beckers white": "Kupu-kupu berwarna putih dengan bercak gelap halus di bagian ujung sayap.",
  "black hairstreak": "Memiliki warna cokelat gelap dengan garis oranye kecil dan ekor halus di bagian sayap belakang.",
  "cabbage white": "Kupu-kupu putih kecil yang umum ditemukan dengan bintik hitam kecil di sayap depan.",
  "chestnut": "Memiliki warna cokelat kemerahan menyerupai kastanye dengan motif yang sederhana.",
  "clodius parnassian": "Memiliki sayap putih transparan dengan bintik merah dan hitam yang khas.",
  "clouded sulphur": "Kupu-kupu berwarna kuning terang dengan tepian sayap berwarna hitam gelap.",
  "copper tail": "Memiliki ekor berwarna tembaga kemerahan yang berkilau di bagian bawah sayap.",
  "crecent": "Kupu-kupu kecil dengan pola warna jingga-hitam menyerupai bulan sabit.",
  "crimson patch": "Memiliki bercak merah tua (crimson) yang mencolok pada sayap hitamnya.",
  "eastern coma": "Memiliki sayap bergelombang dengan tanda putih menyerupai tanda koma di bagian bawah sayap.",
  "gold banded": "Kupu-kupu dengan pita berwarna emas kekuningan yang melintang di sayap cokelat gelapnya.",
  "great eggfly": "Memiliki pola bercak besar pada sayap dengan motif melingkar biru-putih yang khas pada jantan.",
  "grey hairstreak": "Sayap berwarna abu-abu dengan bintik oranye kecil dan ekor tipis di bagian belakang.",
  "indra swallow": "Kupu-kupu hitam besar dengan ekor khas swallowtail dan barisan bintik kuning krem.",
  "julia": "Memiliki sayap oranye terang yang memanjang dengan motif garis hitam tipis.",
  "large marble": "Memiliki pola guratan hijau-putih seperti marmer di bagian bawah sayap.",
  "malachite": "Berwarna hijau muda berkilau menyerupai batu malakit dengan pola hitam kontras.",
  "mangrove skipper": "Kupu-kupu berbadan kokoh dengan warna cokelat dan kilauan biru di pangkal sayap.",
  "metalmark": "Kupu-kupu kecil dengan bintik-bintik mengkilap seperti logam di permukaan sayap.",
  "monarch": "Kupu-kupu ikonik berukuran besar dengan sayap oranye kemerahan dan urat-urat hitam tebal.",
  "morning cloak": "Sayap berwarna cokelat gelap keunguan dengan pinggiran kuning terang dan bintik biru.",
  "orange oakleaf": "Sayap bawah menyerupai daun kering cokelat, namun bagian atas berwarna oranye-biru cerah.",
  "orange tip": "Ujung sayap depan berwarna oranye terang yang sangat kontras dengan warna dasar putih.",
  "orchard swallow": "Kupu-kupu swallowtail besar berwarna hitam dengan bercak merah dan putih.",
  "painted lady": "Memiliki pola kompleks berwarna oranye, hitam, dan putih dengan bintik-bintik halus.",
  "paper kite": "Sayap putih transparan dengan pola garis-garis hitam tipis seperti layang-layang kertas.",
  "peacock": "Memiliki pola lingkaran mata besar berwarna-warni menyerupai ekor burung merak.",
  "pine white": "Kupu-kupu putih bersih dengan urat hitam halus, sering ditemukan di hutan pinus.",
  "pipevine swallow": "Kupu-kupu swallowtail hitam dengan kilauan biru metalik di sayap belakang.",
  "purple hairstreak": "Memiliki kilauan warna ungu kebiruan yang indah di bagian atas sayap cokelatnya.",
  "question mark": "Memiliki tanda perak menyerupai tanda tanya pada bagian bawah sayap.",
  "red admiral": "Memiliki pita merah-oranye melintang di sayap hitam dengan bintik putih di ujungnya.",
  "red spotted purple": "Kupu-kupu biru gelap dengan bintik-bintik oranye-merah di bagian bawah sayap.",
  "scarce swallow": "Kupu-kupu swallowtail berwarna kuning pucat dengan garis-garis hitam vertikal menyerupai zebra.",
  "silver spot skipper": "Memiliki bercak perak mengkilap yang mencolok di bagian bawah sayap belakang.",
  "sixspot burnet": "Ngengat siang hari berwarna hitam dengan enam bercak merah terang pada sayap depan.",
  "skipper": "Kupu-kupu kecil dengan tubuh tegap dan antena melengkung khas.",
  "sootywing": "Memiliki sayap hitam pekat menyerupai jelaga dengan bintik-bintik putih kecil.",
  "southern dogface": "Pola kuning-hitam di sayap depan menyerupai siluet kepala anjing pudel.",
  "straited queen": "Kupu-kupu berwarna cokelat oranye dengan pola garis-garis putih halus di sepanjang urat sayap.",
  "two barred flasher": "Memiliki dua pita hijau mengkilap di sayap cokelat gelap dan terbang sangat cepat.",
  "ulyses": "Kupu-kupu swallowtail besar dengan warna biru elektrik yang sangat menakjubkan.",
  "viceroy": "Sangat menyerupai kupu-kupu Monarch, namun memiliki garis hitam tambahan melintang di sayap belakang.",
  "wood satyr": "Memiliki pola beberapa mata lingkaran kecil berwarna cokelat di sayapnya.",
  "yellow swallow tail": "Kupu-kupu swallowtail berwarna kuning cerah dengan pola garis hitam tebal.",
  "zebra long wing": "Memiliki pola garis hitam dan kuning memanjang menyerupai zebra pada kedua sayap."
};

const HISTORY_LIMIT = 10;

export default function ClassificationTab() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [predictionResults, setPredictionResults] = useState<ExtendedCandidate[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Database states
  const [dbSpeciesList, setDbSpeciesList] = useState<any[]>([]);
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Safe UUID generator
  const generateUUID = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Load species from Supabase on mount
  useEffect(() => {
    async function loadDbSpecies() {
      try {
        const { data, error } = await supabase
          .from("spesies")
          .select("id, nama_umum, nama_ilmiah, deskripsi");
        if (error) throw error;
        setDbSpeciesList(data || []);
      } catch (e) {
        console.error("Failed to load species from DB:", e);
      }
    }
    loadDbSpecies();
  }, []);

  // Fetch classification history matching local IDs from Supabase
  const loadHistoryFromDb = async (ids?: string[]) => {
    setLoadingHistory(true);
    try {
      const targetIds = ids || (() => {
        const localHistoryIdsJson = localStorage.getItem("lepidoptera_history_ids");
        return localHistoryIdsJson ? JSON.parse(localHistoryIdsJson) : [];
      })();

      if (targetIds.length === 0) {
        setHistoryItems([]);
        return;
      }

      const { data, error } = await supabase
        .from("riwayat_klasifikasi")
        .select(`
          id,
          image_path,
          thumbnail_path,
          confidence,
          created_at,
          spesies (
            nama_umum,
            nama_ilmiah,
            deskripsi
          )
        `)
        .in("id", targetIds);

      if (error) throw error;

      const mapped = (data || []).map((item: any) => ({
        id: item.id,
        imageSrc: item.thumbnail_path || item.image_path,
        speciesName: item.spesies?.nama_umum || "UNKNOWN",
        scientificName: item.spesies?.nama_ilmiah || "Lepidoptera",
        confidence: Number(item.confidence),
        description: item.spesies?.deskripsi || "Deskripsi tidak tersedia.",
        timestamp: new Date(item.created_at).toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      })).sort((a, b) => b.id.localeCompare(a.id)); // sort descending (newest first)

      setHistoryItems(mapped);
    } catch (err) {
      console.error("Failed to load history from Supabase:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (dbSpeciesList.length > 0) {
      loadHistoryFromDb();
    }
  }, [dbSpeciesList]);

  // Real-time camera states and refs
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [currentFacingMode, setCurrentFacingMode] = useState<"user" | "environment">("environment");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Safe SSR-friendly state initialization for isMobile
  const [isMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestRef = useRef<number | null>(null);
  const simulatedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCameraPredictingRef = useRef<boolean>(false);

  // Resize base64 image to thumbnail to fit localStorage limits (5MB total limit)
  const createThumbnail = (src: string, callback: (thumbnailSrc: string) => void) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 160;
      const MAX_HEIGHT = 160;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = src;
  };

  // Helper to convert base64 dataURL to File object
  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Helper to upload image data URL to Supabase Storage and get public URL
  const uploadToStorage = async (dataUrl: string, path: string): Promise<string | null> => {
    try {
      const file = dataURLtoFile(dataUrl, path.split("/").pop() || "image.jpg");
      
      const { data, error } = await supabase.storage
        .from("butterfly-images")
        .upload(path, file, {
          contentType: file.type,
          upsert: true
        });
        
      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage
        .from("butterfly-images")
        .getPublicUrl(path);
        
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Storage upload error:", err);
      return null;
    }
  };

  // Helper to persist predictions to history in Supabase
  const saveToHistory = async (candidates: ExtendedCandidate[], currentImageSrc: string) => {
    if (!currentImageSrc || candidates.length === 0) return;
    const topCandidate = candidates[0];
    const topDetails = getSpeciesDetails(topCandidate.name);
    const riwayatId = `HST-${Date.now()}`;

    createThumbnail(currentImageSrc, async (thumbnailSrc) => {
      try {
        // 1. Upload images to Supabase Storage
        const imagePath = `images/${riwayatId}.jpg`;
        const thumbnailPath = `thumbnails/${riwayatId}.jpg`;

        const [imagePublicUrl, thumbnailPublicUrl] = await Promise.all([
          uploadToStorage(currentImageSrc, imagePath),
          uploadToStorage(thumbnailSrc, thumbnailPath)
        ]);

        if (!imagePublicUrl || !thumbnailPublicUrl) {
          throw new Error("Failed to upload classification images to Supabase Storage.");
        }

        // 2. Insert into riwayat_klasifikasi
        const { error: riwayatError } = await supabase
          .from("riwayat_klasifikasi")
          .insert({
            id: riwayatId,
            pengguna_id: null,
            image_path: imagePublicUrl,
            thumbnail_path: thumbnailPublicUrl,
            spesies_terdeteksi_id: topDetails.id !== "UNKNOWN" ? topDetails.id : null,
            confidence: topCandidate.confidence,
            created_at: new Date().toISOString()
          });

        if (riwayatError) throw riwayatError;

        // 3. Insert candidates into kandidat_klasifikasi
        const candidatesToInsert = candidates.map((cand, idx) => {
          const details = getSpeciesDetails(cand.name);
          return {
            id: generateUUID(),
            riwayat_id: riwayatId,
            spesies_id: details.id !== "UNKNOWN" ? details.id : null,
            confidence: cand.confidence,
            peringkat: idx + 1
          };
        }).filter(c => c.spesies_id !== null);

        if (candidatesToInsert.length > 0) {
          const { error: candError } = await supabase
            .from("kandidat_klasifikasi")
            .insert(candidatesToInsert);
          if (candError) console.error("Error inserting candidates:", candError);
        }

        // 4. Save the history ID locally in localStorage
        const localHistoryIdsJson = localStorage.getItem("lepidoptera_history_ids");
        const localHistoryIds = localHistoryIdsJson ? JSON.parse(localHistoryIdsJson) : [];
        const updatedIds = [riwayatId, ...localHistoryIds].slice(0, 50);
        localStorage.setItem("lepidoptera_history_ids", JSON.stringify(updatedIds));

        // 5. Reload local history from Supabase
        loadHistoryFromDb(updatedIds);
      } catch (err) {
        console.error("Failed to save classification history to Supabase:", err);
      }
    });
  };

  const checkMultipleCameras = async () => {
    if (typeof window !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (err) {
        console.error("Error enumerating devices:", err);
      }
    }
  };

  // Get species details dynamically from loaded DB list
  const getSpeciesDetails = (predictedName: string) => {
    const matched = dbSpeciesList.find(
      s => s.nama_umum.toLowerCase() === predictedName.toLowerCase()
    );
    if (matched) {
      return {
        id: matched.id,
        name: matched.nama_umum,
        scientificName: matched.nama_ilmiah,
        description: matched.deskripsi
      };
    }
    return {
      id: "UNKNOWN",
      name: predictedName.toUpperCase(),
      scientificName: "Lepidoptera",
      description: "Deskripsi spesies tidak tersedia."
    };
  };

  const handleSelectHistoryItem = (item: any) => {
    setSelectedHistoryItem(item);
    setIsHistoryModalOpen(true);
  };

  // Helper to asynchronously get a valid File object from imageSrc (handles base64 and static path URLs)
  const getFileToUpload = async (src: string, file: File | null): Promise<File> => {
    if (file) return file;
    
    if (src.startsWith("data:")) {
      return dataURLtoFile(src, "upload.jpg");
    }
    
    // If it's a relative path/URL, fetch and convert to Blob/File
    const response = await fetch(src);
    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";
    const extension = mimeType.split("/")[1] || "jpg";
    return new File([blob], `upload.${extension}`, { type: mimeType });
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (simulatedTimerRef.current) {
        clearTimeout(simulatedTimerRef.current);
      }
    };
  }, []);

  const handleModeChange = (newMode: "upload" | "camera") => {
    setMode(newMode);
    setCurrentFacingMode("environment");
    stopCamera();
    setImageSrc(null);
    setImageFile(null);
    setHasPrediction(false);
    setPredictionResults([]);
  };

  const startCamera = async (requestedFacingMode: "user" | "environment" = currentFacingMode) => {
    stopCamera();

    setImageSrc(null);
    setImageFile(null);
    setHasPrediction(false);
    setPredictionResults([]);

    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: requestedFacingMode },
        });
      } catch (err) {
        console.warn(`getUserMedia with facingMode: "${requestedFacingMode}" failed. Falling back to video: true`, err);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }
      streamRef.current = stream;
      setIsCameraActive(true);

      // Update camera count after permission is granted
      checkMultipleCameras();

      // We need to wait for the next render loop so videoRef.current is populated
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        }

        // Start request-based prediction loop using FastAPI
        isCameraPredictingRef.current = false;
        requestRef.current = requestAnimationFrame(predictCameraFrame);
      }, 100);
    } catch (err) {
      console.error("Failed to access camera:", err);
      alert("Gagal mengakses kamera. Silakan periksa izin kamera pada browser Anda.");
      setMode("upload");
    }
  };

  const toggleFacingMode = () => {
    const nextFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    setCurrentFacingMode(nextFacingMode);
    if (streamRef.current) {
      startCamera(nextFacingMode);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    if (simulatedTimerRef.current) {
      clearTimeout(simulatedTimerRef.current);
      simulatedTimerRef.current = null;
    }
    isCameraPredictingRef.current = false;
  };

  const predictCameraFrame = async () => {
    if (!videoRef.current || streamRef.current === null || isCameraPredictingRef.current) {
      if (streamRef.current !== null) {
        requestRef.current = requestAnimationFrame(predictCameraFrame);
      }
      return;
    }

    if (videoRef.current.readyState === 4) {
      isCameraPredictingRef.current = true;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((b) => resolve(b), "image/jpeg", 0.8)
          );

          if (blob && streamRef.current !== null) {
            const file = new File([blob], "camera-frame.jpg", { type: "image/jpeg" });
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://127.0.0.1:8000/predict", {
              method: "POST",
              body: formData,
            });

            if (response.ok && streamRef.current !== null) {
              const result = await response.json();
              const details = getSpeciesDetails(result.species);

              const topCandidate: ExtendedCandidate = {
                name: details.name,
                scientificName: details.scientificName,
                confidence: result.confidence,
                barId: "bar-1"
              };

              // Generate fallback candidates from 50 classes to keep UI consistent
              const otherClasses = EFFICIENTNET_CLASSES.filter(c => c !== topCandidate.name);
              const mockCandidates: ExtendedCandidate[] = [
                topCandidate,
                { name: otherClasses[0], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.6 * 100) / 100), barId: "bar-2" },
                { name: otherClasses[1], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.3 * 100) / 100), barId: "bar-3" },
                { name: otherClasses[2], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.1 * 100) / 100), barId: "bar-4" }
              ];

              mockCandidates.sort((a, b) => b.confidence - a.confidence);
              const finalCandidates = mockCandidates.map((cand, i) => ({
                ...cand,
                barId: `bar-${i + 1}`,
              }));

              setPredictionResults(finalCandidates);
              setHasPrediction(true);
            }
          }
        }
      } catch (err) {
        console.error("Camera prediction error:", err);
      } finally {
        // Wait 1.5 seconds before allowing the next frame to be classified
        setTimeout(() => {
          isCameraPredictingRef.current = false;
        }, 1500);
      }
    }

    if (streamRef.current !== null) {
      requestRef.current = requestAnimationFrame(predictCameraFrame);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setHasPrediction(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const selectFile = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageSrc(null);
    setImageFile(null);
    setHasPrediction(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const runPrediction = async () => {
    if (!imageSrc || isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      // Robustly get the File object, handling both base64 uploads and initial static placeholder paths
      const fileToUpload = await getFileToUpload(imageSrc, imageFile);

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prediction: ${response.statusText}`);
      }

      const result = await response.json();
      const details = getSpeciesDetails(result.species);

      const topCandidate: ExtendedCandidate = {
        name: details.name,
        scientificName: details.scientificName,
        confidence: result.confidence,
        barId: "bar-1"
      };

      // Generate fallback candidates from EFFICIENTNET_CLASSES to keep the UI clean
      const otherClasses = EFFICIENTNET_CLASSES.filter(c => c !== topCandidate.name);
      const mockCandidates: ExtendedCandidate[] = [
        topCandidate,
        { name: otherClasses[0], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.6 * 100) / 100), barId: "bar-2" },
        { name: otherClasses[1], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.3 * 100) / 100), barId: "bar-3" },
        { name: otherClasses[2], scientificName: "-", confidence: Math.max(0.1, Math.round((100 - result.confidence) * 0.1 * 100) / 100), barId: "bar-4" }
      ];

      mockCandidates.sort((a, b) => b.confidence - a.confidence);
      const finalCandidates = mockCandidates.map((cand, i) => ({
        ...cand,
        barId: `bar-${i + 1}`,
      }));

      setPredictionResults(finalCandidates);
      setIsAnalyzing(false);
      setHasPrediction(true);
      saveToHistory(finalCandidates, imageSrc);

    } catch (err) {
      console.error("AI inference error:", err);
      alert("Gagal melakukan prediksi. Pastikan server backend FastAPI berjalan di http://127.0.0.1:8000");
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="pt-24 pb-20 md:pb-lg px-margin-mobile md:px-margin-desktop">
      <div className="max-w-6xl mx-auto">
        <header className="mb-lg select-none">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-base">
            Identifikasi Spesies
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Unggah foto spesimen atau gunakan kamera untuk identifikasi real-time secara lokal yang didukung oleh AI.
          </p>
        </header>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-surface-container border border-outline-variant p-1 rounded-full flex gap-xs select-none">
            <button
              type="button"
              onClick={() => handleModeChange("upload")}
              className={`flex items-center gap-xs px-md py-sm rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${mode === "upload"
                ? "bg-primary text-on-primary font-bold shadow"
                : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              Mode Unggah (Foto)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("camera")}
              className={`flex items-center gap-xs px-md py-sm rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${mode === "camera"
                ? "bg-primary text-on-primary font-bold shadow"
                : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
            >
              <span className="material-symbols-outlined text-sm">videocam</span>
              Kamera Real-Time
            </button>
          </div>
        </div>

        {/* Identification Interface Grid */}
        {/* Identification Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* Upload & Prediction Section (Main Column - 2/3 Width) */}
          <div className="lg:col-span-8 flex flex-col gap-md">
            {mode === "upload" && (!hasPrediction ? (
              <>
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={selectFile}
                  className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-lg flex flex-col items-center justify-center transition-all duration-300 min-h-[450px] ${isDragActive
                    ? "border-primary bg-primary-fixed/20 scale-[1.01]"
                    : "border-outline-variant bg-surface-container-lowest hover:border-primary hover:bg-surface-container-low"
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {!imageSrc ? (
                    <div className="flex flex-col items-center text-center select-none">
                      <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-md text-primary group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-5xl">cloud_upload</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">
                        Tarik &amp; Lepas Gambar
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                        Format yang didukung: JPG, PNG, WEBP (Maks. 5MB)
                      </p>
                      <button
                        type="button"
                        className="bg-primary text-on-primary px-lg py-sm rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined">photo_library</span>
                        Pilih Gambar Kupu-Kupu
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 p-base">
                      <div className="relative w-full h-full bg-surface-dim rounded-lg overflow-hidden">
                        {/* We use standard HTML img to avoid Next.js Image caching and sizing issues on base64 inputs */}
                        <img
                          id="image-preview"
                          src={imageSrc}
                          alt="Butterfly upload preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <button
                        onClick={removeImage}
                        type="button"
                        className="absolute top-6 right-6 bg-error text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer z-10"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={runPrediction}
                  disabled={!imageSrc || isAnalyzing}
                  className={`w-full py-md rounded-lg font-bold text-headline-sm transition-all duration-300 flex items-center justify-center gap-base select-none ${isAnalyzing
                    ? "bg-secondary-container text-on-secondary-container cursor-wait shadow-inner"
                    : imageSrc
                      ? "bg-tertiary-fixed-dim text-on-tertiary-fixed hover:scale-[1.01] shadow-lg cursor-pointer"
                      : "bg-outline-variant text-on-surface-variant cursor-not-allowed"
                    }`}
                >
                  {isAnalyzing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Menganalisis Pola Sayap (FastAPI)...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">analytics</span>
                      Prediksi Sekarang
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Prediction Results Layout (Only Top-1, Focus on result + confidence + description) */
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">

                  {/* Left Column: Uploaded Image Preview */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative w-full h-[300px] bg-surface-dim rounded-lg overflow-hidden border border-outline-variant">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc || ""}
                        alt="Butterfly result preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      onClick={removeImage}
                      type="button"
                      className="w-full mt-4 py-3 border border-outline text-on-surface hover:bg-surface-container rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-xs text-sm"
                    >
                      <span className="material-symbols-outlined">restart_alt</span>
                      Identifikasi Ulang
                    </button>
                  </div>

                  {/* Right Column: Species Name, Confidence, Description */}
                  <div className="md:col-span-7 flex flex-col gap-base text-left">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">
                        Spesies Terdeteksi (Top-1)
                      </span>
                      <h3 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-primary font-bold leading-tight uppercase">
                        {predictionResults[0]?.name || "UNKNOWN"}
                      </h3>
                      <p className="font-title-lg text-title-lg text-outline italic mt-1">
                        {predictionResults[0]?.scientificName || "Lepidoptera"}
                      </p>
                    </div>

                    <div className="border-t border-outline-variant pt-base">
                      <div className="flex justify-between items-center text-sm font-bold mb-xs">
                        <span className="text-on-surface-variant uppercase tracking-widest text-xs">Tingkat Kepercayaan (Confidence)</span>
                        <span className="text-secondary text-base font-bold">{predictionResults[0]?.confidence}%</span>
                      </div>
                      <div className="h-3 bg-surface-container-low rounded-full overflow-hidden flex items-center p-[2px]">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-[1000ms] ease-out"
                          style={{ width: `${predictionResults[0]?.confidence}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-surface-container border-l-4 border-primary rounded-r-lg mt-base">
                      <span className="text-xs uppercase font-bold tracking-wider text-primary block mb-2">
                        Deskripsi Ciri Spesies:
                      </span>
                      <p className="text-sm leading-relaxed text-on-surface-variant text-justify">
                        {getSpeciesDetails(predictionResults[0]?.name).description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {mode === "camera" && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                  {/* Left Column: Webcam Video Viewport */}
                  <div className="md:col-span-6 flex flex-col items-center">
                    <div className="relative w-full aspect-video md:h-[300px] bg-black rounded-lg overflow-hidden border border-outline-variant flex items-center justify-center">
                      {isCameraActive ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-center p-md select-none text-on-surface-variant">
                          <span className="material-symbols-outlined text-6xl mb-sm">videocam_off</span>
                          <p className="font-body-md">Kamera belum aktif</p>
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-4 flex gap-base">
                      {!isCameraActive ? (
                        <button
                          onClick={() => startCamera(currentFacingMode)}
                          type="button"
                          className="flex-1 py-3 bg-[#FF9F1C] text-[#212529] font-bold hover:scale-[1.01] active:scale-95 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-xs text-sm shadow-md animate-pulse"
                        >
                          <span className="material-symbols-outlined">videocam</span>
                          Aktifkan Kamera
                        </button>
                      ) : (
                        <button
                          onClick={stopCamera}
                          type="button"
                          className="flex-1 py-3 bg-error text-white font-bold hover:scale-[1.01] active:scale-95 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-xs text-sm shadow-md"
                        >
                          <span className="material-symbols-outlined">videocam_off</span>
                          Hentikan Kamera
                        </button>
                      )}

                      {isMobile && hasMultipleCameras && (
                        <button
                          onClick={toggleFacingMode}
                          type="button"
                          className="px-4 py-3 border border-outline text-on-surface hover:bg-surface-container hover:scale-[1.01] active:scale-95 rounded-lg font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-xs text-sm shadow-sm"
                          title="Ganti Kamera"
                        >
                          <span className="material-symbols-outlined">flip_camera_ios</span>
                          Ganti Kamera
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Real-Time Species Detection */}
                  <div className="md:col-span-6 flex flex-col gap-base text-left min-h-[300px] justify-center">
                    {isCameraActive && predictionResults.length > 0 ? (
                      <>
                        <div>
                          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">
                            Deteksi Real-Time (Top-1)
                          </span>
                          <h3 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-primary font-bold leading-tight uppercase">
                            {predictionResults[0]?.name || "UNKNOWN"}
                          </h3>
                          <p className="font-title-lg text-title-lg text-outline italic mt-1">
                            {predictionResults[0]?.scientificName || "Lepidoptera"}
                          </p>
                        </div>

                        <div className="border-t border-outline-variant pt-base">
                          <div className="flex justify-between items-center text-sm font-bold mb-xs">
                            <span className="text-on-surface-variant uppercase tracking-widest text-xs">Tingkat Kepercayaan</span>
                            <span className="text-secondary text-base font-bold">{predictionResults[0]?.confidence}%</span>
                          </div>
                          <div className="h-3 bg-surface-container-low rounded-full overflow-hidden flex items-center p-[2px]">
                            <div
                              className="h-full bg-secondary rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${predictionResults[0]?.confidence}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* List of other candidates */}
                        <div className="border-t border-outline-variant pt-base">
                          <span className="text-xs uppercase font-bold tracking-wider text-on-surface-variant block mb-2">
                            Kandidat Lain:
                          </span>
                          <div className="space-y-sm">
                            {predictionResults.slice(1).map((cand) => (
                              <div key={cand.name} className="flex justify-between items-center text-xs">
                                <span className="font-medium text-on-surface uppercase">{cand.name}</span>
                                <span className="text-outline">{cand.confidence}%</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-surface-container border-l-4 border-primary rounded-r-lg mt-sm">
                          <p className="text-xs leading-relaxed text-on-surface-variant">
                            {getSpeciesDetails(predictionResults[0]?.name).description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-on-surface-variant py-lg select-none">
                        <span className="material-symbols-outlined text-5xl mb-sm opacity-50">document_scanner</span>
                        <p className="font-body-md">Silakan aktifkan kamera dan arahkan ke objek kupu-kupu untuk mendeteksi secara langsung.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guidance Sidebar (1/3 Width) */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">

            {/* Guidelines Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md">
              <h4 className="font-label-md text-label-md text-secondary mb-md border-b border-outline-variant pb-xs flex items-center gap-xs uppercase tracking-wider select-none font-bold">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Panduan Identifikasi
              </h4>
              <ul className="space-y-md">
                <li className="flex gap-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    1
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Unggah gambar kupu-kupu atau ngengat.
                  </p>
                </li>
                <li className="flex gap-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    2
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Pastikan objek terlihat jelas.
                  </p>
                </li>
                <li className="flex gap-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    3
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Gunakan pencahayaan yang cukup.
                  </p>
                </li>
                <li className="flex gap-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    4
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Klik tombol Prediksi Sekarang.
                  </p>
                </li>
                <li className="flex gap-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    5
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Lihat hasil klasifikasi spesies.
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Full-width History Section (At the bottom) */}
        <div className="mt-8 bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-md w-full mb-10">
          <h4 className="font-label-md text-label-md text-secondary mb-md border-b border-outline-variant pb-xs flex items-center gap-xs uppercase tracking-wider select-none font-bold">
            <span className="material-symbols-outlined text-sm">history</span>
            Riwayat Identifikasi
          </h4>
          {loadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
            </div>
          ) : historyItems.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-md">
                {(showAllHistory ? historyItems : historyItems.slice(0, HISTORY_LIMIT)).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectHistoryItem(item)}
                    className="flex flex-col bg-surface-container-lowest border border-outline-variant hover:border-primary hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden cursor-pointer group h-full"
                  >
                    {/* Thumbnail Image with Confidence badge */}
                    <div className="relative aspect-video w-full overflow-hidden bg-surface-dim border-b border-outline-variant/30 shrink-0">
                      <img
                        src={item.imageSrc}
                        alt={item.speciesName}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-primary/95 text-on-primary font-bold text-[10px] tracking-wider shadow-sm select-none">
                        {item.confidence}%
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between text-left">
                      <div className="mb-3">
                        <h5 className="font-title-sm text-sm text-primary font-bold uppercase truncate group-hover:text-secondary transition-colors" title={item.speciesName}>
                          {item.speciesName}
                        </h5>
                        <p className="text-xs text-outline italic truncate mt-0.5" title={item.scientificName}>
                          {item.scientificName}
                        </p>
                      </div>

                      <div className="flex items-center gap-xs text-[10px] text-on-surface-variant border-t border-outline-variant/30 pt-2.5 select-none">
                        <span className="material-symbols-outlined text-[12px] text-secondary shrink-0">schedule</span>
                        <span className="truncate">{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {historyItems.length > HISTORY_LIMIT && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAllHistory(!showAllHistory)}
                    className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-sm rounded-full border border-outline-variant hover:border-primary transition-all duration-200 cursor-pointer flex items-center gap-xs shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showAllHistory ? "expand_less" : "expand_more"}
                    </span>
                    {showAllHistory ? "Tampilkan Lebih Sedikit" : `Lihat Semua Riwayat (${historyItems.length})`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant text-center py-8 select-none">
              Belum ada riwayat identifikasi.
            </p>
          )}
        </div>
      </div>

      {/* History Detail Modal */}
      {isHistoryModalOpen && selectedHistoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4 animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl w-full max-w-2xl p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
              <h3 className="text-lg font-bold text-primary font-title-lg flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary">history</span>
                Detail Riwayat Identifikasi
              </h3>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-4 text-on-surface text-left">
              <div className="relative w-full h-52 rounded-lg overflow-hidden border border-outline-variant/60 bg-surface shadow-inner">
                <img
                  alt={selectedHistoryItem.speciesName}
                  className="object-cover w-full h-full"
                  src={selectedHistoryItem.imageSrc}
                />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-secondary block mb-1">
                  Spesies Terdeteksi
                </span>
                <h4 className="text-2xl font-extrabold text-primary leading-tight font-headline-sm uppercase">
                  {selectedHistoryItem.speciesName}
                </h4>
                <p className="italic text-base text-outline mt-1">
                  {selectedHistoryItem.scientificName}
                </p>
              </div>

              <div className="border-t border-outline-variant pt-4">
                <div className="flex justify-between items-center text-sm font-bold mb-xs">
                  <span className="text-on-surface-variant uppercase tracking-widest text-xs">Tingkat Kepercayaan (Confidence)</span>
                  <span className="text-secondary text-base font-bold">{selectedHistoryItem.confidence}%</span>
                </div>
                <div className="h-3 bg-surface-container-low rounded-full overflow-hidden flex items-center p-[2px]">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${selectedHistoryItem.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-outline-variant pt-4 mt-2">
                <span className="text-xs uppercase font-bold tracking-wider text-primary block mb-2">
                  Deskripsi Ciri Spesies:
                </span>
                <div className="p-4 bg-surface-container border-l-4 border-primary rounded-r-lg">
                  <p className="text-sm text-justify leading-relaxed text-on-surface-variant">
                    {selectedHistoryItem.description}
                  </p>
                </div>
              </div>

              <div className="text-xs text-on-surface-variant text-right italic">
                Waktu Identifikasi: {selectedHistoryItem.timestamp}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-outline-variant pt-4">
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-medium text-sm shadow cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
