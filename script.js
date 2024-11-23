// Configuration options
const CONFIG = {
    cellSize: 15,          // Size of each contribution cell in pixels
    cellGap: 2,           // Gap between cells in pixels
    minYear: 1900,        // Minimum allowed year
    maxYear: 9999,        // Maximum allowed year
    gridColors: [         // Colors for different contribution levels
        'bg-[#161b22]',   // Level 0 (no contributions)
        'bg-[#0e4429]',   // Level 1
        'bg-[#006d32]',   // Level 2
        'bg-[#26a641]',   // Level 3
        'bg-[#39d353]'    // Level 4
    ],
    monthLabelsPadding: 30, // Padding for month labels in pixels
};

function generateGraph() {
    // Clear previous graph
    const graphContainer = document.getElementById('graphContainer');
    graphContainer.innerHTML = '';
    
    // Get year from input
    const yearInput = document.getElementById('yearInput');
    const year = parseInt(yearInput.value);
    
    // Validate year
    if (isNaN(year) || year < CONFIG.minYear || year > CONFIG.maxYear) {
        alert('Please enter a valid year between 1900 and 9999');
        return;
    }
    
    createContributionGraph(year);
}

function createContributionGraph(year) {
    // Get the graph container
    const container = document.getElementById('graphContainer');
    
    // Create month labels container
    const monthsContainer = document.createElement('div');
    monthsContainer.className = 'relative flex h-8 mx-8 mb-2 text-sm text-gray-400';
    monthsContainer.style.paddingLeft = `${CONFIG.monthLabelsPadding}px`;
    
    // Calculate first day of the year
    const startDate = new Date(year, 0, 1);
    const firstDayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Calculate month positions
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
    
    // Create month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthPositions.forEach((position) => {
        const monthLabel = document.createElement('div');
        monthLabel.className = 'absolute top-0';
        monthLabel.textContent = months[position.month];
        monthLabel.style.left = `${position.weekIndex * (CONFIG.cellSize + CONFIG.cellGap) + 2}px`;
        monthsContainer.appendChild(monthLabel);
    });
    
    container.appendChild(monthsContainer);

    // Create main grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'flex';

    // Create days of week labels
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
    gridContainer.appendChild(daysContainer);

    // Create the contribution grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-rows-7 grid-flow-col';
    grid.style.gap = `${CONFIG.cellGap}px`;

    // Calculate total weeks in the year
    const lastDay = new Date(year, 11, 31);
    const totalWeeks = Math.ceil((lastDay - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;

    // Generate cells for the entire year
    for (let col = 0; col < totalWeeks; col++) {
        for (let row = 0; row < 7; row++) {
            // Calculate the date for this cell
            // For first week, only show days from January 1st onwards
            if (col === 0 && row < firstDayOfWeek) {
                // Empty cell before January 1st
                const emptyCell = document.createElement('div');
                emptyCell.style.width = `${CONFIG.cellSize}px`;
                emptyCell.style.height = `${CONFIG.cellSize}px`;
                grid.appendChild(emptyCell);
                continue;
            }

            // Calculate the actual date
            // row represents the day of week (0 = Sunday, 1 = Monday, etc.)
            const dayOffset = row - firstDayOfWeek + (col * 7);
            const cellDate = new Date(year, 0, 1 + dayOffset);
            
            // Only create cell if it's within the year
            if (cellDate.getFullYear() === year) {
                const cell = document.createElement('div');
                cell.style.width = `${CONFIG.cellSize}px`;
                cell.style.height = `${CONFIG.cellSize}px`;
                cell.className = `bg-[#161b22] rounded-sm hover:ring-1 hover:ring-gray-400 relative group`;
                
                // Random contribution level for demonstration
                const contributionLevel = Math.floor(Math.random() * 5);
                const contributions = contributionLevel === 0 ? 0 : Math.floor(Math.random() * 10) + 1;
                
                if (contributionLevel > 0) {
                    cell.className = `${CONFIG.gridColors[contributionLevel]} rounded-sm hover:ring-1 hover:ring-gray-400 relative group`;
                }
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-[#1b1f23] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-10';
                
                // Format date like "4 Feb 2024"
                const formattedDate = cellDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                
                tooltip.textContent = `${contributions} contributions on ${formattedDate}`;
                
                // Add arrow to tooltip
                const arrow = document.createElement('div');
                arrow.className = 'absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1b1f23]';
                tooltip.appendChild(arrow);
                
                cell.appendChild(tooltip);
                grid.appendChild(cell);
            } else {
                // Add empty space for dates outside the year
                const emptyCell = document.createElement('div');
                emptyCell.style.width = `${CONFIG.cellSize}px`;
                emptyCell.style.height = `${CONFIG.cellSize}px`;
                grid.appendChild(emptyCell);
            }
        }
    }
    
    gridContainer.appendChild(grid);
    container.appendChild(gridContainer);
}

// Initialize with current year when page loads
document.addEventListener('DOMContentLoaded', () => {
    generateGraph();
});
