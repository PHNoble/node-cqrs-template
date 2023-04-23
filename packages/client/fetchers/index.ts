export class SWRError extends Error {
  info: string;
  status: number;
  constructor(message: string, info: string, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

export function swrFetcher<T>(...args): Promise<T> {
  // @ts-ignore
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        throw new SWRError(
          "An error occurerd while fetching data",
          "INFO",
          res.status
        );
      }
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    });
}
