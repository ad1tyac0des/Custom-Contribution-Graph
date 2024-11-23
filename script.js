// Configuration options
const CONFIG = {
    cellSize: 15,
    cellGap: 2,
    minYear: 1900,
    maxYear: 9999,
    gridColors: [
        'bg-[#161b22]',
        'bg-[#0e4429]',
        'bg-[#006d32]',
        'bg-[#26a641]',
        'bg-[#39d353]'
    ],
    monthLabelsPadding: 30,
    patternGridSize: 5,    // Size of each character pattern
    patternSpacing: 1,     // Spacing between patterns
    marginCols: 1,         // Margin columns on each side
    marginRows: 1,         // Margin rows on top/bottom
    patternAlignment: 'center',  // Can be 'left', 'center', or 'right'
};

// Add your patterns object here
const patterns = {
    // Numbers (keeping existing patterns)
    '0': [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]],
    '1': [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
    '2': [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1]],
    '3': [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],
    '4': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],
    '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],
    '6': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],
    '7': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0]],
    '8': [[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],
    '9': [[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],
    
    // Letters
    'A': [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    'B': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
    'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
    'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
    'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
    'F': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
    'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[0,1,1,1,0]],
    'H': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
    'J': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,0,1,0,0],[0,1,0,0,0]],
    'K': [[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
    'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
    'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
    'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    'P': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
    'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
    'R': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],
    'S': [[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
    'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
    'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
    'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
    'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    'Z': [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
    
    // Special Characters
    '!': [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
    '@': [[0,1,1,1,0],[1,0,1,0,1],[1,0,1,1,1],[1,0,0,0,0],[0,1,1,1,1]],
    '#': [[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]],
    '$': [[0,1,1,1,1],[1,0,1,0,0],[0,1,1,1,0],[0,0,1,0,1],[1,1,1,1,0]],
    '%': [[1,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,1]],
    '&': [[0,1,1,0,0],[1,0,0,1,0],[0,1,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
    '*': [[1,0,1,0,1],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[1,0,1,0,1]],
    '+': [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]],
    '-': [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],
    '=': [[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0]],
    '/': [[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0]],
    '?': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0]],
    '.': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0]],
    ',': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,1,0,0,0]],
    ':': [[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0]],
    '(': [[0,0,1,1,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,0,1,1,0]],
    ')': [[0,1,1,0,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,1,1,0,0]],
    '[': [[0,1,1,1,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,1,1,0]],
    ']': [[0,1,1,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,1,1,1,0]],
    '{': [[0,0,1,1,0],[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,1,0]],
    '}': [[0,1,1,0,0],[0,0,1,0,0],[0,0,1,1,0],[0,0,1,0,0],[0,1,1,0,0]],
    '<': [[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0]],
    '>': [[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0]],
    ';': [[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,1,0,0,0]],
    '_': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]],
};

function calculateMaxChars(totalWeeks) {
    const usableWeeks = totalWeeks - (2 * CONFIG.marginCols);
    return Math.floor(usableWeeks / (CONFIG.patternGridSize + CONFIG.patternSpacing));
}

function calculatePatternStartColumn(totalWeeks, textLength) {
    const usableWeeks = totalWeeks - (2 * CONFIG.marginCols);
    const totalPatternWidth = textLength * (CONFIG.patternGridSize + CONFIG.patternSpacing) - CONFIG.patternSpacing;
    
    switch (CONFIG.patternAlignment) {
        case 'left':
            return CONFIG.marginCols;
        case 'right':
            return totalWeeks - CONFIG.marginCols - totalPatternWidth;
        case 'center':
        default:
            return Math.floor((usableWeeks - totalPatternWidth) / 2) + CONFIG.marginCols;
    }
}

function generateGraph() {
    const graphContainer = document.getElementById('graphContainer');
    const maxCharsInfo = document.getElementById('maxCharsInfo');
    graphContainer.innerHTML = '';
    
    const yearInput = document.getElementById('yearInput');
    const textInput = document.getElementById('textInput');
    const year = parseInt(yearInput.value);
    const text = textInput.value.toUpperCase();
    
    if (isNaN(year) || year < CONFIG.minYear || year > CONFIG.maxYear) {
        alert('Please enter a valid year between 1900 and 9999');
        return;
    }
    
    createContributionGraph(year, text);
}

