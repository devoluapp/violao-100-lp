(function () {
    /**
     * Configuração do Rastreamento de Conversão do Google Ads
     * Evento: Clique no botão de Checkout
     * Funcionalidade Extra: Repassa parâmetros de URL (GCLID, UTMs) para o checkout
     */
    function setupConversionTracking() {
        const buttons = document.querySelectorAll('.btn-cta');

        // 1. Captura os parâmetros da URL em que o usuário está agora (Ex: ?gclid=AbCd123...)
        const currentParams = window.location.search;

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                let destinationUrl = button.getAttribute('href');

                // 2. Se houver parâmetros na URL atual, adiciona-os ao link de destino
                if (currentParams) {
                    // Verifica se o link de destino já tem parâmetros
                    const separator = destinationUrl.includes('?') ? '&' : '?';
                    // Adiciona os parâmetros atuais (removendo o '?' inicial do currentParams para não duplicar se usar &)
                    destinationUrl += separator + currentParams.substring(1);
                }

                // 3. Verifica se a função de conversão do Google existe
                if (typeof gtag_report_conversion === 'function') {
                    e.preventDefault();

                    // Chama a função do Google passando a NOVA url com o gclid anexado
                    gtag_report_conversion(destinationUrl);

                    console.log('Redirecionando com rastreamento para: ' + destinationUrl);
                } else {
                    console.warn('Função gtag_report_conversion falhou. Redirecionando manualmente.');
                    // Fallback de segurança: se o script do Google falhar, vai para a URL com parametros mesmo assim, mas sem evento
                    if (currentParams && !button.href.includes(currentParams.substring(1))) {
                        window.location = destinationUrl;
                        e.preventDefault();
                    }
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupConversionTracking);
    } else {
        setupConversionTracking();
    }
})();
