import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  X,
  ImagePlus,
  Camera,
  MousePointer2,
  Sparkles,
  Check,
  Shirt,
  SwitchCamera,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import { uploadTryOnPhotos } from "../../services/tryOnService";
import { getConsentStatus } from "../../services/consentService";

function TryOn() {
  const navigate = useNavigate();

  const personInputRef = useRef(null);
  const garmentInputRef = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [checkingConsent, setCheckingConsent] = useState(true);

  const [personPhoto, setPersonPhoto] = useState(null);
  const [garmentPhoto, setGarmentPhoto] = useState(null);

  const [personPreview, setPersonPreview] = useState("");
  const [garmentPreview, setGarmentPreview] = useState("");

  const [spot, setSpot] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Camera state
   *
   * null       = camera closed
   * person     = camera for user's photo
   * garment    = camera for garment
   */
  const [cameraType, setCameraType] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraFacing, setCameraFacing] = useState("user");

  /*
   * =========================================================
   * CHECK CONSENT
   * =========================================================
   */

  useEffect(() => {
    const checkConsent = async () => {
      try {
        setCheckingConsent(true);

        const data = await getConsentStatus();

        /*
         * If backend says consent has not been given,
         * send the user to the consent page.
         */
        if (!data?.consentGiven) {
          navigate("/consent", {
            replace: true,
          });

          return;
        }

        setCheckingConsent(false);
      } catch (err) {
        console.error(
          "Consent check failed:",
          err
        );

        /*
         * If we cannot verify consent, don't allow
         * the user to continue with image processing.
         */
        navigate("/consent", {
          replace: true,
        });
      }
    };

    checkConsent();
  }, [navigate]);

  /*
   * =========================================================
   * CLEANUP
   * =========================================================
   */

  useEffect(() => {
    return () => {
      if (personPreview) {
        URL.revokeObjectURL(personPreview);
      }

      if (garmentPreview) {
        URL.revokeObjectURL(garmentPreview);
      }

      stopCamera();
    };
  }, [personPreview, garmentPreview]);

  /*
   * =========================================================
   * FILE UPLOAD
   * =========================================================
   */

  const handlePersonChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError("");

    if (personPreview) {
      URL.revokeObjectURL(personPreview);
    }

    const preview = URL.createObjectURL(file);

    setPersonPhoto(file);
    setPersonPreview(preview);
    setSpot(null);

    event.target.value = "";
  };

  const handleGarmentChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError("");

    if (garmentPreview) {
      URL.revokeObjectURL(garmentPreview);
    }

    const preview = URL.createObjectURL(file);

    setGarmentPhoto(file);
    setGarmentPreview(preview);

    event.target.value = "";
  };

  /*
   * =========================================================
   * REMOVE PHOTOS
   * =========================================================
   */

  const removePerson = () => {
    if (personPreview) {
      URL.revokeObjectURL(personPreview);
    }

    setPersonPhoto(null);
    setPersonPreview("");
    setSpot(null);
  };

  const removeGarment = () => {
    if (garmentPreview) {
      URL.revokeObjectURL(garmentPreview);
    }

    setGarmentPhoto(null);
    setGarmentPreview("");
  };

  /*
   * =========================================================
   * SPOT SELECTION
   * =========================================================
   */

  const handlePersonClick = (event) => {
    if (!personPreview) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setSpot({
      x,
      y,
    });
  };

  /*
   * =========================================================
   * CAMERA
   * =========================================================
   */

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setCameraReady(false);
  };

  const closeCamera = () => {
    stopCamera();

    setCameraType(null);
    setCameraError("");
  };

  const openCamera = (type) => {
    stopCamera();

    setCameraError("");
    setError("");
    setCameraReady(false);

    setCameraType(type);

    /*
     * Person → front camera
     * Garment → rear camera
     */
    setCameraFacing(
      type === "person"
        ? "user"
        : "environment"
    );
  };

  /*
   * Start camera.
   */
  useEffect(() => {
    if (!cameraType) return;

    let cancelled = false;

    const startCamera = async () => {
      try {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          setCameraError(
            "Camera access is not supported by this browser."
          );

          return;
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: {
                ideal: cameraFacing,
              },
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
            },
            audio: false,
          });

        if (cancelled) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });

          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play();

          setCameraReady(true);
        }
      } catch (err) {
        console.error(
          "Camera access failed:",
          err
        );

        if (!cancelled) {
          setCameraError(
            "Unable to access your camera. Please allow camera permission and try again."
          );
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }
    };
  }, [cameraType, cameraFacing]);

  /*
   * Switch front/rear camera.
   */
  const switchCamera = () => {
    setCameraReady(false);

    setCameraFacing((previous) =>
      previous === "user"
        ? "environment"
        : "user"
    );
  };

  /*
   * Capture camera frame.
   */
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (!video.videoWidth || !video.videoHeight) {
      setCameraError(
        "Camera is not ready yet. Please wait a moment."
      );

      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError(
        "Unable to capture the photo."
      );

      return;
    }

    /*
     * Mirror front-camera capture.
     */
    if (cameraFacing === "user") {
      context.translate(
        canvas.width,
        0
      );

      context.scale(-1, 1);
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError(
            "Unable to create the captured image."
          );

          return;
        }

        const timestamp = Date.now();

        const fileName =
          cameraType === "person"
            ? `person-camera-${timestamp}.jpg`
            : `garment-camera-${timestamp}.jpg`;

        const file = new File(
          [blob],
          fileName,
          {
            type: "image/jpeg",
          }
        );

        const preview =
          URL.createObjectURL(file);

        if (cameraType === "person") {
          if (personPreview) {
            URL.revokeObjectURL(personPreview);
          }

          setPersonPhoto(file);
          setPersonPreview(preview);
          setSpot(null);
        } else {
          if (garmentPreview) {
            URL.revokeObjectURL(garmentPreview);
          }

          setGarmentPhoto(file);
          setGarmentPreview(preview);
        }

        closeCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  /*
   * =========================================================
   * GENERATE / UPLOAD
   * =========================================================
   */

  const canUpload =
    personPhoto && garmentPhoto;

  const handleUpload = async () => {
    if (!personPhoto || !garmentPhoto) {
      setError(
        "Please add both your photo and a garment photo."
      );

      return;
    }

    setError("");
    setUploading(true);

    try {
      /*
       * At this stage we only upload the images.
       *
       * The actual AI generation backend is not connected
       * yet because the VTO model/provider has not been
       * selected.
       */
      const response =
        await uploadTryOnPhotos(
          personPhoto,
          garmentPhoto
        );

      console.log(
        "Try-on upload response:",
        response
      );

      /*
       * Keep the current frontend flow ready for
       * the eventual generation backend.
       */
      navigate(
        "/try-on/generating",
        {
          state: {
            uploadResponse: response,
            spot,
          },
        }
      );
    } catch (err) {
      console.error(
        "Try-on upload failed:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Unable to upload your images. Please try again.";

      setError(message);
    } finally {
      setUploading(false);
    }
  };

  /*
   * =========================================================
   * CONSENT CHECK LOADING SCREEN
   * =========================================================
   */

  if (checkingConsent) {
    return (
      <div className="min-h-screen bg-[#eee9df] flex items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-neutral-500">

          <Loader2
            size={19}
            className="animate-spin"
          />

          Checking privacy settings...

        </div>

      </div>
    );
  }

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-[#eee9df] p-4 text-[#171717] sm:p-6 lg:p-8">

      <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1450px] overflow-hidden rounded-[14px] border border-[#ded8cc] bg-[#f8f7f2] shadow-[0_15px_45px_rgba(80,65,45,0.12)]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="flex items-center justify-between border-b border-[#ded9cf] px-6 py-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-sm text-neutral-500 transition hover:text-black"
          >
            <ArrowLeft size={18} />

            Back to dashboard
          </Link>

          <Link
            to="/dashboard"
            className="text-xl font-medium tracking-[0.15em]"
          >
            AROSE
          </Link>

          <div className="w-[130px]" />

        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="mx-auto max-w-[1200px] px-6 py-10 sm:px-8 lg:px-12">

          {/* Heading */}

          <div className="mb-10">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Virtual try-on
            </p>

            <h1 className="mt-3 font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
              Create your virtual look.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">
              Upload a photo of yourself and a garment
              to see how the look could appear on you.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-6 flex items-start justify-between gap-4 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError("")}
                className="shrink-0"
              >
                <X size={17} />
              </button>

            </div>
          )}

          {/* =====================================================
              UPLOAD AREAS
          ===================================================== */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* =================================================
                PERSON
            ================================================= */}

            <section className="border border-[#cfc7b9] bg-[#f8f7f2] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                    Step 01
                  </p>

                  <h2 className="mt-2 font-display text-2xl">
                    Your photo
                  </h2>

                </div>

                {personPhoto && (
                  <button
                    type="button"
                    onClick={removePerson}
                    className="flex h-9 w-9 items-center justify-center border border-neutral-200 transition hover:bg-white"
                    title="Remove photo"
                  >
                    <X size={17} />
                  </button>
                )}

              </div>

              <div className="mt-6">

                {!personPreview ? (

                  <div className="flex h-[390px] w-full flex-col items-center justify-center border border-dashed border-[#c5bdb0] bg-[#eee8df]">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f7f2]">
                      <ImagePlus
                        size={24}
                        strokeWidth={1.4}
                      />
                    </div>

                    <p className="mt-5 text-sm font-medium">
                      Add your photo
                    </p>

                    <p className="mt-2 text-xs text-neutral-500">
                      JPG, PNG or WEBP
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          personInputRef.current?.click()
                        }
                        className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-neutral-800"
                      >
                        <Upload size={15} />

                        Upload photo
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openCamera("person")
                        }
                        className="flex items-center gap-2 rounded-full border border-[#bdb4a6] bg-[#f8f7f2] px-5 py-2.5 text-xs font-medium transition hover:bg-white"
                      >
                        <Camera size={15} />

                        Take photo
                      </button>

                    </div>

                  </div>

                ) : (

                  <div
                    onClick={handlePersonClick}
                    className="relative h-[390px] cursor-crosshair overflow-hidden bg-[#ddd5c9]"
                  >

                    <img
                      src={personPreview}
                      alt="Your uploaded photo"
                      className="h-full w-full object-contain"
                    />

                    {/* Spot */}

                    {spot && (
                      <div
                        className="absolute"
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          transform:
                            "translate(-50%, -50%)",
                        }}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black shadow-lg">
                          <Check
                            size={15}
                            color="white"
                          />
                        </div>
                      </div>
                    )}

                    {!spot && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-xs text-white">
                        <MousePointer2 size={14} />

                        Click where you want the garment
                      </div>
                    )}

                  </div>

                )}

              </div>

              <input
                ref={personInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePersonChange}
                className="hidden"
              />

              {personPreview && (
                <div className="mt-4 flex flex-wrap gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      personInputRef.current?.click()
                    }
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black"
                  >
                    <Upload size={14} />

                    Change photo
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openCamera("person")
                    }
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black"
                  >
                    <Camera size={14} />

                    Take again
                  </button>

                </div>
              )}

            </section>

            {/* =================================================
                GARMENT
            ================================================= */}

            <section className="border border-[#cfc7b9] bg-[#f8f7f2] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                    Step 02
                  </p>

                  <h2 className="mt-2 font-display text-2xl">
                    Choose a garment
                  </h2>

                </div>

                {garmentPhoto && (
                  <button
                    type="button"
                    onClick={removeGarment}
                    className="flex h-9 w-9 items-center justify-center border border-neutral-200 transition hover:bg-white"
                    title="Remove garment"
                  >
                    <X size={17} />
                  </button>
                )}

              </div>

              <div className="mt-6">

                {!garmentPreview ? (

                  <div className="flex h-[390px] w-full flex-col items-center justify-center border border-dashed border-[#c5bdb0] bg-[#eee8df]">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f7f2]">
                      <Shirt
                        size={25}
                        strokeWidth={1.4}
                      />
                    </div>

                    <p className="mt-5 text-sm font-medium">
                      Add your garment
                    </p>

                    <p className="mt-2 text-xs text-neutral-500">
                      Upload an image or take a photo
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          garmentInputRef.current?.click()
                        }
                        className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-neutral-800"
                      >
                        <Upload size={15} />

                        Upload garment
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openCamera("garment")
                        }
                        className="flex items-center gap-2 rounded-full border border-[#bdb4a6] bg-[#f8f7f2] px-5 py-2.5 text-xs font-medium transition hover:bg-white"
                      >
                        <Camera size={15} />

                        Take photo
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="relative flex h-[390px] items-center justify-center overflow-hidden bg-[#eee8df]">

                    <img
                      src={garmentPreview}
                      alt="Selected garment"
                      className="h-full w-full object-contain"
                    />

                  </div>

                )}

              </div>

              <input
                ref={garmentInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleGarmentChange}
                className="hidden"
              />

              {garmentPreview && (
                <div className="mt-4 flex flex-wrap gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      garmentInputRef.current?.click()
                    }
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black"
                  >
                    <Upload size={14} />

                    Change garment
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openCamera("garment")
                    }
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black"
                  >
                    <Camera size={14} />

                    Take again
                  </button>

                </div>
              )}

            </section>

          </div>

          {/* =====================================================
              SUMMARY
          ===================================================== */}

          <section className="mt-6 border border-[#cfc7b9] bg-[#eee8df] px-6 py-5">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div className="flex items-start gap-4">

                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f7f2]">
                  <Sparkles
                    size={18}
                    strokeWidth={1.4}
                  />
                </div>

                <div>

                  <p className="text-sm font-medium">
                    Ready to create your look?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">

                    {spot
                      ? "Your placement has been selected."
                      : "You can click on your photo to select a placement."}

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={handleUpload}
                disabled={!canUpload || uploading}
                className="flex items-center justify-center gap-3 rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
              >

                {uploading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Uploading...
                  </>
                ) : (
                  <>
                    Generate My Look

                    <ArrowUpRight size={17} />
                  </>
                )}

              </button>

            </div>

          </section>

        </main>

      </div>

      {/* =========================================================
          CAMERA MODAL
      ========================================================= */}

      {cameraType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-[760px] overflow-hidden bg-[#f8f7f2] shadow-2xl">

            {/* Camera header */}

            <div className="flex items-center justify-between border-b border-[#ded9cf] px-5 py-4 sm:px-6">

              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Camera
                </p>

                <h2 className="mt-1 font-display text-xl">
                  {cameraType === "person"
                    ? "Take your photo"
                    : "Take a garment photo"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeCamera}
                className="flex h-9 w-9 items-center justify-center border border-[#d8d1c6] transition hover:bg-white"
              >
                <X size={18} />
              </button>

            </div>

            {/* Camera preview */}

            <div className="relative bg-black">

              <div className="relative aspect-video w-full overflow-hidden">

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${
                    cameraFacing === "user"
                      ? "-scale-x-100"
                      : ""
                  }`}
                />

                {!cameraReady && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#171717] text-white">

                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    <p className="mt-4 text-sm text-white/70">
                      Starting camera...
                    </p>

                  </div>
                )}

                {cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#171717] px-6 text-center text-white">

                    <Camera
                      size={36}
                      strokeWidth={1.2}
                      className="text-white/60"
                    />

                    <p className="mt-4 max-w-md text-sm">
                      {cameraError}
                    </p>

                    <p className="mt-2 text-xs text-white/50">
                      Check your browser camera permission and try again.
                    </p>

                  </div>
                )}

                {cameraReady && (
                  <div className="pointer-events-none absolute inset-0">

                    <div className="absolute inset-[8%] border border-white/40" />

                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80" />

                  </div>
                )}

              </div>

            </div>

            {/* Camera controls */}

            <div className="border-t border-[#ded9cf] px-5 py-5 sm:px-6">

              <div className="flex items-center justify-between gap-4">

                <button
                  type="button"
                  onClick={switchCamera}
                  disabled={!cameraReady}
                  className="flex h-11 items-center gap-2 border border-[#cfc7b9] px-4 text-xs transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <SwitchCamera size={17} />

                  Switch
                </button>

                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={!cameraReady}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-[#ded8cc] bg-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Capture photo"
                >
                  <span className="h-10 w-10 rounded-full bg-black" />
                </button>

                <button
                  type="button"
                  onClick={closeCamera}
                  className="flex h-11 items-center gap-2 border border-[#cfc7b9] px-4 text-xs transition hover:bg-white"
                >
                  <X size={17} />

                  Cancel
                </button>

              </div>

              <p className="mt-4 text-center text-xs text-neutral-400">

                {cameraType === "person"
                  ? "Position yourself clearly inside the frame."
                  : "Place the garment flat and make sure it is clearly visible."}

              </p>

            </div>

          </div>

        </div>
      )}

      {/* Hidden canvas */}

      <canvas
        ref={canvasRef}
        className="hidden"
      />

    </div>
  );
}

export default TryOn;