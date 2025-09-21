import axios from 'axios';

export async function traduzirTexto(texto: string, target: string = 'pt'): Promise<string> {
  if (!texto || texto.length < 20 || texto === 'Descrição não disponível') {
    return texto;
  }


  try {
  
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: texto,
        langpair: 'en|pt', 
        mt: '1', 
        onlyprivate: '0', 
        de: 'myapp@example.com' 
      },
      timeout: 10000
    });


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