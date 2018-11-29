import { QRValidationURL } from './app.config';
export const DateConverter = dateText => {
  let monthID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  let dayID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];
  let date = new Date(dateText);
  return {
    id: _ => {
      return {
        date: date.getDate(),
        day: dayID[date.getDay()],
        month: monthID[date.getMonth()],
        year: date.getFullYear()
      }
    }
  }
}

export const QRURLBuilder = key => `${QRValidationURL}?id=${key}`;