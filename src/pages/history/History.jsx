import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Home,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  Trash2,
  UserRound,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  getTryOnHistory,
  deleteTryOn,
} from "../../services/tryOnService";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTryOnHistory();

      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load history:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load your try-on history."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || deleting) return;

    try {
      setDeleting(true);

      await deleteTryOn(deleteId);

      setHistory((current) =>
        current.filter((item) => item.requestId !== deleteId)
      );

      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete try-on:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to delete this try-on."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("arose_token");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatus = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          label: "Completed",
          className: "bg-[#bfae9c] text-[#302a25]",
          icon: CheckCircle2,
        };

      case "PROCESSING":
        return {
          label: "Processing",
          className: "bg-[#ebe7df] text-[#55504a]",
          icon: Loader2,
        };

      case "PENDING":
        return {
          label: "Pending",
          className: "bg-[#ebe7df] text-[#55504a]",
          icon: Clock3,
        };

      case "FAILED":
        return {
          label: "Failed",
          className: "bg-[#f1dfdc] text-[#8b4037]",
          icon: AlertCircle,
        };

      default:
        return {
          label: status || "Unknown",
          className: "bg-[#ebe7df] text-[#55504a]",
          icon: Clock3,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#171717]">

      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 hidden h-screen w-[250px] border-r border-black/10 bg-[#f8f7f4] px-7 py-8 lg:flex lg:flex-col">

        <Link
          to="/dashboard"
          className="mb-14 font-display text-[30px] tracking-[-0.04em]"
        >
          AROSE
        </Link>

        <div className="flex-1">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Workspace
          </p>

          <nav className="space-y-1">

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-black/55 transition hover:text-[#302a25]"
            >
              <Home size={17} strokeWidth={1.7} />
              Home
            </Link>

            <Link
              to="/try-on"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-black/55 transition hover:text-[#302a25]"
            >
              <Sparkles size={17} strokeWidth={1.7} />
              Try-On
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-3 bg-[#bfae9c] px-3 py-2.5 text-sm font-medium text-[#302a25]"
            >
              <Clock3 size={17} strokeWidth={1.7} />
              History
            </Link>

          </nav>

          <p className="mb-4 mt-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Account
          </p>

          <nav className="space-y-1">

            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-black/55 transition hover:text-[#302a25]"
            >
              <UserRound size={17} strokeWidth={1.7} />
              Profile
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-black/55 transition hover:text-[#302a25]"
            >
              <Settings size={17} strokeWidth={1.7} />
              Settings
            </Link>

          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-black/50 transition hover:text-[#302a25]"
        >
          <LogOut size={17} strokeWidth={1.7} />
          Log out
        </button>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="pb-28 lg:ml-[250px] lg:pb-10">

        {/* Header */}

        <header className="border-b border-black/10 px-5 py-5 sm:px-8 lg:px-12">

          <div className="mx-auto flex max-w-[1200px] items-center justify-between">

            <div>

              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Your workspace
              </p>

              <h1 className="font-display text-[30px] tracking-[-0.03em] sm:text-[36px]">
                Try-On History
              </h1>

            </div>

            {/* New Try-On */}

            <Link
              to="/try-on"
              className="hidden items-center gap-2 rounded-full bg-[#bfae9c] px-5 py-3 text-sm font-medium text-[#302a25] transition hover:bg-[#ad9b87] sm:flex"
            >
              <Plus size={16} />
              New Try-On
            </Link>

          </div>

        </header>

        {/* Content */}

        <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">

          <div className="mx-auto max-w-[1200px]">

            {/* Intro */}

            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="max-w-xl text-sm leading-6 text-black/55">
                  Revisit your previous virtual try-ons and explore the looks
                  you've created with AROSE.
                </p>

              </div>

              <div className="text-xs uppercase tracking-[0.15em] text-black/35">
                {history.length}{" "}
                {history.length === 1 ? "try-on" : "try-ons"}
              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-6 flex items-center justify-between border border-[#cda9a4] bg-[#f5e8e5] px-4 py-3 text-sm text-[#7b4039]">

                <div className="flex items-center gap-3">
                  <AlertCircle size={17} />
                  <span>{error}</span>
                </div>

                <button
                  onClick={() => setError("")}
                  className="opacity-60 transition hover:opacity-100"
                >
                  <X size={16} />
                </button>

              </div>
            )}

            {/* Loading */}

            {loading ? (

              <div className="flex min-h-[420px] items-center justify-center border border-black/10 bg-white/30">

                <div className="flex flex-col items-center gap-4">

                  <Loader2
                    size={26}
                    className="animate-spin text-[#8c8177]"
                  />

                  <p className="text-sm text-black/45">
                    Loading your history...
                  </p>

                </div>

              </div>

            ) : history.length === 0 ? (

              /* ================= EMPTY STATE ================= */

              <div className="flex min-h-[500px] flex-col items-center justify-center border border-black/10 bg-white/30 px-6 text-center">

                <div className="mb-6 flex h-16 w-16 items-center justify-center border border-[#d8cec3] bg-[#f8f7f4]">

                  <ImageIcon
                    size={25}
                    strokeWidth={1.4}
                    className="text-[#8c8177]"
                  />

                </div>

                <h2 className="font-display text-[30px] tracking-[-0.03em]">
                  Nothing here yet
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
                  Your completed virtual try-ons will appear here.
                  Create your first look to get started.
                </p>

                <Link
                  to="/try-on"
                  className="mt-7 flex items-center gap-2 rounded-full bg-[#bfae9c] px-6 py-3 text-sm font-medium text-[#302a25] transition hover:bg-[#ad9b87]"
                >
                  Start a Try-On
                  <ArrowRight size={16} />
                </Link>

              </div>

            ) : (

              /* ================= HISTORY GRID ================= */

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {history.map((item) => {

                  const status = getStatus(item.status);
                  const StatusIcon = status.icon;

                  return (

                    <article
                      key={item.requestId}
                      className="group overflow-hidden border border-black/10 bg-white/50"
                    >

                      {/* Image */}

                      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5de]">

                        {item.resultUrl && item.status === "COMPLETED" ? (

                          <img
                            src={item.resultUrl}
                            alt="Virtual try-on result"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          />

                        ) : (

                          <div className="flex h-full w-full flex-col items-center justify-center">

                            {item.status === "PROCESSING" ||
                            item.status === "PENDING" ? (

                              <>
                                <Loader2
                                  size={28}
                                  className="mb-4 animate-spin text-[#8c8177]"
                                />

                                <p className="text-xs uppercase tracking-[0.15em] text-black/40">
                                  Preparing your look
                                </p>
                              </>

                            ) : item.status === "FAILED" ? (

                              <>
                                <AlertCircle
                                  size={28}
                                  className="mb-4 text-[#9a5148]"
                                  strokeWidth={1.4}
                                />

                                <p className="text-xs uppercase tracking-[0.15em] text-[#9a5148]">
                                  Generation failed
                                </p>
                              </>

                            ) : (

                              <>
                                <ImageIcon
                                  size={28}
                                  className="mb-4 text-black/25"
                                  strokeWidth={1.4}
                                />

                                <p className="text-xs uppercase tracking-[0.15em] text-black/35">
                                  No result
                                </p>
                              </>

                            )}

                          </div>

                        )}

                        {/* Status */}

                        <div className="absolute left-4 top-4">

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${status.className}`}
                          >

                            <StatusIcon
                              size={12}
                              className={
                                item.status === "PROCESSING"
                                  ? "animate-spin"
                                  : ""
                              }
                            />

                            {status.label}

                          </span>

                        </div>

                        {/* Delete */}

                        <button
                          onClick={() => setDeleteId(item.requestId)}
                          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black/50 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-[#bfae9c] hover:text-[#302a25]"
                          title="Delete"
                        >
                          <Trash2 size={15} strokeWidth={1.7} />
                        </button>

                      </div>

                      {/* Card details */}

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                              Virtual Try-On
                            </p>

                            <p className="mt-2 text-sm font-medium">
                              {formatDate(item.createdAt)}
                            </p>

                            <p className="mt-1 text-xs text-black/40">
                              {formatTime(item.createdAt)}
                            </p>

                          </div>

                          {item.status === "COMPLETED" &&
                            item.resultUrl && (

                              <button
                                onClick={() =>
                                  navigate(
                                    `/try-on/result/${item.requestId}`
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9bbae] text-[#5a5149] transition hover:bg-[#bfae9c] hover:text-[#302a25]"
                              >
                                <ArrowRight size={15} />
                              </button>

                            )}

                        </div>

                      </div>

                    </article>

                  );
                })}

              </div>

            )}

          </div>

        </section>

      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-[#f8f7f4]/95 px-4 py-3 backdrop-blur lg:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around">

          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 text-black/45 transition hover:text-[#302a25]"
          >
            <Home size={19} strokeWidth={1.7} />
            <span className="text-[9px] uppercase tracking-[0.1em]">
              Home
            </span>
          </Link>

          <Link
            to="/try-on"
            className="flex flex-col items-center gap-1 text-black/45 transition hover:text-[#302a25]"
          >
            <Sparkles size={19} strokeWidth={1.7} />
            <span className="text-[9px] uppercase tracking-[0.1em]">
              Try-On
            </span>
          </Link>

          <Link
            to="/history"
            className="flex flex-col items-center gap-1 text-[#5a5149]"
          >
            <Clock3 size={19} strokeWidth={1.7} />
            <span className="text-[9px] uppercase tracking-[0.1em]">
              History
            </span>
          </Link>

          <Link
            to="/profile"
            className="flex flex-col items-center gap-1 text-black/45 transition hover:text-[#302a25]"
          >
            <UserRound size={19} strokeWidth={1.7} />
            <span className="text-[9px] uppercase tracking-[0.1em]">
              Profile
            </span>
          </Link>

        </div>

      </nav>

      {/* ================= DELETE MODAL ================= */}

      {deleteId && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5 backdrop-blur-[2px]">

          <div className="w-full max-w-[420px] border border-[#d8cec3] bg-[#f8f7f4] p-7 shadow-xl">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
                  Remove try-on
                </p>

                <h2 className="font-display text-[28px] tracking-[-0.03em]">
                  Delete this look?
                </h2>

              </div>

              <button
                onClick={() => setDeleteId(null)}
                className="text-black/40 transition hover:text-[#302a25]"
              >
                <X size={19} />
              </button>

            </div>

            <p className="text-sm leading-6 text-black/50">
              This try-on will be removed from your history. This action
              cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">

              {/* Cancel */}

              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 rounded-full border border-[#c9bbae] px-4 py-3 text-sm text-[#5a5149] transition hover:bg-[#eee7df] disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Delete */}

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#bfae9c] px-4 py-3 text-sm font-medium text-[#302a25] transition hover:bg-[#ad9b87] disabled:opacity-50"
              >

                {deleting ? (

                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Deleting...
                  </>

                ) : (

                  <>
                    <Trash2 size={15} />
                    Delete
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default History;