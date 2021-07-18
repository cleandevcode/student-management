export interface IWikiQuery {
  pageid: number;
  ns: number;
  title: string;
  index?: number;
  fullurl?: string;
  editurl?: string;
  canonicalurl?: string;
  length?: number;
}

export interface IWikiResponse {
  batchcomplete: string;
  continue?: any;
  query: {
    pages: IWikiQuery[];
  };
}
