enum TimeUnit {
    minute = 60,
    hour = 60 * 60,
    day = 24 * 60 * 60,
}

export function getTimeDiffOfLocaleString(datetime: string) {
    const diffTime: number = calculateTimeDiffByNow(datetime);
    switch (true) {
    case diffTime >= TimeUnit.day:
        return `${Math.floor(diffTime / TimeUnit.day)} days ago`;
    case diffTime >= TimeUnit.hour:
        return `${Math.floor(diffTime / TimeUnit.hour)} hours ago`;
    case diffTime >= TimeUnit.minute:
        return `${Math.floor(diffTime / TimeUnit.minute)} Minues ago`;
    default:
        return 'Just now';
    }
}

function calculateTimeDiffByNow(datetime: string): number {
    const parsedDateTime = new Date(datetime);
    const timeDiffOfMiliSecs = (Date.now() - parsedDateTime.getTime());
    const timeDiffOfSecs = Math.floor(timeDiffOfMiliSecs / 1000);
    return timeDiffOfSecs;
}
