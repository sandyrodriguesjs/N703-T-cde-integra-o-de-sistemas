import axios from 'axios';

export async function traduzirTexto(texto: string, target: string = 'pt'): Promise<string> {
  if (!texto || texto.length < 20 || texto === 'Descrição não disponível') {
    return texto;
  }

  console.log(`🔠 Traduzindo: ${texto.substring(0, 40)}...`);

  try {
    // Usa parâmetros corretos para MyMemory
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: texto,
        langpair: 'en|pt', // FIXED: Não usa 'auto', especifica en->pt
        mt: '1', // Machine translation
        onlyprivate: '0', // Inclui traduções públicas
        de: 'myapp@example.com' // Email para limites maiores
      },
      timeout: 10000
    });

    console.log('Resposta MyMemory:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      return response.data.responseData.translatedText;
    }
    
    if (response.data && response.data.responseStatus === 403) {
      console.warn('Limite de tradução excedido');
    }
    
    throw new Error('Resposta inválida da API');
    
  } catch (error) {
    console.warn('Tradução falhou, mantendo texto original');
    if (error instanceof Error) {
      console.error('Detalhes:', error.message);
    }
    return texto;
  }
}