document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeToggle) themeToggle.checked = true;
    }

    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    // Handle Active Navigation Link matching current page URL
    const navLinks = document.querySelectorAll('.nav-links a.nav-item');
    const currentPath = window.location.pathname.toLowerCase();
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').toLowerCase();
        const cleanLinkPath = linkPath.replace('.html', '');
        
        if (
            (currentPath.endsWith(linkPath)) || 
            (currentPath.endsWith(cleanLinkPath)) ||
            (currentPath === '/' && cleanLinkPath === 'index') ||
            (currentPath.endsWith('/') && cleanLinkPath === 'index')
        ) {
            link.classList.add('active');
        }
    });

    // Dynamic Typing Effect for Skills on Home Page
    const skillElement = document.getElementById('dynamic-skill');
    if (skillElement) {
        const skills = [
            { text: "Java", color: "#f89820" },
            { text: "Python", color: "#3776ab" },
            { text: "Problem Solving", color: "#22c55e" },
            { text: "Web Technologies", color: "#a855f7" },
            { text: "Backend Development", color: "#22d3ee" },
            { text: "AI Integrations", color: "#ef4444" }
        ];
        let currentSkill = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = skills[currentSkill];
            if (isDeleting) {
                skillElement.textContent = current.text.substring(0, charIndex - 1);
                charIndex--;
            } else {
                skillElement.textContent = current.text.substring(0, charIndex + 1);
                charIndex++;
                skillElement.style.color = current.color;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === current.text.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentSkill = (currentSkill + 1) % skills.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }
});
