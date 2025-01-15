/**
 * Util function to get the date from the range provided
 * @name getDateFromRange
 * @param {*} range
 * @returns {String} - The date in ISO format
 * 
 */
export const getDateFromRange = (range) => {

  const now = new Date();

  switch (range) {
    case 'hour':
      now.setHours(now.getHours() - 1);
      break;
    case 'day':
      now.setDate(now.getDate() - 1);
      break;
    case 'week':
      now.setDate(now.getDate() - 7);
      break;
    default:
      return null;
  };

  return now.toISOString().split('T')[0];
}