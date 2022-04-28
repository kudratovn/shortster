export const SERVER_ROUTES = {
  ROOT: "/",
  SUBMIT: "/submit",
} as const;

export const STATUSES = {
  ERROR: 'error',
  SUCCESS: 'success'
} as const;

export type TypeStatuses = typeof STATUSES[keyof typeof STATUSES]