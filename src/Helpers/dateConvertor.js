export  const dateConvertor = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
      };
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };
      return date.toLocaleDateString('en-US', dateOptions) + ' ' + date.toLocaleTimeString('en-US', timeOptions);
    }