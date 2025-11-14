// scripts/resize-images.js  (FIXED)
// Run from project root: node scripts/resize-images.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// IMPORTANT: rootAssets should be ../public/assets relative to scripts/
const rootAssets = path.join(__dirname, "..", "public", "assets");
const outBase = path.join(rootAssets, "optimized");

// Which file extensions to process
const IMG_EXTS = [".jpg", ".jpeg", ".png", ".heic", ".webp", ".avif"];

const defaultSizes = [1920, 1440, 1024, 768, 480];
const smallSizes = [1024, 768, 480];

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((ent) => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return IMG_EXTS.includes(ext);
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processImage(srcFullPath) {
  try {
    const rel = path.relative(rootAssets, srcFullPath); // e.g., "Projects/BRIGHT SCHOOL/2.jpg"
    const relDir = path.dirname(rel); // "Projects/BRIGHT SCHOOL"
    const nameBase = path.basename(rel, path.extname(rel)); // "2" or "whychoose"
    const outDir = path.join(outBase, relDir, nameBase);
    await ensureDir(outDir);

    const meta = await sharp(srcFullPath).metadata();
    const originalWidth = meta.width || 1920;

    const sizes = originalWidth && originalWidth < 1200 ? smallSizes : defaultSizes;
    const usedSizes = sizes.filter((s, idx) => s <= originalWidth || idx === 0);

    for (const w of Array.from(new Set(usedSizes))) {
      const target = path.join(outDir, `${nameBase}-${w}`);
      try { await sharp(srcFullPath).resize({ width: w }).avif({ quality: 60 }).toFile(`${target}.avif`); } catch (e) { /* ignore avif errors */ }
      try { await sharp(srcFullPath).resize({ width: w }).webp({ quality: 75 }).toFile(`${target}.webp`); } catch (e) { /* ignore webp errors */ }
      try { await sharp(srcFullPath).resize({ width: w }).jpeg({ quality: 75 }).toFile(`${target}.jpg`); } catch (e) { /* ignore jpeg errors */ }
      console.log(`Wrote: ${path.relative(outBase, target)}.{avif,webp,jpg}`);
    }
  } catch (err) {
    console.error("Error processing", srcFullPath, err);
  }
}

(async () => {
  if (!fs.existsSync(rootAssets)) {
    console.error("ERROR: rootAssets not found:", rootAssets);
    process.exit(1);
  }

  console.log("Scanning:", rootAssets);
  const files = walk(rootAssets).filter((f) => isImage(f) && !f.includes(path.join("assets", "optimized")));
  console.log("Found images:", files.length);

  for (const f of files) {
    await processImage(f);
  }

  console.log("Done. Optimized images are in public/assets/optimized");
})();
