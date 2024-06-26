import { IntelDateTimeFormat } from '../types/global';

export const system = {
  appEnv: {
    production: 'production',
    develop: 'develop'
  }
};

export const date = {
  format: {
    date: {
      label: 'date',
      value: {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/Kiev'
      } as IntelDateTimeFormat
    },
    time: {
      label: 'time',
      value: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Kiev'
      } as IntelDateTimeFormat
    },
    dateAndTime: {
      label: 'dateAndTime',
      value: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/Kiev'
      } as IntelDateTimeFormat
    }
  }
};
