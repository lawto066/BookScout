import { useRef, useState } from "react";

import { BarcodeDetectorPolyfill } from "@undecaf/barcode-detector-polyfill";

function ScanBook({
  setBookToAdd,
  setShowAddBook,
  setShowManualAddBook,
  setBookNotFound,
  setNoCamera,
}) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("");
  const [scanning, setScanning] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Open the manual form when the camera is unavailable or a book cannot be found.
  function openManualAdd(reason) {
    stopScanner();

    setBookToAdd({
      title: "",
      author: "",
      publication_year: "",
      genre: "",
      synopsis: "",
      isbn: "",
      cover_image: "",
    });

    if (reason === "noCamera") {
      setBookNotFound(false);
      setNoCamera(true);
    } else if (reason === "bookNotFound") {
      setBookNotFound(true);
      setNoCamera(false);
    } else {
      setBookNotFound(false);
      setNoCamera(false);
    }

    setShowManualAddBook(true);
  }

  // Stop the camera and reset the scanner state.
  function stopScanner() {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());

      videoRef.current.srcObject = null;
    }

    setScanning(false);
    setCameraReady(false);
    setStatus("");
  }

  async function startScanner() {
    // Use the polyfill if the browser does not support BarcodeDetector.
    if (!("BarcodeDetector" in window)) {
      window.BarcodeDetector = BarcodeDetectorPolyfill;
    }

    setScanning(true);
    setStatus("Starting camera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      // Give the video element time to load before attaching the camera stream.
      await new Promise((resolve) => setTimeout(resolve, 100));

      videoRef.current.srcObject = stream;

      // Create a barcode detector for ISBN-13 barcodes.
      const detector = new BarcodeDetector({
        formats: ["ean_13"],
      });

      setStatus("Scanning...");

      // Create a canvas to read individual frames from the camera.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Keep checking camera frames until a barcode is found.
      const scan = async () => {
        if (!videoRef.current) return;

        if (videoRef.current.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height,
          );

          try {
            // Look for a barcode in the current camera frame.
            const barcodes = await detector.detect(canvas);

            if (barcodes.length > 0) {
              const isbn = barcodes[0].rawValue;

              // Use the ISBN to look up the book's information.
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=10&key=${import.meta.env.VITE_GOOGLE_BOOKS_KEY}`,
              );

              const data = await response.json();

              const bookData = data.items?.[0]?.volumeInfo;

              if (bookData) {
                // Convert the API response into the format used by BookScout.
                setBookToAdd({
                  title: bookData.title,
                  author: bookData.authors?.[0] || "Unknown",
                  publication_year: bookData.publishedDate
                    ? bookData.publishedDate.substring(0, 4)
                    : null,
                  genre: bookData.categories?.join(", ") || "",
                  synopsis:
                    bookData.description?.value ||
                    bookData.description ||
                    bookData.excerpts?.[0]?.text ||
                    "No synopsis available",
                  isbn: isbn,
                  cover_image: bookData.imageLinks?.thumbnail || "",
                });

                // Show the book information so the user can confirm it.
                setShowAddBook(true);
              } else {
                openManualAdd("bookNotFound");
              }

              setStatus("Book found!");

              // Stop the camera after a successful scan.
              stopScanner();

              return;
            }
          } catch (error) {
            console.error("Detection error:", error);
          }
        }

        // Check the next camera frame.
        requestAnimationFrame(scan);
      };

      requestAnimationFrame(scan);
    } catch {
      openManualAdd("noCamera");
    }
  }

  return (
    <>
      <button onClick={startScanner}>Add Book</button>

      {scanning && (
        <div id="scanner-overlay">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onCanPlay={() => setCameraReady(true)}
          />

          {cameraReady && (
            <>
              <div className="scan-box"></div>

              <p id="scan-status">{status}</p>

              <div className="scanner-buttons">
                <button onClick={stopScanner}>Cancel</button>

                <button
                  onClick={() => {
                    openManualAdd("manual");
                  }}
                >
                  Add Manually
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ScanBook;
