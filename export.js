// Create and add export button next to advanced settings button
function createExportButton() {
    const exportButton = document.createElement('button');
    exportButton.className = "absolute top-10 right-3 bg-[#3D444D] text-white px-3 py-3 rounded-md hover:bg-[#4D545D] transition-colors text-sm flex items-center gap-2 opacity-50 cursor-not-allowed";
    exportButton.onclick = exportToReadme;
    exportButton.disabled = true;
    exportButton.id = 'exportButton';
    
    // Add download SVG icon
    exportButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    `;

    // Adjust advanced settings button position
    const advancedSettingsBtn = document.querySelector('[onclick="toggleAdvancedSettings()"]');
    advancedSettingsBtn.style.right = '3.5rem';

    // Add export button to the container
    const container = document.querySelector('.container');
    container.appendChild(exportButton);
}

// Update the enableExportButton function
function enableExportButton() {
    const exportButton = document.getElementById('exportButton');
    if (!exportButton) return;
    
    const randomToggle = document.getElementById('randomToggle');
    
    if (randomToggle.checked) {
        exportButton.disabled = true;
        exportButton.className = "absolute top-10 right-3 bg-[#3D444D] text-white px-3 py-3 rounded-md hover:bg-[#4D545D] transition-colors text-sm flex items-center gap-2 opacity-50 cursor-not-allowed";
    } else {
        exportButton.disabled = false;
        exportButton.className = "absolute top-10 right-3 bg-[#3D444D] text-white px-3 py-3 rounded-md hover:bg-[#4D545D] transition-colors text-sm flex items-center gap-2";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    createExportButton();
    const randomToggle = document.getElementById('randomToggle');
    if (randomToggle) {
        randomToggle.addEventListener('change', enableExportButton);
    }
});

function exportToReadme() {
    const year = document.getElementById("yearInput").value;
    const pattern = document.getElementById("textInput").value.toUpperCase();
    const maxIntensity = document.getElementById("maxIntensity").value;

    // Get contribution data from the graph
    const contributionDates = [];
    const cells = document.querySelectorAll('#graphContainer .group');
    
    cells.forEach(cell => {
        const tooltip = cell.querySelector('div').textContent;
        if (tooltip.includes("Pattern cell")) {
            const dateStr = tooltip.split(" on ")[1];
            const date = new Date(dateStr);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            contributionDates.push({
                date: date,
                dateStr: date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                }),
                day: day
            });
        }
    });

    // Sort dates in ascending order
    contributionDates.sort((a, b) => a.date - b.date);

    // Generate README content
    let readmeContent = `# GitHub Contribution Pattern Generator\n\n`;
    readmeContent += `**Selected Year:** ${year}\n`;
    readmeContent += `**Pattern:** ${pattern}\n\n`;
    readmeContent += `**Total Contribution Days Required:** ${contributionDates.length}\n\n`;
    readmeContent += `| Date | Day |\n`;
    readmeContent += `|------|-----|\n`;
    
    contributionDates.forEach(({ dateStr, day }) => {
        readmeContent += `| ${dateStr} | ${day} |\n`;
    });

    // Create and download the README file
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CONTRIBUTION_PATTERN_${pattern}_${year}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

