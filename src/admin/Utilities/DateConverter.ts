
  export const convertStringToDate = (data: string|undefined) => {
    if(data == undefined)
      return "never";
    const date = new Date(data);
    const today = new Date();
    const yesterday = today.setDate(date.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const isYesterday = date.getDate() === yesterday &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const formatted = date.toLocaleString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const prefix = isToday? "(Dzisiaj)" : isYesterday? "(Wczoraj)":"";
    return prefix + " " +formatted;
  };

