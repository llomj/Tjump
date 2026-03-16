# TJump Philosophy Explorer – AI Agent Operational Rules

## A. Philosophy Explorer Scope & Integrity

- **App Identity**: This repository now powers the **TJump Philosophy Explorer** — an offline-first PWA that organises TJump’s debates, arguments, and reasoning style into a structured philosophy knowledge system.
- **Continuous improvement**: The app **must keep improving and evolving**. As more transcript content from videos is added (see `videos.md` and `content/transcripts/`), the panels **Epistemology**, **Arguments**, **Debates**, and **Mind map** must all evolve: update or add section items, mind map nodes, and linked markdown so the UI reflects the growing knowledge base. New transcripts should drive new or updated concepts, arguments, debate methods, and mind map structure—not remain disconnected.
- **Static Content Rule**: The app consumes **only pre-generated static content** (markdown, JSON). No live AI models, no runtime RAG, no network calls for “AI Judge” behaviour. All analyses (evaluations, fallacies, scores) are written and versioned ahead of time.
- **Source Integrity**:
  - Every philosophical claim attributed to TJump must be traceable to one or more **transcript segments** (video title, timestamp, excerpt).
  - Do **not** invent positions, arguments, or quotes. When in doubt, mark content for human review instead of guessing.
  - Keep transcript context sections accurate and minimal – enough to situate the claim without editorialising.
- **Content Structure**:
  - Concepts, arguments, evaluations, fallacies, and mind map nodes must follow the schemas defined in `src/types.ts` (e.g. `ConceptPage`, `ArgumentPage`, `LogicalEvaluation`, `FallacyAnalysis`, `MindMapNode`, `PhilosophyTags`).
  - Tags (`topic`, `argument_type`, `debate_mode`, `tone`, `methodology`, `source_video_id`, `year`, etc.) must be meaningful and consistent to support offline filtering and browsing.

## B. Static “AI Judge” Evaluations

- **No runtime judging**: The “Logical Evaluation” and scoring system is purely **static**:
  - Validity, soundness, coherence, evidence strength, debate strength, and rhetorical clarity are written into content files as numbers (0–10) and explanatory notes.
  - The app only **renders** these values; it never computes or updates them dynamically.
