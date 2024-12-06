function createExportButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = "absolute top-10 right-4 flex gap-2";

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = "relative";

    const exportButton = document.createElement('button');
    exportButton.className = "bg-[#3D444D] text-white px-3 py-3 rounded-md hover:bg-[#4D545D] transition-colors text-sm flex items-center gap-2";
    exportButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    `;

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2D343B] ring-1 ring-black ring-opacity-5 hidden";
    dropdownMenu.innerHTML = `
        <div class="py-1" role="menu">
            <button id="pngExportOption" class="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3D444D] disabled:opacity-50 disabled:cursor-not-allowed" role="menuitem">
                Export Graph as PNG
            </button>
            <button id="scheduleExportOption" class="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3D444D] disabled:opacity-50 disabled:cursor-not-allowed" role="menuitem">
                Export Schedule
            </button>
        </div>
    `;

    exportButton.onclick = () => {
        dropdownMenu.classList.toggle('hidden');
    };

    document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    dropdownContainer.appendChild(exportButton);
    dropdownContainer.appendChild(dropdownMenu);
    buttonContainer.appendChild(dropdownContainer);

    // Advanced Settings Button
    const advancedSettingsBtn = document.querySelector('[onclick="toggleAdvancedSettings()"]');
    advancedSettingsBtn.className = "bg-[#3D444D] text-white px-3 py-3 rounded-md hover:bg-[#4D545D] transition-colors text-sm flex items-center gap-2";
    advancedSettingsBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
    `;

    buttonContainer.appendChild(advancedSettingsBtn);
    const container = document.querySelector('.container');
    container.appendChild(buttonContainer);

    document.getElementById('pngExportOption').onclick = exportToPNG;
    document.getElementById('scheduleExportOption').onclick = exportToReadme;
}

function exportToPNG() {
    const cellContainer = document.getElementById("cellContainer");

    html2canvas(cellContainer, {
        backgroundColor: "#202830",
        scale: 2,
    }).then(canvas => {
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'contribution-pattern.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    });
}

function enableExportButton() {
    const scheduleExportOption = document.getElementById('scheduleExportOption');
    const pngExportOption = document.getElementById('pngExportOption');
    if (!scheduleExportOption || !pngExportOption) return;
    
    const randomToggle = document.getElementById('randomToggle');
    
    if (randomToggle.checked) {
        scheduleExportOption.disabled = true;
        scheduleExportOption.classList.add('opacity-50', 'cursor-not-allowed');
        pngExportOption.disabled = false;
        pngExportOption.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        scheduleExportOption.disabled = false;
        pngExportOption.disabled = false;
        scheduleExportOption.classList.remove('opacity-50', 'cursor-not-allowed');
        pngExportOption.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

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

    let readmeContent = `# GitHub Contribution Pattern Generator\n\n`;
    readmeContent += `**Selected Year:** ${year}\n`;
    readmeContent += `**Pattern:** ${pattern}\n\n`;
    readmeContent += `**Total Contribution Days Required:** ${contributionDates.length}\n\n`;
    readmeContent += `| Date | Day |\n`;
    readmeContent += `|------|-----|\n`;
    
    contributionDates.forEach(({ dateStr, day }) => {
        readmeContent += `| ${dateStr} | ${day} |\n`;
    });

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

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
    createExportButtons();
    const randomToggle = document.getElementById('randomToggle');
    if (randomToggle) {
        randomToggle.addEventListener('change', enableExportButton);
    }
});


