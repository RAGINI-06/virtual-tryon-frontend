import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  Loader2,
  Trash2,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteProfilePhoto,
  loadProfilePhoto,
} from "../../services/profileService";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    inseam: "",
    unit: "CM",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  /*
   * Load profile from backend
   */
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setProfile(data);

      setForm({
        name: data.name || "",
        email: data.email || "",
        height: data.height ?? "",
        weight: data.weight ?? "",
        bust: data.bust ?? "",
        waist: data.waist ?? "",
        hips: data.hips ?? "",
        shoulder: data.shoulder ?? "",
        inseam: data.inseam ?? "",
        unit: data.unit || "CM",
      });

      /*
       * Profile photo endpoint is protected by JWT.
       * Therefore we load it through Axios instead
       * of directly putting the API URL inside <img>.
       */
      if (data.profilePhotoUrl) {
        const imageUrl = await loadProfilePhoto();

        setPhotoUrl(imageUrl);
      } else {
        setPhotoUrl(null);
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Clean up generated blob URL when component unmounts
   */
  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  /*
   * Handle text/number/select changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  /*
   * Save profile + measurements
   */
  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const payload = {
        name: form.name,
        email: form.email,

        height:
          form.height === ""
            ? null
            : Number(form.height),

        weight:
          form.weight === ""
            ? null
            : Number(form.weight),

        bust:
          form.bust === ""
            ? null
            : Number(form.bust),

        waist:
          form.waist === ""
            ? null
            : Number(form.waist),

        hips:
          form.hips === ""
            ? null
            : Number(form.hips),

        shoulder:
          form.shoulder === ""
            ? null
            : Number(form.shoulder),

        inseam:
          form.inseam === ""
            ? null
            : Number(form.inseam),

        unit: form.unit,
      };

      const updatedProfile =
        await updateProfile(payload);

      setProfile(updatedProfile);

      setForm({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        height: updatedProfile.height ?? "",
        weight: updatedProfile.weight ?? "",
        bust: updatedProfile.bust ?? "",
        waist: updatedProfile.waist ?? "",
        hips: updatedProfile.hips ?? "",
        shoulder: updatedProfile.shoulder ?? "",
        inseam: updatedProfile.inseam ?? "",
        unit: updatedProfile.unit || "CM",
      });

      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Upload profile photo
   */
  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingPhoto(true);
      setMessage("");
      setError("");

      const updatedProfile =
        await uploadProfilePhoto(file);

      setProfile(updatedProfile);

      /*
       * Load the newly uploaded image through
       * the authenticated Axios request.
       */
      const imageUrl = await loadProfilePhoto();

      setPhotoUrl(imageUrl);

      setMessage("Profile photo updated.");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to upload profile photo."
      );
    } finally {
      setUploadingPhoto(false);

      /*
       * Allows selecting the same file again.
       */
      event.target.value = "";
    }
  };

  /*
   * Delete profile photo
   */
  const handleDeletePhoto = async () => {
    try {
      setDeletingPhoto(true);
      setMessage("");
      setError("");

      await deleteProfilePhoto();

      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }

      setPhotoUrl(null);

      setProfile((previous) => ({
        ...previous,
        profilePhotoUrl: null,
      }));

      setMessage("Profile photo removed.");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to remove profile photo."
      );
    } finally {
      setDeletingPhoto(false);
    }
  };

  /*
   * Calculate profile completion
   */
  const calculateCompletion = () => {
    if (!profile) {
      return 0;
    }

    const fields = [
      profile.name,
      profile.email,
      profile.height,
      profile.weight,
      profile.bust,
      profile.waist,
      profile.hips,
      profile.shoulder,
      profile.inseam,
    ];

    const completed = fields.filter(
      (field) =>
        field !== null &&
        field !== undefined &&
        field !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  };

  const completion = calculateCompletion();

  /*
   * Loading screen
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-600">
          <Loader2
            size={20}
            className="animate-spin"
          />

          <span className="text-sm">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#171717]">

      {/* HEADER */}

      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition"
          >
            <ArrowLeft size={17} />

            Back to dashboard
          </button>

          <div className="font-display text-2xl tracking-wide">
            AROSE
          </div>

          <div className="w-32 hidden sm:block" />

        </div>
      </header>

      {/* MAIN */}

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* TITLE */}

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
            Your account
          </p>

          <h1 className="font-display text-4xl sm:text-5xl">
            Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Keep your personal details and measurements
            up to date for a more personalized AROSE
            experience.
          </p>

        </div>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mb-6 flex items-center gap-3 border border-black/10 bg-white px-4 py-3 text-sm">
            <Check size={17} />

            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[280px_1fr] gap-10">

          {/* SIDEBAR */}

          <aside>

            {/* PROFILE PHOTO */}

            <div className="bg-white border border-black/10 p-6">

              <div className="relative mx-auto w-36 h-36">

                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#ebe9e4] flex items-center justify-center">
                    <UserRound
                      size={48}
                      strokeWidth={1.2}
                      className="text-neutral-500"
                    />
                  </div>
                )}

                {/* CAMERA BUTTON */}

                <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-neutral-800 transition">

                  {uploadingPhoto ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Camera size={17} />
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handlePhotoChange}
                    disabled={uploadingPhoto}
                  />

                </label>

              </div>

              {/* NAME */}

              <div className="text-center mt-5">

                <h2 className="font-display text-xl">
                  {profile?.name || "Your Profile"}
                </h2>

                <p className="text-xs text-neutral-500 mt-1 break-all">
                  {profile?.email}
                </p>

              </div>

              {/* DELETE PHOTO */}

              {photoUrl && (
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  disabled={deletingPhoto}
                  className="mt-5 w-full flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-red-600 transition disabled:opacity-50"
                >

                  {deletingPhoto ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={14} />
                  )}

                  Remove photo

                </button>
              )}

            </div>

            {/* PROFILE COMPLETION */}

            <div className="mt-4 border border-black/10 bg-white p-6">

              <div className="flex items-center justify-between mb-3">

                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Profile completion
                </span>

                <span className="font-medium text-sm">
                  {completion}%
                </span>

              </div>

              <div className="h-1.5 bg-neutral-200 overflow-hidden">

                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{
                    width: `${completion}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-xs leading-5 text-neutral-500">
                Complete your measurements to help AROSE
                personalize your experience.
              </p>

            </div>

          </aside>

          {/* FORM */}

          <form onSubmit={handleSave}>

            {/* PERSONAL INFORMATION */}

            <section className="bg-white border border-black/10 p-6 sm:p-8">

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                  01
                </p>

                <h2 className="font-display text-2xl">
                  Personal information
                </h2>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">

                <InputField
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />

                <InputField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

              </div>

            </section>

            {/* BODY INFORMATION */}

            <section className="bg-white border border-black/10 p-6 sm:p-8 mt-5">

              <div className="mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    02
                  </p>

                  <h2 className="font-display text-2xl">
                    Body information
                  </h2>

                  <p className="text-xs text-neutral-500 mt-2">
                    Used to personalize your virtual try-on.
                  </p>

                </div>

                {/* UNIT */}

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="border border-black/15 bg-[#f8f7f4] px-4 py-2.5 text-sm outline-none focus:border-black"
                >

                  <option value="CM">
                    Centimeters (CM)
                  </option>

                  <option value="INCH">
                    Inches (INCH)
                  </option>

                </select>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">

                <InputField
                  label="Height"
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="e.g. 165"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

                <InputField
                  label="Weight"
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 55"
                  suffix="kg"
                />

              </div>

            </section>

            {/* MEASUREMENTS */}

            <section className="bg-white border border-black/10 p-6 sm:p-8 mt-5">

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                  03
                </p>

                <h2 className="font-display text-2xl">
                  Measurements
                </h2>

                <p className="text-xs text-neutral-500 mt-2">
                  Enter your measurements in the selected
                  unit.
                </p>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">

                <InputField
                  label="Bust"
                  name="bust"
                  type="number"
                  value={form.bust}
                  onChange={handleChange}
                  placeholder="e.g. 84"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

                <InputField
                  label="Waist"
                  name="waist"
                  type="number"
                  value={form.waist}
                  onChange={handleChange}
                  placeholder="e.g. 66"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

                <InputField
                  label="Hips"
                  name="hips"
                  type="number"
                  value={form.hips}
                  onChange={handleChange}
                  placeholder="e.g. 90"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

                <InputField
                  label="Shoulder"
                  name="shoulder"
                  type="number"
                  value={form.shoulder}
                  onChange={handleChange}
                  placeholder="e.g. 38"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

                <InputField
                  label="Inseam"
                  name="inseam"
                  type="number"
                  value={form.inseam}
                  onChange={handleChange}
                  placeholder="e.g. 74"
                  suffix={
                    form.unit === "CM"
                      ? "cm"
                      : "in"
                  }
                />

              </div>

            </section>

            {/* SAVE BUTTON */}

            <div className="mt-6 flex justify-end">

              <button
                type="submit"
                disabled={saving}
                className="min-w-40 bg-black text-white px-7 py-3.5 text-sm hover:bg-neutral-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >

                {saving ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}

              </button>

            </div>

          </form>

        </div>
      </main>
    </div>
  );
}

/*
 * Reusable input component
 */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-[0.14em] text-neutral-500 mb-2"
      >
        {label}
      </label>

      <div className="relative">

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={
            type === "number"
              ? "0.1"
              : undefined
          }
          className={`w-full border border-black/15 bg-[#f8f7f4] px-4 py-3 text-sm outline-none transition focus:border-black ${
            suffix ? "pr-14" : ""
          }`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}

export default Profile;