- **Evaluation Consistency**:
  - For each argument, ensure the written verdict matches the numeric scores (e.g. “logically valid but empirically weak” should align with high validity and low evidence strength).
  - Fallacy flags must reflect the detailed notes (e.g. “burden of proof shift: present” should be supported by the transcript context.

## C. Internationalization & French Mode (Philosophy Explorer)

- **Goal**: The app remains a fully bilingual experience (English and French). This now applies to **all** philosophy explorer UI and explanatory content.
- **Full French Mode**:
  - When the user selects French, **all visible UI text and explanations** must appear in French (navigation, buttons, panels, mind map labels, evaluation headings, fallacy panels, and any helper text).
  - For each concept/argument/evaluation added in English, a structurally identical French version must be planned and tracked (same sections, same depth; code or formal structure unchanged).
- **Fallback Rule**:
  - Only fall back to English when a French translation truly does not exist yet; once added, the French version must fully mirror the English content in depth and structure.

## D. Consent & Modification Rules

- **Explicit Consent**: No changes shall be made to the source code without explicit user approval.
- **Layout Preservation**: Do not deviate from the existing visual identity (black/yellow theme, card layout, mobile-first PWA shell).
- **Incremental Updates**: Keep updates as minimal as possible while satisfying requirements.
- **Strict Scope Control**: When the user asks for a specific change, implement only that request. Do not add extra UI elements, display changes, or additional features unless explicitly requested.

## E. Glossary & Educational Integrity (Philosophy)

- **Glossary Source of Truth**: The `glossary.md` file is the master reference.
- **Consistency Rule**:
  - All definitions must be consistent with `glossary.md`.
  - Philosophy concepts that appear both in `glossary.md` and in the knowledge base must not conflict.
- **Pre-Change Check**: Agents must always consult `ps.md` and `planning.md` before making changes.
- **Debugging Reference**: Agents must always consult `ps.md` for debugging information and urgent issues.

**Mind map rule link**:
- Before changing anything related to the mind map, agents **must** read the **“4.1 NotebookLM-style Mind Map UX (Touch + Explanations)”** section in `ps.md` and respect its ✓ / ✗ status markers.

## F. Testing and Deployment Rules (Philosophy Explorer)

- **Testing Requirement**: Agents must always run tests before telling the user that the app should deploy successfully.
- **Layout Preservation**: Agents must never change the layout of the app when making changes unless explicitly asked by the user.
- **Debugging Reference**: Agents must always consult ps.md for debugging information.
- **Browser Testing**: Agents must always test the app in the browser first to ensure it works and opens correctly before pushing to Git.
- **User Consent for Commits**: Agents must always ask the user for approval before committing to Git.
- **Single-branch workflow (main only)**:
  - All work must ultimately land on the **`main`** branch; do not maintain or deploy from other long-lived branches unless the user explicitly requests it.
  - After local commits are pushed to `main`, deployment to GitHub Pages must happen **via the `Deploy to GitHub Pages` GitHub Actions workflow**, not by manual copying of `dist/`.
  - When checking what is live, always treat the **commit referenced by the latest successful `Deploy to GitHub Pages` run on `main`** as the source of truth for the deployed app.

## G. CRITICAL: Full Offline Support (MOST IMPORTANT — DO NOT BREAK)

**The app MUST work fully offline.** If the user turns off the internet and reopens the app, it must load and run exactly as when online. This is the highest priority feature.

### Rules all agents MUST follow
- **Never remove or break offline behavior.** Do not change the build step that generates `dist/sw.js` or the service worker logic that precaches assets.
- **Build process:** Production build MUST run `vite build && node scripts/inject-precache.js`. Do not change to `cp sw.js dist/sw.js` or drop the inject step. The inject script reads `dist/index.html`, extracts all hashed JS/CSS asset URLs, and injects them into `dist/sw.js` so the service worker precaches them at install. Without this, the app will not work offline after reopen.
- **Service worker:** Root `sw.js` is the template. `public/sw.js` must stay in sync with root `sw.js`. The file in `dist/` is generated at build time by `scripts/inject-precache.js` and must not be committed; only the template is in the repo.
- **Do not:** Remove or bypass `scripts/inject-precache.js`; change `PRECACHE_ASSETS` usage in `sw.js`; return `undefined` from fetch handlers (return a 503 Response instead); or change navigation fallback (must try `event.request`, then `base + 'index.html'`, then `base`).
- **Content directories:** Any new static content paths used by the philosophy explorer (for example `content/**` and `mindmap/**`) must either:
  - Be reachable via existing glob patterns in `scripts/inject-precache.js`, or
  - Be explicitly added to its asset discovery logic so they are precached alongside the JS/CSS bundles.
- **Testing:** Before any deploy or claim that the app works, verify offline: build, serve or deploy, open the app once online, then disable network (or go offline), reopen the app. It must load and run. If it does not, offline support is broken.
- **PWA:** Keep `manifest.json` correct so the app can be installed as a PWA.

**If you change caching, routing, base path, or the build pipeline, you MUST re-verify offline behavior and leave this section intact.**

---

## Legacy: Python Exercises Learn Rules (historical reference)

These rules describe the original Python question-bank project. They are kept for historical context and for understanding older branches/builds, but **the active product is now the TJump Philosophy Explorer**.

### 1. Genome Checkpoint (STRICT STATE)
- **Target**: 3300 Questions (Level 0: 300 + Levels 1–10: 300 each = 3300 total).
- **Current Progress**: 3300 / 3300 Questions
- **Last Fulfilled ID**: 3300 (Level 0 complete at 300/300, ALL 10 levels complete at 300/300 each)
- **Uniqueness Level**: HIGH VARIANCE MANDATED.
- **Rule**: All 3300 questions must be unique. Every question must be a unique logical challenge. No repetitive patterns. Repetitive patterns are considered a failure of educational integrity.
- **Level 0**: Tadpole – very first steps (print, variables, values, type(), simple expressions). For complete beginners. Easier than Level 1.

### 4. The 3,300-Question Genome Goal
- **Completion Task**: Reach exactly 3,300 high-quality Python questions (Level 0: 300 + Levels 1–10: 300 each).
- **Status**: 3,300 ACHIEVED. Level 0 (Tadpole) COMPLETE at 300/300. ALL 10 levels COMPLETE at 300/300 each. Genome checkpoint FULFILLED.
- **Diversity Rule**: Use at least 10 logic templates per stage to ensure students encounter varied syntax and conceptual challenges.

### 7. Monetisation Goal
- **Goal**: Monetise this app later. Quality must be top-notch.

### 8. Verify Code Instruction
- When the user types "verify code", the agent's role is to verify and debug any problems, issues, conflicts, or potential bugs in the codebase.

