
enum TimeUnit {
    minute = 60,
    hour = 60 * 60,
    day = 24 * 60 * 60,
}

export function getTimeDiffOfLocaleString(datetime: string) {
    const diffTime: number = calculateTimeDiffByNow(datetime);
    switch (true) {
    case diffTime >= TimeUnit.day:
        return `${Math.floor(diffTime / TimeUnit.day)} 天前`;
    case diffTime >= TimeUnit.hour:
        return `${Math.floor(diffTime / TimeUnit.hour)} 小時前`;
    case diffTime >= TimeUnit.minute:
        return `${Math.floor(diffTime / TimeUnit.minute)} 分鐘前`;
    default:
        return '最近';
    }
}

function calculateTimeDiffByNow(datetime: string): number {
    const parsedDateTime = new Date(datetime);
    const timeDiffOfMiliSecs = (Date.now() - parsedDateTime.getTime());
    const timeDiffOfSecs = Math.floor(timeDiffOfMiliSecs / 1000);
    return timeDiffOfSecs;
}
