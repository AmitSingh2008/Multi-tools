document.addEventListener('DOMContentLoaded', function() {
    // Tool data - would normally come from an API or JSON file
    const tools = [
        {
            id: 'image-to-png',
            title: 'Image to PNG Converter',
            description: 'Convert any image to PNG format',
            category: 'image',
            icon: 'image-to-png.png',
            url: 'tools/image/image-to-png.html'
        },
        // ... all other tools
    ];
    
    const categories = [
        { id: 'image', name: 'Image Tools' },
        { id: 'seo', name: 'SEO Tools' },
        // ... all other categories
    ];
    
    // Render categories and tools
    function renderTools() {
        const container = document.getElementById('categories-container');
        
        categories.forEach(category => {
            const categoryTools = tools.filter(tool => tool.category === category.id);
            
            if (categoryTools.length > 0) {
                const categoryHTML = `
                    <div class="category mb-5" id="${category.id}-tools">
                        <h2 class="mb-4">${category.name}</h2>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                            ${categoryTools.map(tool => `
                                <div class="col">
                                    <div class="card tool-card h-100">
                                        <div class="card-body">
                                            <img src="assets/images/tool-icons/${tool.icon}" alt="${tool.title}" class="tool-icon mb-3">
                                            <h5 class="card-title">${tool.title}</h5>
                                            <p class="card-text">${tool.description}</p>
                                            <a href="${tool.url}" class="btn btn-sm btn-outline-primary stretched-link">Use Tool</a>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                
                container.innerHTML += categoryHTML;
            }
        });
    }
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', searchTools);
    document.getElementById('tool-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchTools();
    });
    
    function searchTools() {
        const searchTerm = document.getElementById('tool-search').value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            document.querySelectorAll('.tool-card').forEach(card => {
                card.style.display = '';
            });
            return;
        }
        
        document.querySelectorAll('.tool-card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Initialize
    renderTools();
});