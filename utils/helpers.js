module.exports = {
    // format_time: (date) => {
    //   return date.toLocaleTimeString();
    // },
    // // The custom helper 'format_date' takes in a timestamp
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
  };
  