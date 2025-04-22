// Kontaktformular Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Button in Ladezustand versetzen
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            // Formulardaten sammeln
            const formData = new FormData(contactForm);
            
            // AJAX-Anfrage senden
            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showFormStatus(data.message, 'success');
                    contactForm.reset();
                } else {
                    showFormStatus(data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormStatus('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
            })
            .finally(() => {
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            });
        });
    }
    
    // Statusnachricht anzeigen
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        // Status nach 5 Sekunden ausblenden, wenn es eine Erfolgsmeldung ist
        if (type === 'success') {
            setTimeout(function() {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
});