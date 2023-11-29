// helpers.js

export const getPrettyDate = (date) => {
    console.log('date', date)
    date = date.split(' ')[0];
    console.log('date', date)
    const newDate = date.split('-');
    console.log('date', newDate)
    const month = months[0];
    return `${month} ${newDate[2]}, ${newDate[0]}`;
  };
  
  export const getPrettyTime = (date) => {
    const time = date.split(' ')[1].split(':');
    return `${time[0]}:${time[1]}`;
  };
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  