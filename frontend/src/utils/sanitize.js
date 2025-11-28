import DOMPurify from 'dompurify'

// avoiding XSS
export const sanitizeDisplay= (val)=> DOMPurify.sanitize(val, {ALLOWED_TAGS: [], ALLOWED_ATTR: []})

export const sanitizeSubmit= (val)=> {
  if (!val) return val;
  return DOMPurify.sanitize(val.toString())
}