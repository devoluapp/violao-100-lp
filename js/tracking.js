(function () {
    /**
     * Configuração do Rastreamento de Conversão do Google Ads
     * Evento: Clique no botão de Checkout (Initiate Checkout)
     * Utiliza a função gtag_report_conversion definida no <head>
     */
    function setupConversionTracking() {
        // Seleciona todos os botões com a classe .btn-cta
        const buttons = document.querySelectorAll('.btn-cta');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const url = button.getAttribute('href');

                // Verifica se a função fornecida pelo Google Ads está disponível
                if (typeof gtag_report_conversion === 'function') {
                    // Impede a navegação padrão imediata
                    e.preventDefault();

                    // Chama a função que dispara is evento e depois redireciona via callback
                    gtag_report_conversion(url);

                    console.log('Conversão disparada via gtag_report_conversion para: ' + url);
                } else {
                    console.warn('Função gtag_report_conversion não encontrada. Segue fluxo normal de clique.');
                    // O link abrirá normalmente pois não chamamos preventDefault()
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
