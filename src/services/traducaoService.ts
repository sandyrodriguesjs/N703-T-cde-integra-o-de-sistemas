import { translate } from '@vitalets/google-translate-api';

export async function traduzirTexto(texto: string, target: string = 'pt'): Promise<string> {
  try {
    // Não traduz textos muito curtos ou inválidos
    if (!texto || texto.length < 20 || texto === 'Descrição não disponível') {
      return texto;
    }

    console.log(`🔠 Traduzindo: ${texto.substring(0, 40)}...`);

    const result = await translate(texto, { 
      to: target,
    });

    return result.text;
    
  } catch (error) {
    console.warn('Google Translate falhou, mantendo texto original');
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message, error.stack);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return texto;
  }
}