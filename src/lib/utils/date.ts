export function dateFormate(date: Date) {
  return date.toLocaleString('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function periodFormate(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    const month = endDate.toLocaleString('en', {
      month: 'short',
    });
    return `${startDate.getDate()}-${endDate.getDate()} ${month} ${endDate.getFullYear()}`;
  }

  if (startDate.getFullYear() === endDate.getFullYear()) {
    const sDate = startDate.toLocaleString('en', {
      month: 'short',
      day: '2-digit',
    });
    const eDate = endDate.toLocaleString('en', {
      month: 'short',
      day: '2-digit',
    });
    return `${sDate}-${eDate} ${startDate.getFullYear()}`;
  }
  const sDate = dateFormate(startDate);
  const eDate = dateFormate(endDate);
  return `${sDate}-${eDate}`;
}

export function expireFormate(date: Date) {
  return `${date.getMonth()}/${date.getFullYear()}`;
}

export function activityFormate(dt: string) {
  const date = new Date(dt);
  const currentDate = new Date();

  const hours = currentDate.getHours() - date.getHours();
  const days = currentDate.getDate() - date.getDate();
  const months = currentDate.getMonth() - date.getMonth();
  const years = currentDate.getFullYear() - date.getFullYear();

  if (!days && !hours && !months && !years) {
    return 'now';
  }
  if (!days && !months && !years && hours) {
    return `${hours} hours`;
  }
  if (days && !months && !years && !hours) {
    return `${days} days`;
  }
  if (!days && months && !years) return `${months} months`;

  return `${years} years`;
}

export function generateExpiryDate(yearsToLive = 4) {
  const now = new Date();

  // Set the expiration date exactly N years into the future
  const expiryDate = new Date(now.setFullYear(now.getFullYear() + yearsToLive));

  return expiryDate.toISOString();
}
