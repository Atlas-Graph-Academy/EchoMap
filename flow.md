# EchoMap: User Flow

---

## Screen Mode: Map View (Default)

```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────────────────────────────┐   │
│   │     Browse the memories  ▼      │   │  ← Button (top)
│   └─────────────────────────────────┘   │
│                                         │
│                                         │
│             ✦        ✦                  │
│                  ✦                      │
│        ✦              ✦    ✦            │  ← Map with glowing lights
│                                         │     (each light = memory beacon)
│              ✦                          │
│     ✦                    ✦              │
│                  ●                      │  ← User's current location
│            ✦         ✦                  │
│                                         │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  ← Gradient fade
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │   MISSION DISTRICT              │   │  ← Beacon name (large)
│   │   847 memories · 156 people     │   │  ← Stats line
│   │                                 │   │
│   │            ▽                    │   │  ← Arrow: "scroll up to see more"
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## UI Elements Breakdown

### 1. Top Button: "Browse the memories"
- **Position:** Top of screen, centered
- **Action:** Tap to switch memory. Display a new memory. 
- **Style:** Subtle, doesn't distract from map

### 2. The Map
- **Full-screen** behind everything
- **User location:** Blue dot (●) showing where they are
- **Meaning beacons:** Glowing lights (✦) scattered across the map
  - These are NOT clickable in this mode
  - They just signal: "there's life here, memories exist"

### 3. Bottom Panel: Beacon Info Stage
- **Position:** Fixed at bottom of screen
- **Content:**
  - **Beacon Name** — Large text (e.g., "MISSION DISTRICT")
  - **Stats** — "847 memories · 156 people"
  - **Down Arrow (▽)** — Visual cue: scroll up to reveal memory list
- **Behavior:** This panel can be swiped up to expand

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
