// DEVSLAYER Phase 2 — centralized 3D destination registry.
// Single source of truth for positions, palette, and beacons.
// Phase 3 will add camera poses + camera director here (no duplicated logic).

export const WORLD = {
  // Gentle dusk that lets all five palettes read against one sky.
  sky: '#1C2942',
  fog: { color: '#1C2942', near: 75, far: 190 },
  ground: '#284B46',
};

export const DESTINATIONS_3D = [
  {
    id: 'origins',
    label: 'Origins',
    position: [0, 0, 24],
    accent: '#E6B566',
    mood: 'Forest greens, warm amber lanterns, soft mist.',
  },
  {
    id: 'training',
    label: 'Training',
    position: [-27, 0, 5],
    accent: '#5DADE2',
    mood: 'Stone greys, teal, waterfall blues, focused daylight.',
  },
  {
    id: 'missions',
    label: 'Missions',
    position: [27, 0, 5],
    accent: '#E6B566',
    mood: 'Warm village windows, wood browns, lantern amber.',
  },
  {
    id: 'trials',
    label: 'Trials',
    position: [0, 0, -16],
    accent: '#C98F9A',
    mood: 'Indigo slate, muted rose accents, stronger fog.',
  },
  {
    id: 'summit',
    label: 'Summit',
    position: [0, 9, -38],
    accent: '#F4D47C',
    mood: 'Pale gold sunrise above calm clouds.',
  },
];

export const destinationById = (id) => DESTINATIONS_3D.find((d) => d.id === id);

export default DESTINATIONS_3D;
