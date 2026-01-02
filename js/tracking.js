(function () {
    /**
     * Configuração do Rastreamento de Conversão do Google Ads
     * Evento: Clique no botão de Checkout (Initiate Checkout)
     */
    function setupConversionTracking() {
        // Seleciona todos os botões com a classe .btn-cta
        const buttons = document.querySelectorAll('.btn-cta');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Verifica se o gtag foi carregado
                if (typeof gtag === 'function') {

                    // Dispara o evento de conversão do Google Ads
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17837722215/4m0JCKCMgdsbEOeU2LlC',
                        'value': 1.0,
                        'currency': 'BRL'
                    });
                    console.log('Evento de checkout disparado para botões .btn-cta');
                }
            });
        });
    }

    // Garante que o DOM esteja carregado antes de anexar os eventos
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupConversionTracking);
    } else {
        setupConversionTracking();
    }
})();
