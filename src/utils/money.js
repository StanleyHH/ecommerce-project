export function formatMoney(amountCents) {
    const result = (Math.abs(amountCents) / 100).toFixed(2);
    return amountCents < 0 ? `-$${result}` : `$${result}`;
}