// Dark mode toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const icon = modeToggle.querySelector('i');


modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Card filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('cardFilterInput');
    
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            const filterValue = this.value.toLowerCase().trim();
            
           
            filterElements('.card', filterValue);
            filterElements('.project-card', filterValue);
            
            
            checkEmptySections();
        });
    }
    
    
    function filterElements(selector, filterValue) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            
            if (text.includes(filterValue)) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    }
    
    
    function checkEmptySections() {
        const sections = document.querySelectorAll('section.cards, section.Projects');
        
        sections.forEach(section => {
            const cards = section.querySelectorAll('.card, .project-card');
            let visibleCards = 0;
            
            cards.forEach(card => {
                if (card.style.display !== 'none') {
                    visibleCards++;
                }
            });
            
            // If no visible cards in section, hide the section
            if (visibleCards === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });
    }
});

// Simple Learning Goals
document.addEventListener('DOMContentLoaded', () => {
    const progressBtn = document.getElementById('progressBtn');
    const clearBtn = document.getElementById('clearBtn');
    const progressBar = document.getElementById('progressBar');
    const goalInput = document.getElementById('goalInput');
    const progressInput = document.getElementById('progressInput');
    
    let progress = 0;
    
    // Load saved progress
    const savedProgress = localStorage.getItem('goalProgress');
    const savedGoal = localStorage.getItem('goalText');
    
    if (savedProgress) {
        progress = parseInt(savedProgress);
        progressBar.style.width = `${progress}%`;
        progressBtn.textContent = `Update Progress (${progress}%)`;
        progressInput.value = progress;
    }
    
    if (savedGoal) {
        goalInput.value = savedGoal;
    }
    
    progressBtn.addEventListener('click',()=>
    {
        const inputValue = parseInt(progressInput.value)
        if(!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100)
        {
            progress = inputValue
            progressBar.style.width = `${progress}%`;
            progressBtn.textContent = `Update Progress (${progress}%)`;
            localStorage.setItem('goalProgress', progress);
        }
    })

    // Clear progress when clear button is clicked
    clearBtn.addEventListener('click', () => {
        progress = 0;
        progressBar.style.width = '0%';
        progressBtn.textContent = 'Update Progress (0%)';
        goalInput.value = '';
        progressInput.value = '';
        localStorage.removeItem('goalProgress');
        localStorage.removeItem('goalText');
    });
    
    // Save goal text when it changes
    goalInput.addEventListener('input', () => {
        localStorage.setItem('goalText', goalInput.value);
    });
}); 