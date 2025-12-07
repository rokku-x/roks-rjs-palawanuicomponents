#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const componentsDir = path.join(__dirname, '..', 'src', 'components');
const targetHeight = process.argv[2] ? parseInt(process.argv[2], 10) : 1000;

async function processComponents() {
    let entries;
    try {
        entries = await fs.promises.readdir(componentsDir, { withFileTypes: true });
    } catch (err) {
        console.error('Failed to read components directory:', err);
        process.exit(1);
    }

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const compDir = path.join(componentsDir, entry.name);
        const svgPath = path.join(compDir, 'index.svg');
        const pngPath = path.join(compDir, 'index.png');

        try {
            await fs.promises.access(svgPath);
        } catch (err) {
            // no svg for this component
            continue;
        }

        try {
            const svgBuffer = await fs.promises.readFile(svgPath);
            await sharp(svgBuffer)
                .resize({ height: targetHeight })
                .png({ quality: 90 })
                .toFile(pngPath);
            console.log(`Generated ${path.relative(process.cwd(), pngPath)}`);
        } catch (err) {
            console.error(`Failed to generate PNG for ${entry.name}:`, err);
        }
    }
}

processComponents();
