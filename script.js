/* ==========================================================================
   INTERAÇÕES E DINÂMICA - HANGAR 23
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle da Barra de Navegação no Scroll
    const header = document.querySelector('.header-nav');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Remove a classe 'scrolled' apenas se o menu mobile não estiver ativo
            if (!header.classList.contains('mobile-active')) {
                header.classList.remove('scrolled');
            }
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verifica no carregamento inicial

    // 2. Menu Hamburguer Responsivo
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const reserveBtn = document.querySelector('.nav-actions .btn-gold');

    const toggleMenu = () => {
        header.classList.toggle('mobile-active');
        if (header.classList.contains('mobile-active')) {
            header.classList.add('scrolled');
            document.body.style.overflow = 'hidden'; // Impede scroll do body com menu aberto
        } else {
            document.body.style.overflow = '';
            checkScroll();
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Fechar o menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('mobile-active')) {
                toggleMenu();
            }
        });
    });

    // 3. Efeito de Scroll Reveal & Staggering (Revelação em Cascata de Alto Padrão)
    const reveals = document.querySelectorAll('.reveal, .reveal-group');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 120; // Ativa um pouco mais cedo para fluidez
            
            if (elementTop < windowHeight - elementVisible) {
                if (element.classList.contains('reveal-group')) {
                    if (!element.classList.contains('active')) {
                        element.classList.add('active');
                        const items = element.querySelectorAll('.reveal-item');
                        items.forEach((item, index) => {
                            // Delay incremental em cascata (80ms entre itens)
                            item.style.transitionDelay = `${index * 80}ms`;
                            requestAnimationFrame(() => {
                                item.classList.add('active');
                            });
                        });
                    }
                } else {
                    element.classList.add('active');
                }
            }
        });
    };

    // Throttle simples para otimizar performance no scroll (evita reflow excessivo)
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    revealOnScroll(); // Executa uma vez no início

    // 4. Modal de Reservas Premium (Estilizado via classes no CSS)
    const createReserveModal = () => {
        const modal = document.createElement('div');
        modal.id = 'reserveModal';

        const modalContent = document.createElement('div');
        modalContent.className = 'gold-frame modal-content';

        modalContent.innerHTML = `
            <button id="closeModal" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: transparent;
                border: none;
                color: #d4af37;
                font-size: 1.5rem;
                cursor: pointer;
                transition: transform var(--transition-fast);
            " onmouseenter="this.style.transform='scale(1.2) rotate(90deg)'" onmouseleave="this.style.transform='scale(1) rotate(0)'">&times;</button>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #f4f2ec; margin-bottom: 0.5rem;">Fazer uma Reserva</h3>
            <p style="font-size: 0.85rem; color: #a3a19c; margin-bottom: 2rem; letter-spacing: 1px;">Vagas Limitadas • Experiência Exclusiva</p>
            
            <form id="reserveForm" style="display: flex; flex-direction: column; gap: 1.2rem; text-align: left;">
                <input type="text" placeholder="Nome Completo" required style="
                    padding: 0.8rem; background: #070708; border: 1px solid rgba(212,175,55,0.2); color: #f4f2ec; font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s;
                " onfocus="this.style.borderColor='#d4af37'" onblur="this.style.borderColor='rgba(212,175,55,0.2)'">
                <input type="tel" placeholder="Telefone de Contato" required style="
                    padding: 0.8rem; background: #070708; border: 1px solid rgba(212,175,55,0.2); color: #f4f2ec; font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s;
                " onfocus="this.style.borderColor='#d4af37'" onblur="this.style.borderColor='rgba(212,175,55,0.2)'">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <input type="date" required style="
                        padding: 0.8rem; background: #070708; border: 1px solid rgba(212,175,55,0.2); color: #f4f2ec; font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s;
                    " onfocus="this.style.borderColor='#d4af37'" onblur="this.style.borderColor='rgba(212,175,55,0.2)'">
                    <input type="time" required style="
                        padding: 0.8rem; background: #070708; border: 1px solid rgba(212,175,55,0.2); color: #f4f2ec; font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s;
                    " onfocus="this.style.borderColor='#d4af37'" onblur="this.style.borderColor='rgba(212,175,55,0.2)'">
                </div>
                <select required style="
                    padding: 0.8rem; background: #070708; border: 1px solid rgba(212,175,55,0.2); color: #f4f2ec; font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s;
                " onfocus="this.style.borderColor='#d4af37'" onblur="this.style.borderColor='rgba(212,175,55,0.2)'">
                    <option value="" disabled selected>Quantidade de Pessoas</option>
                    <option value="2">2 Pessoas</option>
                    <option value="4">4 Pessoas</option>
                    <option value="6">6 Pessoas</option>
                    <option value="8">8+ Pessoas (Evento Especial)</option>
                </select>
                <button type="submit" class="btn-gold" style="margin-top: 1rem; width: 100%;">Confirmar Reserva</button>
            </form>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Funções para abrir/fechar modal (agora via classe .active para melhor performance)
        const openModal = (e) => {
            if(e) e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('active');
            if (!header.classList.contains('mobile-active')) {
                document.body.style.overflow = '';
            }
        };

        // Event Listeners para fechar
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        const closeBtn = modal.querySelector('#closeModal');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        const form = modal.querySelector('#reserveForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Sua solicitação de reserva foi enviada! Entraremos em contato via telefone para confirmação.');
                closeModal();
                form.reset();
            });
        }

        // Ativa botões de reserva
        const reserveButtons = document.querySelectorAll('a[href="#reservar"], button[onclick*="reserva"], .nav-actions .btn-gold, .hero-buttons .btn-gold');
        reserveButtons.forEach(btn => {
            btn.addEventListener('click', openModal);
        });
    };

    createReserveModal();
});
