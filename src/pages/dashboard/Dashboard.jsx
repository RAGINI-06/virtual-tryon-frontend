// import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";

// import {
//   Home,
//   Shirt,
//   History as HistoryIcon,
//   UserRound,
//   Settings,
//   LogOut,
//   Upload,
//   Sparkles,
//   ArrowUpRight,
//   Loader2,
//   ChevronRight,
// } from "lucide-react";

// import { getCurrentUser } from "../../services/userService";
// import { getTryOnHistory } from "../../services/tryOnService";
// import { getProfile } from "../../services/profileService";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [profileCompletion, setProfileCompletion] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         const [userData, historyData, profileData] =
//           await Promise.all([
//             getCurrentUser(),
//             getTryOnHistory(),
//             getProfile(),
//           ]);

//         setUser(userData);
//         setHistory(historyData || []);
//         setProfile(profileData);

//         /*
//          * Profile completion
//          *
//          * We currently count these 9 fields:
//          * name
//          * email
//          * height
//          * weight
//          * bust
//          * waist
//          * hips
//          * shoulder
//          * inseam
//          */

//         const fields = [
//           profileData?.name,
//           profileData?.email,
//           profileData?.height,
//           profileData?.weight,
//           profileData?.bust,
//           profileData?.waist,
//           profileData?.hips,
//           profileData?.shoulder,
//           profileData?.inseam,
//         ];

//         const completed = fields.filter(
//           (field) =>
//             field !== null &&
//             field !== undefined &&
//             field !== ""
//         ).length;

//         const percentage = Math.round(
//           (completed / fields.length) * 100
//         );

