export const isEmail = (v = '') => /.+@.+\..+/.test(v);
export const isNotEmpty = (v = '') => v.trim().length > 0;