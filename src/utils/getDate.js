export default function getDate(d) {
    const t = new Date(d);
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`
}