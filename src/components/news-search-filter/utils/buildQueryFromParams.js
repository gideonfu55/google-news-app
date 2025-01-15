/**
 * Util function to build a search query from search parameters
 * @name buildQueryFromParams
 * @param {Object} searchParams - The search parameters
 * @returns {String} - The search query
 */

import { getDateFromRange } from './getDateRange';

export const buildQueryFromParams = (searchParams) => {

  let queryParts = [];
  let domains = '';
  let fromDate = '';
  let queryString = '';

  // For exact phrase params
  if (searchParams.exactPhrase) {
    queryParts.push(`"${searchParams.exactPhrase}"`);
  }

  // For has words params
  if (searchParams.hasWords) {
    queryParts.push(searchParams.hasWords);
  }

  // For exclude words params
  if (searchParams.excludeWords) {
    const excludedWords = searchParams.excludeWords
      .split(' ')
      .map((word) => `-${word}`)
      .join(' ');
    queryParts.push(excludedWords);
  }

  // Combine query parts
  const query = queryParts.join(' ');

  // For website domain params
  if (searchParams.website) {
    domains = `domains=${searchParams.website}&`;
  }

  // Add date range to search query
  if (searchParams.dateRange !== 'any') {
    const date = getDateFromRange(searchParams.dateRange);
    if (date) {
      fromDate = `from=${date}&`;
    }
  }

  // Combine query string
  queryString = `${domains}q=${encodeURIComponent(query)}&${fromDate}`;

  return queryString;
}