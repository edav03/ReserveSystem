import { format } from 'path';

export function capitalize(s: string) {
    return s ? s[0].toUpperCase() + s.slice(1) : undefined;
}

export function getSportName(name: string) {
    const sportName = name.split('-');
    switch (sportName[0]) {
        case 'futbol' || 'basquet':
            name = 'Campo de ' + capitalize(sportName[0]);
            break;
        default:
            name = 'Pista de ' + capitalize(sportName[0]);
            break;
    }
    return sportName[1] ? (name += ` ${sportName[1]}`) : name;
}

export function getDateToReadableString(startDate: string, endDate?: string | undefined) {
    const startingDate: Date = new Date(startDate);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Madrid',
        weekday: 'long',
    };
    const dayOfWeek: string | undefined = capitalize(
        startingDate.toLocaleDateString('es-ES', options)
    );
    const day: string = startingDate.toLocaleString('es-ES', {
        day: 'numeric',
        timeZone: options.timeZone,
    });
    const month: string | undefined = capitalize(
        startingDate.toLocaleString('es-ES', {
            month: 'long',
            timeZone: options.timeZone,
        })
    );
    const startHour: string = startingDate.toLocaleTimeString('es-ES', {
        hour: 'numeric',
        timeZone: options.timeZone,
    });

    if (endDate != undefined) {
        const endingDate: Date = new Date(endDate);
        const endHour: string = endingDate.toLocaleTimeString('es-ES', {
            hour: 'numeric',
            timeZone: options.timeZone,
        });
        return `${dayOfWeek} ${day} de ${month}, de ${startHour}:00-${endHour}:00`;
    } else {
        return `${dayOfWeek} ${day} de ${month}, ${startHour}:00`;
    }
}

export function getHourFromDate(date: Date) {
    const rawHour = date.toLocaleTimeString();
    const hour = rawHour.slice(0, -6);

    return hour;
}

export function getLocalTime(dateToTransform: string | Date) {
    const rawStartDate = new Date(dateToTransform);

    const date = new Date(rawStartDate);
    const options = {
        timeZone: 'Europe/Madrid',
    };
    const localDate = new Date(date.toLocaleString('en-US', options));
    const isoString = transfromToISOString(localDate);

    return isoString;
}

export function transfromToISOString(localDate: Date) {
    const isoString = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();
    return isoString;
}
