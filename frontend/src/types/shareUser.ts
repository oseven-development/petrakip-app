export interface ShareUser {
  email: string
  id: string
}

export interface CheckShareUser extends ShareUser {
  alreadyExist: boolean
}

export type ShareType = 'share' | 'remove'
