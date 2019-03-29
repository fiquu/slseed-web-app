export default class Formatter {
  /**
   * Formats a value as price.
   */
  static price(value) {
    if (!value) {
      return {
        formatted: '0',
        cleaned: 0
      };
    }

    const cleaned = parseFloat(String(value).replace(/[^0-9]/g, '')); // Remove all non numeric chars and leading zeroes
    const formatted = String(cleaned)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Add group separator every 3 chars
      .replace(/\s+/g, ' '); // Remove any whitespace

    return {
      cleaned: cleaned,
      formatted
    };
  }
}
