export default function asArray(data: any) {
  return [data].flat().filter(Boolean)
}
