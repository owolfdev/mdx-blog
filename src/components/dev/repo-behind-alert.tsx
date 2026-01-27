import { execSync } from "node:child_process";
import { isDevMode } from "@/lib/utils/is-dev-mode";

const run = (command: string) =>
  execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();

type RepoStatus = {
  ahead: number;
  behind: number;
  branch: string;
  upstream: string;
  fetchFailed: boolean;
};

const getRepoStatus = (): RepoStatus | null => {
  try {
    const isRepo = run("git rev-parse --is-inside-work-tree");
    if (isRepo !== "true") {
      return null;
    }

    const branch = run("git rev-parse --abbrev-ref HEAD");
    let upstream = "";

    try {
      upstream = run("git rev-parse --abbrev-ref @{upstream}");
    } catch {
      return null;
    }

    let fetchFailed = false;
    try {
      run("git fetch --quiet");
    } catch {
      fetchFailed = true;
    }

    const counts = run("git rev-list --left-right --count HEAD...@{upstream}");
    const [aheadRaw, behindRaw] = counts.split(" ");

    return {
      ahead: Number(aheadRaw ?? 0),
      behind: Number(behindRaw ?? 0),
      branch,
      upstream,
      fetchFailed,
    };
  } catch {
    return null;
  }
};

export default function RepoBehindAlert() {
  if (!isDevMode()) {
    return null;
  }

  const status = getRepoStatus();
  if (!status || status.behind <= 0) {
    return null;
  }

  return (
    <div
      className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      role="alert"
      aria-live="polite"
    >
      <div className="font-semibold">Local repo is behind remote</div>
      <div>
        {status.branch} is behind {status.upstream} by {status.behind} commit
        {status.behind === 1 ? "" : "s"}.
        {status.fetchFailed ? " (Fetch failed; status may be stale.)" : ""}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-700">
        Run: git pull --rebase
      </div>
    </div>
  );
}
