export const stringTest = (value: string | undefined | null) => value ? value.match(/\d+/g)?.join('') !== value.replace(/\s/g, '') : true

export const passwordTest = (value: string) => /^(?=.*\d).{6,}$/.test(value)

export const onlyNumberTest = (value: number | string | null | undefined) => !!Number(value) ? /^[0-9]+$/.test(String(value)) : true

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const emailTest = (value: string) => emailRegex.test(value)

export const fileSizeTest = ({ value, imageSize = 1, videoSize = 50 }: { value: string | File | undefined, imageSize?: number, videoSize?: number }) => {
  if (value instanceof File) {
    if (value.type.startsWith('image/')) {
      return value.size < (imageSize * 1024 * 1024)
    } else if (value.type.startsWith('video/')) {
      return value.size < (videoSize * 1024 * 1024)
    }
  }
  return true
}
