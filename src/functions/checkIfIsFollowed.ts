export default (follows: string[], id: string) =>
  follows.findIndex(e => e === id) > -1
