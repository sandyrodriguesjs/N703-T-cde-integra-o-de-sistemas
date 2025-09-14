// Função utilitária para remover tags HTML
function formatarTexto(texto: string): string {
    return texto.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export { formatarTexto };