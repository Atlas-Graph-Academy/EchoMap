# EchoMap: User Flow

---

## Screen Mode: Map View (The Gentle Drift)

Quiet. Minimal. Just a gentle way to wander.

```
┌─────────────────────────────────────────┐
│                                         │
│   (Status Bar)                          │
│                                         │
│                                         │
│                                         │
│             ✦        ✦                  │
│  [Active Memory Card Pop-up]            │
│  ┌──────────────────────────┐           │
│  │ ┌──────────────────────┐ │           │
│  │ │      IMAGE           │ │           │
│  │ └──────────────────────┘ │           │
│  │ "Quiet rain..."          │           │
│  └────────────┬─────────────┘           │
│               │                         │
│               ●                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                   ◎                     │  ← The Soft Key
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │   Scanning...                   │   │
│   │                                 │   │
│   │                                 │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## UI Elements Breakdown

### 1. The Soft Key (The "Wander" Button)
A subtle, semi-transparent circle at the bottom.
- **Visual:** It's barely there. Like a drop of water on glass.
- **Feeling:** No intense glowing or pulsing. It just waits.

### 2. The Interaction: "Drift & Bloom"
This is about "Little Serendipities" (小轻轻的偶遇) and "Little Avoidance" (小轻轻的偶避).

*   **The Avoidance (Dismiss):**
    *   You tap the button.
    *   The current memory doesn't snap shut. It just **dissolves** like mist. It fades away softly.
    *   *Feeling:* "Let this one go."

*   **The Drift (Transition):**
    *   The map **glides** to the next spot. No fast flying. It feels like floating on a slow river.
    *   Camera movement is smooth and heavy, not jittery.

*   **The Serendipity (Discovery):**
    *   A new location centers.
    *   The new card **blooms** (fades in) gently.
    *   *Feeling:* "Oh, here is something else."

### 3. The Logic: Pure Randomness
- No complex tuning. Just pure, simple shuffling of nearby echoes.
- It feels like walking down a street and letting your eyes catch whatever they catch.


---

## Interaction: Scroll Up → Memory List Appears

When user **scrolls up** (or drags the bottom panel up):

```
```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────────────────────────────┐   │
│   │     Browse the memories  ▼      │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ▓▓▓▓▓▓▓▓ (map is now smaller) ▓▓▓▓▓▓  │
│                                         │
├─────────────────────────────────────────┤  ← Drag handle
│                                         │
│  [BUILDING INFO CARD as above...]       │
│                                         │
│   ───────────────────────────────────   │
│   TODAY · DEC 16                (24)    │  ← Date + Count
│   Meaning: "Unexpected Connection"      │  ← Meaning Beacon Context
│   ───────────────────────────────────   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ┌──┐ Letting Go          ❤️12   │   │  ← Dense Row 1
│   │ │👤│ Sarah               💬3    │   │
│   │ └──┘                            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ┌──┐ First Light         💬8    │   │  ← Dense Row 2
│   │ │👤│ Marcus                     │   │
│   │ └──┘                            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ┌──┐ The Wait            🔥23   │   │  ← Dense Row 3
│   │ │👤│ Jenna               ❤️5    │   │
│   │ └──┘                            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ┌──┐ 3AM Rain            ❤️2    │   │
│   │ │👤│ Alex                       │   │
│   │ └──┘                            │   │
│   └─────────────────────────────────┘   │
│                    ...                  │
└─────────────────────────────────────────┘
```

## Structure Explanation: Compact Memory Stack

This layout prioritizes **vertical density** so users can see more memories at once without scrolling endlessly.

| Element | Position | Purpose |
|---------|----------|---------|
| **Date Anchor** | Section Header | "TODAY · DEC 16" establishes temporal context |
| **Meaning Context** | Sub-header | Explains *why* these memories are here (shared meaning) |
| **Total Count** | Top Right | "(24)" shows volume of content |
| **Memory Item** | Row | Self-contained, clickable row |
| **Avatar** | Left | 32px circular image for human connection |
| **Memory Name** | Left/Middle | Bold text, 1-2 words (the "Title") |
| **Author Name** | Below Title | Smaller text, secondary hierarchy |
| **Reactions** | Right | Social proof (❤️, 💬, 🔥) right-aligned to save space |

This removed the "river" flow and creates a **scannable list** where users can quickly browse titles and social signals.

---

## Building Info Card (Top of Memory List)

| Element | Description |
|---------|-------------|
| **Building Thumbnail** | Photo of the actual building/location |
| **Building Nickname** | Memorable name (e.g., "The Heartbeat") |
| **Building Description** | 1-2 sentences about what this place means |
| **Community Section** | Header + avatar thumbnails |
| **Community Thumbnails** | Row of 4-5 avatars + "+N more" indicator |
| **Community Names** | "Sarah, Marcus, Jenna & 12 more" |

---

## Memory Card (in list below building info)

Each memory in the list shows:
- **Thumbnail photo** (left side)
- **Memory hook text** (1-2 lines, emotionally compelling)
- **Author name + timestamp** (small, below text)

**Tap a card → Opens full Beacon Highlight Page (Memory Detail)**

---

## Mode Switch: "Browse the memories" Button

When user taps the top button, the experience shifts:

| Map View (Default) | Browse Mode |
|--------------------|-------------|
| Centered on user location | Can pan freely across city |
| Bottom panel shows nearest beacon | Bottom panel shows selected beacon |
| Glowing lights are ambient | Glowing lights are tappable |

---

## Summary: The Two States

### State 1: Map View (Default)
- See your location
- See glowing lights = memories exist around you
- Bottom shows nearest beacon name + stats
- Scroll up to see memory list from this location
- Top button to switch modes

### State 2: Browse Mode (after tapping button)
- Explore the whole map
- Tap on any glowing light to select it
- Selected beacon's info appears at bottom
- Scroll up to see that beacon's memory list

---

## Core UI Components

| Component | Description |
|-----------|-------------|
| **User Location Dot** | Blue dot showing current GPS position |
| **Memory Beacon (Light)** | Glowing marker on map (✦) |
| **Top Button** | "Browse the memories" — mode switch |
| **Bottom Panel** | Beacon name, memory count, people count |
| **Down Arrow** | Cue to scroll up for memory list |
| **Memory List** | Scrollable cards with photo + hook text |
| **Memory Card** | Photo + 1-2 line hook + author + time |
