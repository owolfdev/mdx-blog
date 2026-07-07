# MDXBlog: Auto-Generated Devlog Feature — Product Direction

## 1. Concept

Extend MDXBlog with a feature that automatically drafts blog posts from a user's development activity, rather than requiring manual authorship. The user connects one or more GitHub repositories; the system ingests commits, diffs, PRs, and issue threads, and generates a written draft in the user's voice. The user reviews and publishes — the system never auto-publishes.

**Core pitch:** connect a repo, get a readable draft post back in minutes. Value is visible before any writing effort is invested.

## 2. Why This Direction (and Not the Original Idea)

The original concept was broader: a tool with access to notes, images, and schedule that documents a person's life or business like a reporter. That version was rejected as a starting point because:

- The access surface (notes + photos + calendar) is effectively full life access, with no natural boundary between ingested and publishable material.
- It introduces third-party privacy exposure (other people appearing in notes/photos without consent).
- Inference-heavy narration ("had a rough week") risks publishing incorrect claims about the user's own life.
- No structured, semantic, timestamped data source exists for general life activity the way Git does for code.

The dev-focused version avoids nearly all of this:

- The data source (Git history) is already structured, timestamped, and owned by the user.
- The audience for a dev blog already expects working-notes tone, not polished narrative — lowering the bar for what "good" generated output looks like.
- Distribution is close to free: build-in-public content already spreads through dev-specific channels (HN, dev Twitter, Reddit) without paid acquisition.

## 3. Data Sources

### Primary (v1): GitHub
- Accessible via hosted API with per-repo OAuth scoping — no local agent required.
- Read scope only for source repos.
- Ingests: commits, diffs, PR descriptions, issue/review threads.
- Enables a fully hosted, server-to-server pipeline — critical for the monetization model (see §6).

### Considered and deferred: Cursor chat history
- Would add richer material — reasoning trails, dead ends, "why X over Y" — that Git history alone loses.
- Rejected for v1 because it requires a local agent/IDE extension reading data off the user's disk; no hosted API exists for this data.
- Introduces a harder privacy/security surface (secrets in chat logs, local file access) for marginal initial gain.
- Positioned as a possible v2 add-on (local CLI/extension supplementing the GitHub-based core), not a v1 dependency.

## 4. Repo Model: Read vs. Write

Two distinct repo roles:

- **Content repo (write access):** where MDXBlog commits generated/edited posts. One (or few) per blog/site.
- **Source repos (read-only access):** the user's actual project repos, providing raw activity data. Many-to-one relationship — multiple source repos can feed a single content repo/blog.

Design implications:
- OAuth scoping should be precise and per-purpose (GitHub App installations with read-only grants for source repos, write only for the content repo) — never blanket account-wide write access.
- Per-repo configuration (cadence, voice profile, target blog/section) rather than global settings.
- Multi-repo read access is a natural, understandable tiering lever (see §6).

## 5. Draft Generation Logic (Avoiding Fragmentation)

**Problem:** naive cadence-based generation (e.g., daily cron, per-push webhook) creates a new draft file on every run, littering the content repo with near-duplicate half-posts instead of one coherent, evolving draft.

**Approach:**

1. **Anchor drafts to a unit of work where possible** — a feature branch, PR, or issue/milestone. All activity on that unit updates the same draft until the unit closes (branch merges, PR closes), at which point the draft is marked ready-for-review.
2. **Fall back to a rolling "open draft" per repo** for unstructured/direct-to-main activity. New activity updates the existing open draft until the user publishes, archives, or a max age/size threshold forces closure (e.g., 2 weeks or N commits).
3. **Frontmatter-based bookkeeping:** each draft file carries `status` (e.g. `draft-open`, `ready`, `published`), `source_repo`, and `since_commit` (last incorporated commit SHA). Each run diffs from `since_commit` to HEAD and updates accordingly.
4. **Regenerate, don't append.** Feed the model the previous draft plus the new increment and have it produce an updated whole post, preserving narrative coherence rather than degrading into a log.
5. **Publish action closes the loop** — once published, the draft is done; new activity on that repo/branch starts fresh.

Mental model to design and market around: **one draft per unit of work, not one draft per time tick.**

## 6. Blog Intent / Voice Profiles

Different blogs generated from the same underlying activity data may have different intent — e.g.:

- **Build-in-public:** first-person, process-and-struggle-focused, includes debugging detours and decisions, audience = other builders/devs.
- **Company changelog:** more polished, benefit-focused, third-person-ish, audience = customers/non-technical users, excludes internal-only detail.

This is a **prompt/configuration difference, not a pipeline difference.** Proposed model:

```
blog_profile:
  intent: "build_in_public" | "company_changelog" | custom
  voice: first_person | third_person
  audience: devs | customers | mixed
  filters:
    include_process_notes: true/false
    include_internal_detail: true/false
  cta_style: none | product_link | signup
```

Recommendation: ship the two known presets well-tuned; do not build a general-purpose personality system with many dials until a third real use case appears that doesn't fit either preset.

## 7. Hosted vs. Self-Hosted / Open Source

**Decision: hosted-only, closed-source core generation pipeline.**

Reasoning:
- Metered pricing (draft counts, repo connections, seats) only works if generation runs on MDXBlog's infrastructure. Self-hosting would let the most technically capable segment of the target market (developers) bypass paid tiers entirely.
- The differentiator is pipeline design (ingestion strategy, incremental summarization, voice-matching), which doesn't require open-sourcing code to describe or defend, and open-sourcing it would hand the approach to competitors while removing the reason to pay.
- Devs are specifically the worst audience to open-source a monetized core against, since they are the most likely and able to self-host.

