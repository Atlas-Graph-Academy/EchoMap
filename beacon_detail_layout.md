# Beacon Detail View: Layout Analysis & Specification

## I. Visual Decomposition (Based on Source Image)

The provided design follows a "Stickerbook" aesthetic, treating the location and its inhabitants as collectible, tactile objects floating in a luminous void.

### 1. Typography Layer (Header)
- **Primary Beacon Name**: "PRESIDIO TUNNEL TOPS"
  - *Style*: High-contrast Serif (Times New Roman / Garamond esque), Uppercase.
  - *Effect*: Pure white emission `(#FFFFFF)`.
  - *Placement*: Centered top.
- **Beacon Nickname / Vibe**: "The Sunday Reset"
  - *Style*: Modern Sans-Serif (Inter/Roboto), Bold.
  - *Effect*: Cyan/Electric Blue glow `(#00E5FF)`.
  - *Placement*: Centered immediately below the header.

### 2. The "Sticker" Composition (Hero Section)
This is the core visual anchor. It is not a standard rectangular card, but a layered composition of irregular shapes with "die-cut" white borders.

- **Layer A (Background Anchor): The Beacon Image**
  - *Content*: Isometric view of the location (Presidio Tunnel Tops).
  - *Styling*:
    - **Die-cut Border**: Thick solid white stroke surrounds the irregular shape of the land.
    - **Drop Shadow**: Soft, diffused shadow to lift it off the dark background.
  - *Position*: Centered, occupying the majority of the mid-space.

- **Layer B (Foreground Overlay): The Crowd/Memories**
  - *Content*: A cluster of playful, colorful avatars (egg-shaped characters).
  - *Styling*:
    - **Die-cut Border**: Matches the Beacon Image (thick white stroke).
    - **Overlap**: Physically overlaps the bottom-left corner of the Beacon Image, creating depth (Z-axis layering).
  - *Metaphor*: "The people make the place." The crowd is physically attached to the location sticker.

### 3. Metadata & Tags
- **Crowd Labels**: "Families", "Wellness Crowd"
  - *Style*: Pill-shaped containers.
  - *Visuals*: Translucent black fill, Cyan border `1px`, Cyan text.
  - *Placement*: To the right of the Crowd sticker, tucked under the Beacon sticker or aligned with the "Ground".

### 4. Narrative Footer
- **Description Text**: "The new 'Central Park' of SF. Where the city remembers why they pay the rent by looking at the bridge."
  - *Style*: Sans-Serif, variable width (readable).
  - *Color*: Off-white / Light Grey `(#E0E0E0)` to recede slightly behind the title.
  - *Layout*: Block text, distinct from the header.

---

## II. Component Architecture (HTML/CSS Strategy)

To implement this "Sticker Structure" in code:

### Container: `.beacon-detail-card`
- **Background**: Dark, glass-morphic surface or deep void (black/midnight blue).
- **Layout**: Flex/Grid vertical stack.

### Visual Assembly (`.sticker-assembly`)
Use a relative container to handle the absolute positioning of the overlapping stickers.

```html
<div class="sticker-assembly">
  <!-- The Location -->
  <img src="beacon-iso-map.png" class="sticker-layer layer-back" />
  
  <!-- The Crowd (Overlapping) -->
  <img src="crowd-cluster.png" class="sticker-layer layer-front" />
</div>
```

**CSS Effects:**
- `filter: drop-shadow(0px 4px 12px rgba(0,0,0,0.5));` for depth.
- `mask-image` or PNG transparency is crucial for the irregular shapes.
- **The "Sticker Stroke"**: Since we likely have rectangular images, we might simulate the white border using CSS `clip-path` (complex) or simply ensure the assets themselves have the white stroke baked in (simplest for high fidelity). *Assumption based on image: The white stroke is likely part of the asset or generated via a specific filter.*

### Animations (The "Aris" Touch)
- **Entrance**: The Beacon sticker slides in, followed by the Crowd sticker "slapping" onto it with a slight bounce.
- **Hover**:
  - Hovering the Crowd sticker scales it up slightly (1.05x).
  - Hovering the Beacon name adds a subtle glow bloom.

## III. Data Schema Map
For the `Beacon` data object, we need:

```json
{
  "id": "presidio-tunnel-tops",
  "name": "PRESIDIO TUNNEL TOPS",
  "nickname": "The Sunday Reset",
  "visuals": {
    "beacon_iso": "url/to/iso-map.png",
    "crowd_cluster": "url/to/avatars.png"
  },
  "tags": ["Families", "Wellness Crowd"],
  "description": "The new 'Central Park' of SF..."
}
```
