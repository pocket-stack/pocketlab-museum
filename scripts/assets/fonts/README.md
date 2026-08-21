# OG card fonts

The build-time social-card renderer uses the same type pairing as the site and
loads these files directly so output does not depend on fonts installed on the
build host.

| Files | Source | Licence |
| --- | --- | --- |
| `SpaceGrotesk-Variable.ttf` | [floriankarsten/space-grotesk](https://github.com/floriankarsten/space-grotesk/blob/master/fonts/ttf/SpaceGrotesk%5Bwght%5D.ttf) | SIL Open Font License 1.1 (`SpaceGrotesk-OFL.txt`) |
| `IBMPlexMono-Regular.otf`, `IBMPlexMono-SemiBold.otf` | [IBM/plex](https://github.com/IBM/plex/tree/master/packages/plex-mono/fonts/complete/otf) | SIL Open Font License 1.1 (`IBMPlexMono-OFL.txt`) |

These are build inputs only; the generated PNGs contain rasterized glyphs, not
embedded font programs.
