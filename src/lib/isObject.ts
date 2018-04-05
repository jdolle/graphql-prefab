export default (x: any): x is Object =>
  Object.prototype.toString.call(x) === '[object Object]'
