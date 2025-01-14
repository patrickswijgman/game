export function zero(obj: object) {
  for (const key in obj) {
    const type = typeof obj[key];

    switch (type) {
      case "object":
        zero(obj[key]);
        break;
      case "string":
        obj[key] = "";
        break;
      case "number":
        obj[key] = 0;
        break;
      case "boolean":
        obj[key] = false;
        break;
      default:
        throw new Error(`Cannot zero value of type ${type}`);
    }
  }
}
