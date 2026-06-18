document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de la Pantalla de Inicio y Audio ---
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const envelope = document.getElementById('envelope');
    const bgAudio = document.getElementById('bg-music');
    const effectAudio = document.getElementById('open-effect');
    const pauseBtn = document.getElementById('pause-btn');
    const bgVideo = document.getElementById('bg-video');

    envelope.addEventListener('click', () => {
        // Reproducir efecto del sobre
        effectAudio.play().catch(err => console.log("Effect play failed:", err));
        
        // Animar el sobre abriéndose
        envelope.classList.add('open');
        
        // Transición de pantallas
        setTimeout(() => {
            introScreen.classList.remove('active');
            introScreen.classList.add('hidden');
            
            setTimeout(() => {
                introScreen.style.display = 'none';
                mainScreen.style.display = 'flex';
                
                // Un pequeño delay para que la clase de animación funcione bien
                setTimeout(() => {
                    mainScreen.classList.remove('hidden');
                    mainScreen.classList.add('active');
                }, 50);
            }, 500);

            // Reproducir música (solo se puede iniciar con interacción del usuario)
            bgAudio.play().then(() => {
                pauseBtn.style.display = 'block';
            }).catch(err => console.log("Audio play failed:", err));
            
            // Asegurarnos que el video corra
            if (bgVideo && bgVideo.paused) {
                bgVideo.play().catch(err => console.log("Video play failed:", err));
            }

        }, 1500); // Darle tiempo a la animación del sobre
    });

    // Controlar pausa/reproducción
    pauseBtn.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play();
            pauseBtn.textContent = '⏸️';
        } else {
            bgAudio.pause();
            pauseBtn.textContent = '▶️';
        }
    });

    // --- Lógica del Contador ---
    // Fecha objetivo: 27 de junio de 2026 a las 19:00 (7:00 PM)
    const targetDate = new Date('June 27, 2026 19:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<p>¡El evento ha comenzado!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Partículas Animadas en el Fondo ---
    function createParticles() {
        const screens = document.querySelectorAll('.particles');
        
        screens.forEach(container => {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle-dot');
                
                // Propiedades aleatorias
                const size = Math.random() * 4 + 1; // 1px a 5px
                const left = Math.random() * 100; // 0% a 100%
                const duration = Math.random() * 10 + 5; // 5s a 15s
                const delay = Math.random() * 5; // 0s a 5s

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${left}%`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                // Box shadow dorado para que brille
                particle.style.boxShadow = `0 0 ${size * 2}px rgba(212, 175, 55, 0.8)`;

                container.appendChild(particle);
            }
        });
    }

    createParticles();
});