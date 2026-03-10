# Python Exercises Learn - AI Agent Operational Rules

## 1. Genome Checkpoint (STRICT STATE)
- **Target**: 3300 Questions (Level 0: 300 + Levels 1–10: 300 each = 3300 total).
- **Current Progress**: 3300 / 3300 Questions
- **Last Fulfilled ID**: 3300 (Level 0 complete at 300/300, ALL 10 levels complete at 300/300 each)
- **Uniqueness Level**: HIGH VARIANCE MANDATED.
- **Rule**: All 3300 questions must be unique. Every question must be a unique logical challenge. No repetitive patterns. Repetitive patterns are considered a failure of educational integrity.
- **Level 0**: Tadpole – very first steps (print, variables, values, type(), simple expressions). For complete beginners. Easier than Level 1.

## 2. Consent & Modification Rules
- **Explicit Consent**: No changes shall be made to the source code without explicit user approval.
- **Layout Preservation**: Do not deviate from the existing visual identity.
- **Incremental Updates**: Keep updates as minimal as possible while satisfying requirements.
- **Strict Scope Control**: When the user asks for a specific change, implement only that request. Do not add extra UI elements, display changes, or additional features unless explicitly requested.

## 3. Glossary & Educational Integrity
- **Glossary Source of Truth**: The `glossary.md` file is the master reference.
- **Consistency Rule**: All definitions must be consistent with `glossary.md`.
- **Pre-Change Check**: Agents must always consult `ps.md` and `planning.md` before making changes.
- **Debugging Reference**: Agents must always consult `ps.md` for debugging information and urgent issues.

## 4. The 3,300-Question Genome Goal
- **Completion Task**: Reach exactly 3,300 high-quality Python questions (Level 0: 300 + Levels 1–10: 300 each).
- **Status**: 3,300 ACHIEVED. Level 0 (Tadpole) COMPLETE at 300/300. ALL 10 levels COMPLETE at 300/300 each. Genome checkpoint FULFILLED.
- **Diversity Rule**: Use at least 10 logic templates per stage to ensure students encounter varied syntax and conceptual challenges.

## 5. Testing and Deployment Rules
- **Testing Requirement**: Agents must always run tests before telling the user that the app should deploy successfully.
- **Layout Preservation**: Agents must never change the layout of the app when making changes unless explicitly asked by the user.
- **Debugging Reference**: Agents must always consult ps.md for debugging information.
- **Browser Testing**: Agents must always test the app in the browser first to ensure it works and opens correctly before pushing to Git.
- **User Consent for Commits**: Agents must always ask the user for approval before committing to Git.

## 6. Internationalization & French Mode
- **Goal**: Transform this app into a fully bilingual experience (English and French). This is critical.
- **Full French Mode**: When the user selects French, **all** visible UI text and explanations must appear in French (navigation, buttons, panels, short explanations, detailed explanations, and advanced panels like Code Versatility).
- **Structural Parity**: French detailed explanations (explication du codon / description approfondie) must be structurally identical to the English versions: same sections (Key concepts, How it works, Examples, Common uses, Edge cases, etc.), same level of detail, Python code unchanged.
- **Fallback Rule**: Only fall back to English when a French translation truly does not exist yet; once added, the French version must fully mirror the English content in depth and structure.

## 7. Monetisation Goal
- **Goal**: Monetise this app later. Quality must be top-notch.

## 8. Verify Code Instruction
- When the user types "verify code", the agent's role is to verify and debug any problems, issues, conflicts, or potential bugs in the codebase.

## 9. CRITICAL: Offline Support (MOST IMPORTANT)
- **This app MUST work fully offline**. This is the highest priority feature.
- **Service Worker**: Always keep `public/sw.js` and root `sw.js` in sync with the same code.
- **Build Process**: Ensure the build copies the correct `sw.js` to `dist/`.
- **Testing**: Before pushing any changes, verify offline works by testing in browser with network disabled.
- **PWA**: Ensure manifest.json is correct and the app can be installed as a PWA.

**URGENT NOTE FOR ALL AGENTS: OFFLINE MODE MUST NEVER BREAK AGAIN.** 
If you make ANY changes to caching, routing, or the build process, you must double-check that the service worker correctly pre-caches the Vite-hashed JS and CSS files. The `install` event in `sw.js` must fetch `index.html` and pre-cache all assets matched by regex so that the app works offline IMMEDIATELY upon first load. DO NOT break this offline functionality!
