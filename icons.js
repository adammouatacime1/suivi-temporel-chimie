/**
 * SVG drawings copied exactly from lucide-react 0.468.0.
 * ISC; copyright Lucide Contributors / portions Feather.
 * See design-kit/ICON-LICENSE. React rendering keys are omitted from SVG.
 */
const drawings = {
  "flask-conical": [
    [
      "path",
      {
        "d": "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"
      }
    ],
    [
      "path",
      {
        "d": "M6.453 15h11.094"
      }
    ],
    [
      "path",
      {
        "d": "M8.5 2h7"
      }
    ]
  ],
  "moon": [
    [
      "path",
      {
        "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }
    ]
  ],
  "sun": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "4"
      }
    ],
    [
      "path",
      {
        "d": "M12 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v2"
      }
    ],
    [
      "path",
      {
        "d": "m4.93 4.93 1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "m17.66 17.66 1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "M2 12h2"
      }
    ],
    [
      "path",
      {
        "d": "M20 12h2"
      }
    ],
    [
      "path",
      {
        "d": "m6.34 17.66-1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "m19.07 4.93-1.41 1.41"
      }
    ]
  ],
  "menu": [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ],
  "printer": [
    [
      "path",
      {
        "d": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      }
    ],
    [
      "path",
      {
        "d": "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"
      }
    ],
    [
      "rect",
      {
        "x": "6",
        "y": "14",
        "width": "12",
        "height": "8",
        "rx": "1"
      }
    ]
  ],
  "file-down": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4"
      }
    ],
    [
      "path",
      {
        "d": "M12 18v-6"
      }
    ],
    [
      "path",
      {
        "d": "m9 15 3 3 3-3"
      }
    ]
  ],
  "book-open": [
    [
      "path",
      {
        "d": "M12 7v14"
      }
    ],
    [
      "path",
      {
        "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ]
  ],
  "chart-no-axes-combined": [
    [
      "path",
      {
        "d": "M12 16v5"
      }
    ],
    [
      "path",
      {
        "d": "M16 14v7"
      }
    ],
    [
      "path",
      {
        "d": "M20 10v11"
      }
    ],
    [
      "path",
      {
        "d": "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
      }
    ],
    [
      "path",
      {
        "d": "M4 18v3"
      }
    ],
    [
      "path",
      {
        "d": "M8 14v7"
      }
    ]
  ],
  "play": [
    [
      "polygon",
      {
        "points": "6 3 20 12 6 21 6 3"
      }
    ]
  ],
  "pause": [
    [
      "rect",
      {
        "x": "14",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "x": "6",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ]
  ],
  "rotate-ccw": [
    [
      "path",
      {
        "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    [
      "path",
      {
        "d": "M3 3v5h5"
      }
    ]
  ],
  "chevron-right": [
    [
      "path",
      {
        "d": "m9 18 6-6-6-6"
      }
    ]
  ]
};

/** Decorative Lucide SVG; its surrounding control supplies the accessible name. */
export function icon(name, size = 18) {
  const drawing = drawings[name];
  if (!drawing) throw new TypeError(`Unknown Lucide icon: ${name}`);
  const numericSize = Number(size);
  const dimension = Number.isFinite(numericSize) && numericSize > 0 ? numericSize : 18;
  const children = drawing.map(([tag, attrs]) => '<' + tag + ' ' + Object.entries(attrs).map(([key, value]) => key + '="' + value + '"').join(' ') + '/>').join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${name} lk-icon" aria-hidden="true" focusable="false">${children}</svg>`;
}
