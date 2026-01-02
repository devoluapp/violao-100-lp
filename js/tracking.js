(function () {
    /**
     * Função auxiliar para disparar a conversão e redirecionar
     * Esta é a lógica que antes estava solta no HTML
     */
    function reportConversion(url) {
        const callback = function () {
            if (typeof (url) != 'undefined') {
                window.location = url;
            }
        };

        // Verifica se a tag global do Google (gtag) está carregada
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17837722215/4m0JCKCMgdsbEOeU2LlC', // Seu ID/Label de conversão
                'value': 1.0,
                'currency': 'BRL',
                'event_callback': callback
            });
            console.log('Evento de conversão disparado. Redirecionando para: ' + url);
        } else {
            // Se o Gtag falhar (ex: AdBlock), redireciona imediatamente para não perder a venda
            console.warn('Gtag não detectado. Redirecionando sem evento.');
            callback();
        }

        return false;
    }

    /**
     * Configura ouvintes nos botões e gerencia parâmetros de URL (GCLID, UTM)
     */
    function setupConversionTracking() {
        const buttons = document.querySelectorAll('.btn-cta');
        const currentParams = window.location.search; // Captura ?gclid=...

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Impede navegação imediata para esperar o evento do Google
                e.preventDefault();

                let destinationUrl = button.getAttribute('href');

                // Anexa parâmetros existentes na URL para o link de destino (preserva rastreamento)
                if (currentParams) {
                    const separator = destinationUrl.includes('?') ? '&' : '?';
                    destinationUrl += separator + currentParams.substring(1);
                }

                // Chama função que dispara evento -> espera callback -> redireciona
                reportConversion(destinationUrl);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupConversionTracking);
    } else {
        setupConversionTracking();
    }
})();
