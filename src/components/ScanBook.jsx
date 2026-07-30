import { useRef, useState } from "react";

function ScanBook({ setBookToAdd, setShowAddBook }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("");
  const [scanning, setScanning] = useState(false);

  async function startScanner() {
    // Step 1: Check if browser supports BarcodeDetector API
    if (!("BarcodeDetector" in window)) {
      setStatus("Barcode scanner not supported");
      return;
    }

    // Step 2: Open camera
    setScanning(true);
    setStatus("Starting camera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      // wait for video element ???
      await new Promise((resolve) => setTimeout(resolve, 100));

      videoRef.current.srcObject = stream;

      // Step 3: Create barcode reader for ean 13 type // More in future?
      const detector = new BarcodeDetector({
        formats: ["ean_13"],
      });

      setStatus("Scanning...");

      // Step 4: Create image reader for camera frames
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

    // Keep checking camera until barcode found
      const scan = async () => {
        if (!videoRef.current) return;

        if (videoRef.current.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
          // Take frame from camera
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          try {
            // Look for barcode in picture
            const barcodes = await detector.detect(canvas);

            // If barcode exists
            if (barcodes.length > 0) {
                // Step 5: get isbn found // The hobbit isbn
                const isbn = barcodes[0].rawValue;
                //   const isbn = "9780547928227";

                // Step 6: Use fetch to get API isbn response
                const response = await fetch( `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

                const data = await response.json();
                console.log("Open Library response:", data);

                const bookData = data[`ISBN:${isbn}`];

                if (bookData) {
                    // Step 7: Convert book info to BookScout format
                    setBookToAdd({
                        title: bookData.title,
                        author: bookData.authors?.[0]?.name || "Unknown",
                        publication_year: bookData.publish_date || null,
                        genre: "",
                        synopsis: "",
                        isbn: isbn,
                        cover_image: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
                    });

                    // Step 8: Show book information in confirmation popup 
                    // User confirms information and is sent to BookScout database via AddBookConfirmatio.jsx
                    setShowAddBook(true);
                } else {
                    console.log("No book found for ISBN:", isbn);
                }

                setStatus("Book found!");

                // Step 9: Stop camera after successful scan
                stream.getTracks().forEach((track) => track.stop());
                setScanning(false);

                return;
            }
          } catch (error) {
            console.error("Detection error:", error);
          }
        }

        // Step 10: Check next camera frame
        requestAnimationFrame(scan);
      };

      // Step 0: Start camera frame loop
      requestAnimationFrame(scan);

    } catch (error) {
      console.error(error);
      setStatus("Could not access camera");
      setScanning(false);
    }
  }

  return (
    <>
      <button onClick={startScanner}>Add Book</button>

      {scanning && (
        <div id="scanner-overlay">
          <video ref={videoRef} autoPlay playsInline />
          <p>{status}</p>
        </div>
      )}
    </>
  );
}

export default ScanBook;