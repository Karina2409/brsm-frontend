/**
 * Склонение существительных в зависимости от числительного
 * @param n Число
 * @param forms [один, два, пять] -> ['день', 'дня', 'дней']
 */
export const pluralize = (n: number, [one, two, five]: [string, string, string]): string => {
    const n10 = Math.abs(n) % 10;
    const n100 = Math.abs(n) % 100;

    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return two;
    return five;
};
