export function generateTimeOptions() {
  const times = [];

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute > 0) {
        break;
      }

      const timeString = `${hour.toString().padStart(2, '0')} : ${minute.toString().padStart(2, '0')}`;
      times.push(timeString);
    }
  }

  return times;
}

export const TIME_OPTIONS = generateTimeOptions();