**Optional middle path for OSS goodwill / distribution:**
- Open-source thin boundary pieces only — e.g., a CLI/integration adapter that extracts and packages repo activity — while keeping the actual generation/voice-matching engine closed and API-gated.
- Open-source the MDX rendering/output layer, since it isn't the monetized surface.

## 8. Monetization

### Angles
1. **Usage-metered generation** — the direct lever: gate draft count and/or connected repo count by tier.
2. **Team/company changelog product line** — repositions the same feature for engineering teams wanting public or internal "what shipped this week" digests; higher willingness to pay than solo devs.
3. **Hosting/publishing upsells** — custom domains, analytics, SEO tooling, RSS/newsletter export, if MDXBlog also hosts rendered output.
4. **Voice-tuning as a paid feature** — style-matching from past posts, gated once users notice generic/robotic default output.
5. **Integration expansion** — Linear, GitHub Issues, Slack, Cursor, Notion; each new source is a reason to upgrade tiers or attract new user segments (e.g., PMs).

### Proposed Tiers

**Free — "Draft"**
- Manual MDX authoring, Git-backed storage
- 1 connected (read) repo, 3 auto-generated drafts/month
- MDXBlog subdomain only

**Individual (~$12–15/mo) — "Author"**
- Unlimited manual posts, up to 3 connected repos
- ~20 auto-generated drafts/month
- Custom domain, basic analytics, RSS
- Voice tuning from 3–5 past posts

**Pro (~$29–35/mo) — "Studio"**
- Unlimited repos, unlimited drafts (fair-use capped)
- Multi-source ingestion (Linear/GitHub Issues/Slack, if built)
- Multiple author/voice profiles, scheduled generation
- SEO tooling, newsletter export

**Team (per-seat, ~$15–20/seat/mo, min seats) — "Changelog"**
- Org-level repo connections, shared draft review/approval workflow
- Public team changelog blog surface
- Role-based publish permissions (draft vs. approve separation)

### Structural notes
- Meter drafts as a concrete unit, not vague "AI features."
- Gate approval/review workflows behind Team tier — solo users don't need them, teams do by default.
- Consider metering by ingestion volume (repo size/context) in addition to draft count, to avoid large monorepos landing on the cheapest tier.
- Annual discount (~20%) to reduce churn risk inherent to usage-based AI products.

## 9. Positioning: Devs as the Target Market

**Assessment: correct starting position, not a permanent ceiling.**

In favor of dev-only:
- Free, specific distribution channel (dev communities already share this content type).
- Uniquely structured, narratable data source (Git) that most other professions lack an equivalent for.
- Existing MDX + Git-based publishing infrastructure is valued specifically by devs.
- Focus allows the voice/style model to be tuned for one register instead of diluted across many.

Ceiling / risk:
- "Devs who want a public devlog" is a real but niche TAM.
- The underlying mechanism (ingest activity → narrate → draft-not-publish) generalizes beyond dev use cases, but MDXBlog currently lacks structured ingestion for other verticals (design, research, legal, etc.).
- "Dev" actually contains two markets with different economics: price-sensitive/high-churn solo devs, and higher-budget engineering teams (Team tier).

**Recommendation:** stay dev-only for now; expand via dev-adjacent surfaces (Linear, GitHub Issues, Slack-for-eng-teams, Cursor) rather than into new professions. This grows TAM through the Team tier without diluting the current moat.

## 10. Competitive Landscape

"GitHub as the database" and Git-backed content editing are an established category, not a novel claim:
- Decap CMS (formerly Netlify CMS) and similar tools already present a UI over content stored in a Git repo, committing edits directly.
- Purpose-built tools (e.g., GitCMS) explicitly use GitHub as the storage backend via an admin panel that commits through the GitHub API.
- Mobile-friendly / any-device editing is already marketed by at least one competitor in this space.

**Conclusion:** "commits directly to GitHub, works on mobile" should be treated as category hygiene, not the differentiating pitch. None of the surveyed competitors generate content from repo activity — they are all editors for content a human writes from scratch. MDXBlog's actual point of differentiation is **generation + review**, not "files live in your GitHub repo." The mobile use case to lead with is reviewing/approving AI-drafted posts (a strong phone interaction), not composing from a blank editor (a weak one, and already contested ground).

## 11. Overall Expectation-Setting

This feature is best understood as a **growth and retention lever for MDXBlog**, not a standalone moonshot:

- Low expectations are appropriate for "this feature alone becomes a big business."
- Moderate-to-good expectations are appropriate for its effect on MDXBlog's acquisition (a self-demonstrating, shareable demo) and retention (ongoing reason to stay engaged with the product) curves.
- The main risk is habit/willingness-to-pay: people like the idea of a devlog more reliably than they sustain engagement with one, whether writing it themselves or reviewing AI drafts — churn risk should be planned for from the start (e.g., via the review-workflow UX and the Team tier's structural stickiness).

## 12. Open Questions / Next Decisions

- Exact boundary rules for when a rolling "open draft" force-closes (time vs. commit-count threshold).
- Whether/how to support cross-repo digest posts ("this week across all my projects") vs. strictly per-repo draft streams.
- Whether Cursor (or other local-data) integration is ever built, and if so, whether it ships as an optional local adapter rather than a core dependency.
- Redaction/secret-detection requirements for diffs and any future chat-log ingestion, even though the core GitHub-only pipeline is lower-risk than the original all-access concept.
