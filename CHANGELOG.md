# Changelog

## [1.0.0] – 2025-10-20
### Initial Release
- Launched the **UPV TTBDO TRL Assessment System**.
- Included **5 assessment categories**:
  - Technology Status
  - Market and Commercialization Status
  - Intellectual Property Status
  - Industry Adoption Status
  - Regulatory Compliance Status
- Implemented question navigation, progress tracking, and category-based sequencing.
- Added **TRL computation engine** and **AI-assisted recommendation generation**.
- **Logic:** Utilized a **sequential TRL validation model**, requiring each TRL level to be fully completed before advancing.

---

## [1.2.0] – 2025-11-27
### Major Update — Front-End Migration & Logic Revision

#### 🔧 Front-End / UI Improvements
- Migrated platform from **Wix Editor → Wix Studio**.
- Rebuilt UI using Studio’s **responsive flex-layout system**.
- Converted all pages and sections to use **responsive containers**, improving mobile and tablet compatibility.
- Updated repeaters, navigation panels, and category layouts to support Studio's adaptive design tools.
- Improved accessibility (scalable typography, better contrast, semantic structure).

#### 🚀 Navigation & Interaction Enhancements
- Updated multi-page question navigation for improved responsiveness.
- Refactored button placement using Studio’s adaptive layout (no more fixed/absolute positioning).
- Enhanced progress tracking and category transitions for smoother user flow.

#### 🧠 Assessment Logic Enhancements
- Refactored TRL evaluation to match Studio’s updated data-binding behavior.
- Improved sequential TRL verification to avoid inconsistent state transitions.
- Added validation requiring **at least one checked item in "Technology Status"** before proceeding.
- Strengthened cross-category consistency checks to improve result accuracy.

#### 🗄️ Data & Storage Changes
- Unified answer-tracking with a new global state handler compatible with Studio’s repeater lifecycle.
- Improved session storage usage for faster and more stable category switching.
- Updated Render server wake-up routines and backend compatibility.

#### 🔒 Stability & Error Handling
- Added error handling for missing or empty categories.
- Improved user-facing messages when required selections are missing.
- General optimizations and code cleanup.

---
