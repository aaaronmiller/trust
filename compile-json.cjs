const fs = require('fs');
const path = require('path');

const markdownContent = fs.readFileSync(path.join(__dirname, 'research/master_consolidated_research.md'), 'utf8');

// The markdown file has a structure like:
// ## 1. 529 Plans & Full Scholarships
// - **The Rule**: If a 529 beneficiary receives a full-ride scholarship...
// - **The Tax Hit**: While the penalty is waived...

const lines = markdownContent.split('\n');

const data = [];
let currentItem = null;
let currentBatch = 1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('# Trust Intelligence Dashboard')) {
        currentBatch++;
        continue;
    }

    if (line.startsWith('## ')) {
        if (currentItem) {
            data.push(currentItem);
        }
        currentItem = {
            id: currentBatch + '-' + data.length,
            title: line.replace(/^## \d+\. /, '').replace(/^## /, '').trim(),
            points: []
        };
    } else if (line.startsWith('- **') || line.startsWith('- ')) {
        if (currentItem) {
            currentItem.points.push(line.replace(/^- /, '').trim());
        }
    } else if (currentItem && !line.startsWith('#')) {
         // continuation of previous point or context
         if (currentItem.points.length > 0) {
              currentItem.points[currentItem.points.length - 1] += ' ' + line;
         } else {
              currentItem.points.push(line);
         }
    }
}

if (currentItem) {
    data.push(currentItem);
}

const outputPath = path.join(__dirname, 'trust-visualizer/src/lib/data');
if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { recursive: true });
}
fs.writeFileSync(path.join(outputPath, 'research_db.json'), JSON.stringify({ database: data }, null, 2));

console.log(`Successfully compiled ${data.length} main research categories into research_db.json`);
