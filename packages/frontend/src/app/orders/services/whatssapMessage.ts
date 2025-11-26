
enum messages {
    accept = "Tu pedido ha sido aceptado, le avisaremos cuando este listo para retirar.",
    completed = "Su pedido ya esta listo, puede retirarlo cuando guste.",
    rejected = "En estos momentos no podemos aceptar su pedido, disculpe."
}



export default function whatssapLink(phone: string, caseMessage: string) {
    console.log(phone, caseMessage);
    console.log(messages[caseMessage as keyof typeof messages]);
    const link = `https://wa.me/${phone}/?text=${messages[caseMessage as keyof typeof messages]}`;
    return link
}