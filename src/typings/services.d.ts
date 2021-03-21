interface IImageSearchOptions {
    /**
   * Query
   */
    searchTerm: string;
    /**
   * Number of search results to return.
   * Valid values are integers between 1 and 10, inclusive.
   */
    num: number;
    /**
   * The index of the first result to return.
   * The default number of results per page is 10, so &start=11 would start at the top of the second page of results.
   * Note: The JSON API will never return more than 100 results, even if more than 100 documents match the query,
   * so setting the sum of start + num to a number greater than 100 will produce an error.
   * Also note that the maximum value for num is 10.
   */
    start: number;
    /**
   * Returns images of a specified size
   */
    imgSize?:
    | 'huge'
    | 'icon'
    | 'large'
    | 'medium'
    | 'small'
    | 'xlarge'
    | 'xxlarge';
    /**
   * Restricts results to URLs based on date. Supported values include:
   * d[number]: requests results from the specified number of past days.
   * w[number]: requests results from the specified number of past weeks.
   * m[number]: requests results from the specified number of past months.
   * y[number]: requests results from the specified number of past years.
   */
    dateRestrict?: string;
}

interface IGoogleImage {
    fullSize: {
        url: string;
        height: number;
        width: number;
    };
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
}
