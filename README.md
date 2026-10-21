# ReDT

**Resolution-Decoupled Visual Geometry Transformer**

Abteen Arab¹²*, Guile Wu¹, Dongfeng Bai¹  
¹ Huawei Noah’s Ark Lab · ² University of British Columbia

A local static project website. Open `index.html` directly; no build, installation, or external service is required. For a browser preview, run `python3 -m http.server 8765 --bind 127.0.0.1` in this folder, then open `http://127.0.0.1:8765`.

## Contents

- Technical Report and Paper resource placeholders, marked “Coming soon” until URLs are available.
- Original teaser, architecture, HD scaling figure, and two qualitative comparisons.
- Verbatim manuscript abstract and four evidence-grounded takeaways.
- CD, time, and speedup relative to VGGT for nine benchmark settings and nine methods. Standard-resolution results expand below the four HD tables.
- Manual scene carousel with scene buttons, previous/next controls, keyboard navigation, and full-resolution image links.
- Citation using the author list supplied by the project owner.

`index.html` contains the page content. `static/css/index.css` supplies responsive styling. `static/js/index.js` implements the carousel and citation copying without JavaScript dependencies. All scientific images are stored locally; lossless WebP versions load first and PNG originals remain available through the figure links. Google Fonts are optional, with local system-font fallbacks.

## Source and editorial decisions

Content comes from the supplied `ICLR_2027` manuscript and image assets. Author names and affiliations were confirmed directly by the project owner. No publication acceptance, year, author homepage, code URL, or arXiv identifier has been invented.

The result tables are the numerical source of truth where prose disagrees. CD and runtime precision is retained. Speedup is VGGT runtime divided by each method’s runtime in the same benchmark, rounded to two decimals. Bold denotes the lowest CD or time within each dataset, including ties; blue shading identifies the ReDT variants. The 20-view ETH3D scaling plot explicitly excludes task heads from runtime and memory measurements.

The original images and labels are unchanged, including the manuscript’s resolution nomenclature. The teaser’s 8.60-second example is presented as the illustrated forward pass, separately from benchmark table values. The manuscript source contains no compiled PDF and its local TeX installation lacks required packages, so no broken paper/supplementary or code buttons are displayed.

## Attribution

Built from the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), adapted from [Nerfies](https://nerfies.github.io/). Visual styling follows [VGGT-Ω](https://vggt-omega.github.io/). Website template licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); supplied research figures retain their existing rights.
