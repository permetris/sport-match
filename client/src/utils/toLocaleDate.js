export const toLocaleDate = (time) => {
    const date = new Date(time);

    // Calculate the offset in milliseconds for UTC+2 (2 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const offset = 2 * 60 * 60 * 1000;
  
    // Create a new Date object for the UTC+2 time
    const utcPlus2Date = new Date(date.getTime() + offset);
  
    // Format the new date to a readable string
    return  utcPlus2Date.toISOString().replace('T', ' ').substring(0, 19)
 }