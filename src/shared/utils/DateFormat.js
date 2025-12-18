export class DateFormat {
    static format(date) {
        if (date instanceof Date) {
            return date.toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
        }
    }
}