//         setProfileCompletion(percentage);
//       } catch (error) {
//         console.error(
//           "Dashboard loading failed:",
//           error
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   const formatDate = (date) => {
//     if (!date) return "--";

//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const completedCount = history.filter(
//     (item) => item.status === "COMPLETED"
//   ).length;

//   const firstName = user?.name
//     ? user.name.split(" ")[0]
//     : "there";

//   const logout = () => {
//     localStorage.removeItem("arose_token");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen bg-[#eee9df] p-3 text-[#171717] sm:p-5 lg:p-8">
//       <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1480px] overflow-hidden rounded-[18px] border border-[#ded8cc] bg-[#f8f7f2] shadow-[0_18px_60px_rgba(80,65,45,0.10)]">

//         {/* =========================================================
//             SIDEBAR
//         ========================================================= */}

//         <aside className="hidden w-[250px] shrink-0 flex-col border-r border-[#ded9cf] lg:flex">

//           {/* Logo */}

//           <div className="px-8 pb-9 pt-8">
//             <Link
//               to="/dashboard"
//               className="font-display text-[29px] tracking-[-0.04em]"
//             >
//               AROSE
//             </Link>

//             <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
//               Virtual wardrobe
//             </p>
//           </div>

//           {/* Navigation */}

//           <nav className="px-4">

//             <p className="mb-3 px-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
//               Workspace
//             </p>

//             <Link
//               to="/dashboard"
//               className="flex h-11 items-center gap-4 rounded-[8px] border border-[#ddd5ca] bg-[#e9e3da] px-4 text-[15px] text-[#292724] transition hover:bg-[#e2dbd1]"
//             >
//               <Home
//                 size={19}
//                 strokeWidth={1.5}
//               />
//               Home
//             </Link>

//             <Link
//               to="/try-on"
//               className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
//             >
//               <Shirt
//                 size={19}
//                 strokeWidth={1.5}
//               />
//               Try-On
//             </Link>

//             <Link
//               to="/history"
//               className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
//             >
//               <HistoryIcon
//                 size={19}
//                 strokeWidth={1.5}
//               />
//               History
//             </Link>

//             <p className="mb-3 mt-9 px-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
//               Account
//             </p>

//             <Link
//               to="/profile"
//               className="flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
//             >
//               <UserRound
//                 size={19}
//                 strokeWidth={1.5}
//               />
//               Profile
//             </Link>

//             <Link
//               to="/settings"
//               className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
//             >
//               <Settings
//                 size={19}
//                 strokeWidth={1.5}
//               />
//               Settings
//             </Link>
//           </nav>

//           {/* Bottom account section */}

//           <div className="mt-auto border-t border-[#ded9cf] px-4 py-5">

//             <div className="mb-4 flex items-center gap-3 px-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5ddd2] text-sm text-[#3d3935]">
//                 {user?.name?.charAt(0)?.toUpperCase() || "R"}
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-medium">
//                   {user?.name || "Your account"}
//                 </p>

//                 <p className="truncate text-[11px] text-neutral-400">
//                   {user?.email || "AROSE member"}
//                 </p>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={logout}
//               className="flex h-10 w-full items-center gap-4 rounded-[8px] px-4 text-left text-[14px] text-neutral-600 transition hover:bg-[#ebe7df] hover:text-[#3d3935]"
//             >
//               <LogOut
//                 size={18}
//                 strokeWidth={1.5}
//               />
//               Logout
//             </button>
//           </div>
//         </aside>

//         {/* =========================================================
//             MAIN CONTENT
//         ========================================================= */}

//         <main className="min-w-0 flex-1 pb-32 lg:pb-0">

//           {/* =====================================================
//               HEADER
//           ===================================================== */}

//           <header className="flex items-center justify-between px-6 pb-5 pt-7 sm:px-8 lg:px-10">

//             <div>
//               {loading ? (
//                 <>
//                   <div className="h-9 w-72 animate-pulse rounded bg-[#e5e0d7]" />

//                   <div className="mt-3 h-4 w-52 animate-pulse rounded bg-[#e5e0d7]" />
//                 </>
//               ) : (
//                 <>
//                   <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
//                     Your workspace
//                   </p>

//                   <h1 className="font-display text-[34px] leading-tight tracking-[-0.035em] sm:text-[39px]">
//                     Good morning, {firstName}
//                   </h1>

//                   <p className="mt-2 text-[16px] text-[#5b5751]">
//                     Ready to discover your next look?
//                   </p>
//                 </>
//               )}
//             </div>

//             <Link
//   to="/profile"
//   className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d8d0c5] bg-[#e5ddd2] transition hover:scale-105"
// >
//   {profile?.profilePhotoUrl ? (
//     <img
//       src={profile.profilePhotoUrl}
//       alt="Profile"
//       className="h-full w-full object-cover"
//     />
//   ) : (
//     <span className="text-[15px] text-[#3d3935]">
//       {user?.name?.charAt(0)?.toUpperCase() || "R"}
//     </span>
//   )}
// </Link>
//           </header>

//           <div className="px-6 pb-10 sm:px-8 lg:px-10">

//             {/* =====================================================
//                 HERO / CREATE LOOK
//             ===================================================== */}

//             <section className="relative min-h-[315px] overflow-hidden border border-[#d0c8ba] bg-[#e9dfd1]">

//               {/* Text */}

//               <div className="relative z-10 flex min-h-[315px] max-w-[58%] flex-col justify-center px-7 sm:px-10 lg:px-12">

//                 <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
//                   Virtual try-on
//                 </p>

//                 <h2 className="font-display text-[39px] leading-[1.04] tracking-[-0.04em] sm:text-[47px]">
//                   Create a look
//                   <br />
//                   made for you.
//                 </h2>

//                 <p className="mt-5 max-w-[420px] text-[16px] leading-[1.5] text-[#45413c]">
//                   Upload a photo of yourself and a garment.
//                   AROSE will generate a virtual version of the look
//                   for you.
//                 </p>

//                 <Link
//                   to="/try-on"
//                   className="group mt-7 flex w-fit items-center gap-3 bg-[#3d3935] px-7 py-3.5 text-[14px] text-[#faf9f6] transition hover:bg-[#514c46]"
//                 >
//                   Start a try-on

//                   <ArrowUpRight
//                     size={17}
//                     strokeWidth={1.5}
//                     className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//                   />
//                 </Link>
//               </div>

//               {/* Image */}

//               <div className="absolute bottom-0 right-0 top-0 w-[43%] bg-[#ddd1c1]">

//                 <img
//                   src="/images/dashboard-model.jpg"
//                   alt="AROSE virtual try-on"
//                   className="h-full w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-r from-[#e9dfd1] via-transparent to-transparent" />
//               </div>
//             </section>

//             {/* =====================================================
//                 QUICK STATS
//             ===================================================== */}

//             <section className="grid border-b border-[#d8d1c6] sm:grid-cols-3">

//               {/* Total try-ons */}

//               <div className="flex items-center justify-between border-b border-[#d8d1c6] py-5 sm:border-b-0 sm:border-r sm:pr-7">

//                 <div>
//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     Total try-ons
//                   </p>

//                   <p className="mt-1 font-display text-[29px]">
//                     {loading ? "—" : history.length}
//                   </p>
//                 </div>

//                 <Shirt
//                   size={21}
//                   strokeWidth={1.3}
//                   className="text-neutral-400"
//                 />
//               </div>

//               {/* Completed */}

//               <div className="flex items-center justify-between border-b border-[#d8d1c6] py-5 sm:border-b-0 sm:border-r sm:px-7">

//                 <div>
//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     Completed
//                   </p>

//                   <p className="mt-1 font-display text-[29px]">
//                     {loading ? "—" : completedCount}
//                   </p>
//                 </div>

//                 <Sparkles
//                   size={21}
//                   strokeWidth={1.3}
//                   className="text-neutral-400"
//                 />
//               </div>

//               {/* Profile */}

//               <div className="flex items-center justify-between py-5 sm:pl-7">

//                 <div>
//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     Profile
//                   </p>

//                   <p className="mt-1 font-display text-[29px]">
//                     {loading
//                       ? "—"
//                       : `${profileCompletion}%`}
//                   </p>
//                 </div>

//                 <Link
//                   to="/profile"
//                   className="text-neutral-400 transition hover:text-[#3d3935]"
//                 >
//                   <ChevronRight
//                     size={21}
//                     strokeWidth={1.3}
//                   />
//                 </Link>
//               </div>
//             </section>

//             {/* =====================================================
//                 PROFILE COMPLETION
//             ===================================================== */}

//             {!loading && profileCompletion < 100 && (
//               <section className="mt-7 border border-[#d8d1c6] bg-[#eee7dc] px-5 py-4 sm:px-6">

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//                   <div>
//                     <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                       Complete your profile
//                     </p>

//                     <p className="mt-1 text-[14px] text-[#45413c]">
//                       Add your measurements to improve your virtual try-on experience.
//                     </p>
//                   </div>

//                   <Link
//                     to="/profile"
//                     className="flex w-fit shrink-0 items-center gap-2 border border-[#cfc6ba] bg-[#faf8f4] px-5 py-2.5 text-[13px] text-[#3d3935] transition hover:border-[#3d3935] hover:bg-[#3d3935] hover:text-[#faf9f6]"
//                   >
//                     Complete profile

//                     <ArrowUpRight
//                       size={15}
//                       strokeWidth={1.5}
//                     />
//                   </Link>
//                 </div>

//                 {/* Progress bar */}

//                 <div className="mt-4 h-1.5 w-full bg-[#d8d1c6]">

//                   <div
//                     className="h-full bg-[#5a554f] transition-all duration-500"
//                     style={{
//                       width: `${profileCompletion}%`,
//                     }}
//                   />
//                 </div>
//               </section>
//             )}

//             {/* =====================================================
//                 RECENT TRY-ONS
//             ===================================================== */}

//             <section className="mt-9">

//               <div className="mb-5 flex items-end justify-between">

//                 <div>
//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     Your wardrobe
//                   </p>

//                   <h2 className="mt-1 font-display text-[28px] tracking-[-0.025em]">
//                     Recent try-ons
//                   </h2>
//                 </div>

//                 {history.length > 0 && (
//                   <Link
//                     to="/history"
//                     className="hidden items-center gap-2 text-[13px] underline underline-offset-4 sm:flex"
//                   >
//                     View all

//                     <ArrowUpRight size={14} />
//                   </Link>
//                 )}
//               </div>

//               {loading ? (
//                 <div className="flex h-[190px] items-center justify-center border-y border-[#d8d1c6]">

//                   <Loader2
//                     size={24}
//                     className="animate-spin text-neutral-400"
//                   />
//                 </div>

//               ) : history.length === 0 ? (

//                 <div className="border-y border-[#d8d1c6] py-14 text-center">

//                   <Sparkles
//                     size={27}
//                     strokeWidth={1.3}
//                     className="mx-auto text-neutral-400"
//                   />

//                   <p className="mt-4 font-display text-[22px]">
//                     Your wardrobe is waiting.
//                   </p>

//                   <p className="mt-2 text-sm text-neutral-500">
//                     Create your first virtual look to see it here.
//                   </p>

//                   <Link
//                     to="/try-on"
//                     className="mt-5 inline-flex items-center gap-2 bg-[#3d3935] px-6 py-3 text-sm text-[#faf9f6] transition hover:bg-[#514c46]"
//                   >
//                     Create a look

//                     <ArrowUpRight size={15} />
//                   </Link>
//                 </div>

//               ) : (

//                 <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">

//                   {history.slice(0, 3).map((tryOn) => (

//                     <Link
//                       key={tryOn.requestId}
//                       to={`/try-on/result/${tryOn.requestId}`}
//                       className="group block"
//                     >

//                       <div className="relative aspect-[4/3] overflow-hidden bg-[#ded5c8]">

//                         {tryOn.resultUrl ? (

//                           <img
//                             src={tryOn.resultUrl}
//                             alt="Virtual try-on result"
//                             className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
//                           />

//                         ) : (

//                           <div className="flex h-full items-center justify-center">

//                             {tryOn.status === "PROCESSING" ? (

//                               <Loader2
//                                 size={25}
//                                 className="animate-spin text-neutral-500"
//                               />

//                             ) : (

//                               <Sparkles
//                                 size={28}
//                                 strokeWidth={1.2}
//                               />
//                             )}
//                           </div>
//                         )}

//                         <div className="absolute left-3 top-3">

//                           <span className="flex items-center gap-1.5 bg-[#f8f7f2]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] backdrop-blur-sm">
//                             {tryOn.status}
//                           </span>
//                         </div>

//                         <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white/90 opacity-0 transition group-hover:opacity-100">

//                           <ArrowUpRight
//                             size={17}
//                             strokeWidth={1.4}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between border-b border-[#d8d1c6] py-3">

//                         <div>

//                           <p className="text-[13px] font-medium">
//                             Virtual look
//                           </p>

//                           <p className="mt-0.5 text-[11px] text-neutral-400">
//                             {formatDate(tryOn.createdAt)}
//                           </p>
//                         </div>

//                         <ChevronRight
//                           size={16}
//                           strokeWidth={1.3}
//                           className="text-neutral-400"
//                         />
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* =====================================================
//                 HOW AROSE WORKS
//             ===================================================== */}

//             <section className="mt-12 border-t border-[#d8d1c6] pt-8">

//               <div className="grid gap-8 lg:grid-cols-[230px_1fr]">

//                 <div>

//                   <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
//                     Simple by design
//                   </p>

//                   <h2 className="mt-2 font-display text-[27px]">
//                     How AROSE works
//                   </h2>
//                 </div>

//                 <div className="grid gap-6 sm:grid-cols-3">

//                   {/* Upload */}

//                   <div className="flex gap-4">

//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

//                       <Upload
//                         size={19}
//                         strokeWidth={1.3}
//                       />
//                     </div>

//                     <div>

//                       <p className="text-sm font-medium">
//                         Upload
//                       </p>

//                       <p className="mt-1 text-xs leading-relaxed text-neutral-500">
//                         Add a photo of yourself.
//                       </p>
//                     </div>
//                   </div>

//                   {/* Choose */}

//                   <div className="flex gap-4">

//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

//                       <Shirt
//                         size={19}
//                         strokeWidth={1.3}
//                       />
//                     </div>

//                     <div>

//                       <p className="text-sm font-medium">
//                         Choose
//                       </p>

//                       <p className="mt-1 text-xs leading-relaxed text-neutral-500">
//                         Select the garment you want to try.
//                       </p>
//                     </div>
//                   </div>

//                   {/* See */}

//                   <div className="flex gap-4">

//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

//                       <Sparkles
//                         size={19}
//                         strokeWidth={1.3}
//                       />
//                     </div>

//                     <div>

//                       <p className="text-sm font-medium">
//                         See
//                       </p>

//                       <p className="mt-1 text-xs leading-relaxed text-neutral-500">
//                         Get your virtual look.
//                       </p>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </section>

//           </div>
//         </main>
//       </div>

//       {/* =========================================================
//           MOBILE NAVIGATION
//       ========================================================= */}

//       <nav className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-around border border-[#d8d1c6] bg-[#f8f7f2]/95 px-3 py-2.5 shadow-lg backdrop-blur lg:hidden">

//         <Link
//           to="/dashboard"
//           className="flex flex-col items-center gap-1 rounded-[8px] bg-[#e9e3da] px-4 py-2 text-[10px] text-[#292724]"
//         >
//           <Home size={18} />
//           Home
//         </Link>

//         <Link
//           to="/try-on"
//           className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
//         >
//           <Shirt size={18} />
//           Try-On
//         </Link>

//         <Link
//           to="/history"
//           className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
//         >
//           <HistoryIcon size={18} />
//           History
//         </Link>

//         <Link
//           to="/profile"
//           className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
//         >
//           <UserRound size={18} />
//           Profile
//         </Link>

//       </nav>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Home,
  Shirt,
  History as HistoryIcon,
  UserRound,
  Settings,
  LogOut,
  Upload,
  Sparkles,
  ArrowUpRight,
  Loader2,
  ChevronRight,
} from "lucide-react";