function createContributionGraph(year, text) {
    const container = document.getElementById('graphContainer');
    const maxCharsInfo = document.getElementById('maxCharsInfo');
    
    // Create month labels container
    const monthsContainer = document.createElement('div');
    monthsContainer.className = 'relative flex h-8 mx-8 mb-2 text-sm text-gray-400';
    monthsContainer.style.paddingLeft = `${CONFIG.monthLabelsPadding}px`;
    
    const startDate = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    const firstDayOfWeek = startDate.getDay();
    const totalWeeks = Math.ceil((lastDay - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
    
    // Calculate and display max chars
    const maxChars = calculateMaxChars(totalWeeks);
    maxCharsInfo.textContent = `Maximum ${maxChars} characters allowed`;
    
    // Validate input length
    if (text.length > maxChars) {
        alert(`Maximum ${maxChars} characters allowed for the current view`);
        text = text.substring(0, maxChars);
    }

    // Create contribution matrix
    const contributionMatrix = Array(7).fill().map(() => Array(totalWeeks).fill(0));
    
    // Calculate starting column based on alignment
    const startingColumn = calculatePatternStartColumn(totalWeeks, text.length);
    
    // Fill pattern for each character
    text.split('').forEach((char, charIndex) => {
        if (!patterns[char]) {
            console.warn(`Pattern not found for character: ${char}`);
            return;
        }

        const pattern = patterns[char];
        const startCol = startingColumn + charIndex * (CONFIG.patternGridSize + CONFIG.patternSpacing);
        
        // Apply pattern
        for (let row = 0; row < CONFIG.patternGridSize; row++) {
            for (let col = 0; col < CONFIG.patternGridSize; col++) {
                const matrixRow = row + CONFIG.marginRows;
                const matrixCol = col + startCol;
                if (matrixCol < totalWeeks) { // Ensure we don't exceed grid bounds
                    contributionMatrix[matrixRow][matrixCol] = pattern[row][col] ? 4 : 0;
                }
            }
        }
    });

    // Create month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthPositions = [];
    for (let month = 0; month < 12; month++) {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysSinceStart = (firstDayOfMonth - startDate) / (24 * 60 * 60 * 1000);
        const weekIndex = Math.floor((daysSinceStart + firstDayOfWeek) / 7);
        
        monthPositions.push({
            month: month,
            weekIndex: weekIndex
        });
    }
    
    monthPositions.forEach((position) => {
        const monthLabel = document.createElement('div');
        monthLabel.className = 'absolute top-0';
        monthLabel.textContent = months[position.month];
        monthLabel.style.left = `${position.weekIndex * (CONFIG.cellSize + CONFIG.cellGap) + 2}px`;
        monthsContainer.appendChild(monthLabel);
    });
    
    container.appendChild(monthsContainer);

    // Create the contribution grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-rows-7 grid-flow-col';
    grid.style.gap = `${CONFIG.cellGap}px`;

    // Generate cells using contribution matrix
    for (let col = 0; col < totalWeeks; col++) {
        for (let row = 0; row < 7; row++) {
            if (col === 0 && row < firstDayOfWeek) {
                const emptyCell = document.createElement('div');
                emptyCell.style.width = `${CONFIG.cellSize}px`;
                emptyCell.style.height = `${CONFIG.cellSize}px`;
                grid.appendChild(emptyCell);
                continue;
            }

            const dayOffset = row - firstDayOfWeek + (col * 7);
            const cellDate = new Date(year, 0, 1 + dayOffset);
            
            if (cellDate.getFullYear() === year) {
                const cell = document.createElement('div');
                cell.style.width = `${CONFIG.cellSize}px`;
                cell.style.height = `${CONFIG.cellSize}px`;
                
                // Use contribution level from matrix
                const contributionLevel = contributionMatrix[row][col];
                cell.className = `${CONFIG.gridColors[contributionLevel]} rounded-sm hover:ring-1 hover:ring-gray-400 relative group`;
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-[#1b1f23] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-10';
                
                const formattedDate = cellDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                
                tooltip.textContent = `${contributionLevel > 0 ? 'Pattern cell' : 'No contribution'} on ${formattedDate}`;
                
                const arrow = document.createElement('div');
                arrow.className = 'absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1b1f23]';
                tooltip.appendChild(arrow);
                
                cell.appendChild(tooltip);
                grid.appendChild(cell);
            } else {
                const emptyCell = document.createElement('div');
                emptyCell.style.width = `${CONFIG.cellSize}px`;
                emptyCell.style.height = `${CONFIG.cellSize}px`;
                grid.appendChild(emptyCell);
            }
        }
    }
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'flex';
    gridContainer.appendChild(createDaysLabels());
    gridContainer.appendChild(grid);
    
    container.appendChild(monthsContainer);
    container.appendChild(gridContainer);
}

function createDaysLabels() {
    const daysContainer = document.createElement('div');
    daysContainer.className = 'flex flex-col text-sm text-gray-400 pr-2';
    daysContainer.style.width = `${CONFIG.monthLabelsPadding}px`;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((day) => {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'text-xs mb-[2px]';
        dayLabel.style.height = `${CONFIG.cellSize}px`;
        dayLabel.style.lineHeight = `${CONFIG.cellSize}px`;
        if (day === 'Mon' || day === 'Wed' || day === 'Fri') {
            dayLabel.textContent = day;
        }
        daysContainer.appendChild(dayLabel);
    });
    
    return daysContainer;
}

// Initialize with current year when page loads
document.addEventListener('DOMContentLoaded', () => {
    generateGraph();
});
