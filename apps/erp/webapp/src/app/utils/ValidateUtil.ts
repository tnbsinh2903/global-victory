export const REGEXP_LETTER = /^[\p{L}\s'-]+$/u

export const REGEXP_PHONE = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/

export const REGEXP_ADDRESS = /^[\p{L}\s0-9',\/-]+$/u

export const REGEXP_EMAIL = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

export const REGEXP_PASSWORD = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

export const REGEXP_PARAGRAPH = /^[\p{L}\s0-9',\./-]+$/u