import { getCurrentUser } from "../../services/userService";
import { getTryOnHistory } from "../../services/tryOnService";
import {
  getProfile,
  getProfilePhoto,
} from "../../services/profileService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let photoUrl = null;

    const loadDashboard = async () => {
      try {
        const [userData, historyData, profileData] =
          await Promise.all([
            getCurrentUser(),
            getTryOnHistory(),
            getProfile(),
          ]);

        setUser(userData);
        setHistory(historyData || []);
        setProfile(profileData);

        /*
         * Load the actual profile image.
         *
         * profilePhotoUrl is only the stored photo reference.
         * The actual image is served through:
         * GET /api/profile/photo
         */
        if (profileData?.profilePhotoUrl) {
          try {
            photoUrl = await getProfilePhoto();
            setProfilePhoto(photoUrl);
          } catch (error) {
            console.error(
              "Profile photo loading failed:",
              error
            );
          }
        }

        /*
         * Profile completion
         */
        const fields = [
          profileData?.name,
          profileData?.email,
          profileData?.height,
          profileData?.weight,
          profileData?.bust,
          profileData?.waist,
          profileData?.hips,
          profileData?.shoulder,
          profileData?.inseam,
        ];

        const completed = fields.filter(
          (field) =>
            field !== null &&
            field !== undefined &&
            field !== ""
        ).length;

        const percentage = Math.round(
          (completed / fields.length) * 100
        );

        setProfileCompletion(percentage);
      } catch (error) {
        console.error(
          "Dashboard loading failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    /*
     * Clean up temporary browser image URL.
     */
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const completedCount = history.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : "there";

  const logout = () => {
    localStorage.removeItem("arose_token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#eee9df] p-3 text-[#171717] sm:p-5 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1480px] overflow-hidden rounded-[18px] border border-[#ded8cc] bg-[#f8f7f2] shadow-[0_18px_60px_rgba(80,65,45,0.10)]">

        {/* =========================================================
            DESKTOP SIDEBAR
        ========================================================= */}

        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-[#ded9cf] lg:flex">

          {/* Logo */}

          <div className="px-8 pb-9 pt-8">
            <Link
              to="/dashboard"
              className="font-display text-[29px] tracking-[-0.04em]"
            >
              AROSE
            </Link>

            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              Virtual wardrobe
            </p>
          </div>

          {/* Navigation */}

          <nav className="px-4">

            <p className="mb-3 px-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              Workspace
            </p>

            <Link
              to="/dashboard"
              className="flex h-11 items-center gap-4 rounded-[8px] border border-[#ddd5ca] bg-[#e9e3da] px-4 text-[15px] text-[#292724] transition hover:bg-[#e2dbd1]"
            >
              <Home
                size={19}
                strokeWidth={1.5}
              />
              Home
            </Link>

            <Link
              to="/try-on"
              className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
            >
              <Shirt
                size={19}
                strokeWidth={1.5}
              />
              Try-On
            </Link>

            <Link
              to="/history"
              className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
            >
              <HistoryIcon
                size={19}
                strokeWidth={1.5}
              />
              History
            </Link>

            <p className="mb-3 mt-9 px-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              Account
            </p>

            <Link
              to="/profile"
              className="flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
            >
              <UserRound
                size={19}
                strokeWidth={1.5}
              />
              Profile
            </Link>

            <Link
              to="/settings"
              className="mt-1 flex h-11 items-center gap-4 rounded-[8px] px-4 text-[15px] transition hover:bg-[#ebe7df]"
            >
              <Settings
                size={19}
                strokeWidth={1.5}
              />
              Settings
            </Link>

          </nav>

          {/* Bottom account section */}

          <div className="mt-auto border-t border-[#ded9cf] px-4 py-5">

            <div className="mb-4 flex items-center gap-3 px-2">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5ddd2] text-sm text-[#3d3935]">

                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "R"
                )}

              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-medium">
                  {user?.name || "Your account"}
                </p>

                <p className="truncate text-[11px] text-neutral-400">
                  {user?.email || "AROSE member"}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-full items-center gap-4 rounded-[8px] px-4 text-left text-[14px] text-neutral-600 transition hover:bg-[#ebe7df] hover:text-[#3d3935]"
            >
              <LogOut
                size={18}
                strokeWidth={1.5}
              />
              Logout
            </button>

          </div>
        </aside>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <main className="min-w-0 flex-1 pb-32 lg:pb-0">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <header className="flex items-center justify-between px-6 pb-5 pt-7 sm:px-8 lg:px-10">

            <div>

              {loading ? (
                <>
                  <div className="h-9 w-72 animate-pulse rounded bg-[#e5e0d7]" />

                  <div className="mt-3 h-4 w-52 animate-pulse rounded bg-[#e5e0d7]" />
                </>
              ) : (
                <>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                    Your workspace
                  </p>

                  <h1 className="font-display text-[34px] leading-tight tracking-[-0.035em] sm:text-[39px]">
                    Good morning, {firstName}
                  </h1>

                  <p className="mt-2 text-[16px] text-[#5b5751]">
                    Ready to discover your next look?
                  </p>
                </>
              )}

            </div>

            {/* =================================================
                TOP RIGHT PROFILE PHOTO
            ================================================= */}

            <Link
              to="/profile"
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d8d0c5] bg-[#e5ddd2] text-[15px] text-[#3d3935] transition hover:scale-105 hover:bg-[#ddd4c8]"
            >

              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "R"}
                </span>
              )}

            </Link>

          </header>

          <div className="px-6 pb-10 sm:px-8 lg:px-10">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="relative min-h-[315px] overflow-hidden border border-[#d0c8ba] bg-[#e9dfd1]">

              <div className="relative z-10 flex min-h-[315px] max-w-[58%] flex-col justify-center px-7 sm:px-10 lg:px-12">

                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  Virtual try-on
                </p>

                <h2 className="font-display text-[39px] leading-[1.04] tracking-[-0.04em] sm:text-[47px]">
                  Create a look
                  <br />
                  made for you.
                </h2>

                <p className="mt-5 max-w-[420px] text-[16px] leading-[1.5] text-[#45413c]">
                  Upload a photo of yourself and a garment.
                  AROSE will generate a virtual version of the look
                  for you.
                </p>

                <Link
                  to="/try-on"
                  className="group mt-7 flex w-fit items-center gap-3 bg-[#3d3935] px-7 py-3.5 text-[14px] text-[#faf9f6] transition hover:bg-[#514c46]"
                >
                  Start a try-on

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

              </div>

              <div className="absolute bottom-0 right-0 top-0 w-[43%] bg-[#ddd1c1]">

                <img
                  src="/images/dash-modell.jpeg"
                  alt="AROSE virtual try-on"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#e9dfd1] via-transparent to-transparent" />

              </div>

            </section>

            {/* =====================================================
                QUICK STATS
            ===================================================== */}

            <section className="grid border-b border-[#d8d1c6] sm:grid-cols-3">

              {/* Total */}

              <div className="flex items-center justify-between border-b border-[#d8d1c6] py-5 sm:border-b-0 sm:border-r sm:pr-7">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Total try-ons
                  </p>

                  <p className="mt-1 font-display text-[29px]">
                    {loading ? "—" : history.length}
                  </p>

                </div>

                <Shirt
                  size={21}
                  strokeWidth={1.3}
                  className="text-neutral-400"
                />

              </div>

              {/* Completed */}

              <div className="flex items-center justify-between border-b border-[#d8d1c6] py-5 sm:border-b-0 sm:border-r sm:px-7">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Completed
                  </p>

                  <p className="mt-1 font-display text-[29px]">
                    {loading ? "—" : completedCount}
                  </p>

                </div>

                <Sparkles
                  size={21}
                  strokeWidth={1.3}
                  className="text-neutral-400"
                />

              </div>

              {/* Profile */}

              <div className="flex items-center justify-between py-5 sm:pl-7">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Profile
                  </p>

                  <p className="mt-1 font-display text-[29px]">
                    {loading
                      ? "—"
                      : `${profileCompletion}%`}
                  </p>

                </div>

                <Link
                  to="/profile"
                  className="text-neutral-400 transition hover:text-[#3d3935]"
                >
                  <ChevronRight
                    size={21}
                    strokeWidth={1.3}
                  />
                </Link>

              </div>

            </section>

            {/* =====================================================
                PROFILE COMPLETION
            ===================================================== */}

            {!loading && profileCompletion < 100 && (

              <section className="mt-7 border border-[#d8d1c6] bg-[#eee7dc] px-5 py-4 sm:px-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      Complete your profile
                    </p>

                    <p className="mt-1 text-[14px] text-[#45413c]">
                      Add your measurements to improve your virtual try-on experience.
                    </p>

                  </div>

                  <Link
                    to="/profile"
                    className="flex w-fit shrink-0 items-center gap-2 border border-[#cfc6ba] bg-[#faf8f4] px-5 py-2.5 text-[13px] text-[#3d3935] transition hover:border-[#3d3935] hover:bg-[#3d3935] hover:text-[#faf9f6]"
                  >
                    Complete profile

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                    />
                  </Link>

                </div>

                <div className="mt-4 h-1.5 w-full bg-[#d8d1c6]">

                  <div
                    className="h-full bg-[#5a554f] transition-all duration-500"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  />

                </div>

              </section>

            )}

            {/* =====================================================
                RECENT TRY-ONS
            ===================================================== */}

            <section className="mt-9">

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Your wardrobe
                  </p>

                  <h2 className="mt-1 font-display text-[28px] tracking-[-0.025em]">
                    Recent try-ons
                  </h2>

                </div>

                {history.length > 0 && (

                  <Link
                    to="/history"
                    className="hidden items-center gap-2 text-[13px] underline underline-offset-4 sm:flex"
                  >
                    View all
                    <ArrowUpRight size={14} />
                  </Link>

                )}

              </div>

              {loading ? (

                <div className="flex h-[190px] items-center justify-center border-y border-[#d8d1c6]">

                  <Loader2
                    size={24}
                    className="animate-spin text-neutral-400"
                  />

                </div>

              ) : history.length === 0 ? (

                <div className="border-y border-[#d8d1c6] py-14 text-center">

                  <Sparkles
                    size={27}
                    strokeWidth={1.3}
                    className="mx-auto text-neutral-400"
                  />

                  <p className="mt-4 font-display text-[22px]">
                    Your wardrobe is waiting.
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    Create your first virtual look to see it here.
                  </p>

                  <Link
                    to="/try-on"
                    className="mt-5 inline-flex items-center gap-2 bg-[#3d3935] px-6 py-3 text-sm text-[#faf9f6] transition hover:bg-[#514c46]"
                  >
                    Create a look
                    <ArrowUpRight size={15} />
                  </Link>

                </div>

              ) : (

                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">

                  {history
                    .slice(0, 3)
                    .map((tryOn) => (

                      <Link
                        key={tryOn.requestId}
                        to={`/try-on/result/${tryOn.requestId}`}
                        className="group block"
                      >

                        <div className="relative aspect-[4/3] overflow-hidden bg-[#ded5c8]">

                          {tryOn.resultUrl ? (

                            <img
                              src={tryOn.resultUrl}
                              alt="Virtual try-on result"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center">

                              {tryOn.status === "PROCESSING" ? (

                                <Loader2
                                  size={25}
                                  className="animate-spin text-neutral-500"
                                />

                              ) : (

                                <Sparkles
                                  size={28}
                                  strokeWidth={1.2}
                                />

                              )}

                            </div>

                          )}

                          <div className="absolute left-3 top-3">

                            <span className="flex items-center gap-1.5 bg-[#f8f7f2]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] backdrop-blur-sm">
                              {tryOn.status}
                            </span>

                          </div>

                          <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white/90 opacity-0 transition group-hover:opacity-100">

                            <ArrowUpRight
                              size={17}
                              strokeWidth={1.4}
                            />

                          </div>

                        </div>

                        <div className="flex items-center justify-between border-b border-[#d8d1c6] py-3">

                          <div>

                            <p className="text-[13px] font-medium">
                              Virtual look
                            </p>

                            <p className="mt-0.5 text-[11px] text-neutral-400">
                              {formatDate(tryOn.createdAt)}
                            </p>

                          </div>

                          <ChevronRight
                            size={16}
                            strokeWidth={1.3}
                            className="text-neutral-400"
                          />

                        </div>

                      </Link>

                    ))}

                </div>

              )}

            </section>

            {/* =====================================================
                HOW AROSE WORKS
            ===================================================== */}

            <section className="mt-12 border-t border-[#d8d1c6] pt-8">

              <div className="grid gap-8 lg:grid-cols-[230px_1fr]">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Simple by design
                  </p>

                  <h2 className="mt-2 font-display text-[27px]">
                    How AROSE works
                  </h2>

                </div>

                <div className="grid gap-6 sm:grid-cols-3">

                  {/* Upload */}

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

                      <Upload
                        size={19}
                        strokeWidth={1.3}
                      />

                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        Upload
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        Add a photo of yourself.
                      </p>

                    </div>

                  </div>

                  {/* Choose */}

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

                      <Shirt
                        size={19}
                        strokeWidth={1.3}
                      />

                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        Choose
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        Select the garment you want to try.
                      </p>

                    </div>

                  </div>

                  {/* See */}

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cfc7b9] bg-[#eee7dc]">

                      <Sparkles
                        size={19}
                        strokeWidth={1.3}
                      />

                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        See
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        Get your virtual look.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>

          </div>
        </main>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      <nav className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-around border border-[#d8d1c6] bg-[#f8f7f2]/95 px-3 py-2.5 shadow-lg backdrop-blur lg:hidden">

        <Link
          to="/dashboard"
          className="flex flex-col items-center gap-1 rounded-[8px] bg-[#e9e3da] px-4 py-2 text-[10px] text-[#292724]"
        >
          <Home size={18} />
          Home
        </Link>

        <Link
          to="/try-on"
          className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
        >
          <Shirt size={18} />
          Try-On
        </Link>

        <Link
          to="/history"
          className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
        >
          <HistoryIcon size={18} />
          History
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 px-4 py-2 text-[10px]"
        >
          <UserRound size={18} />
          Profile
        </Link>

      </nav>
    </div>
  );
}

export default Dashboard;