import { useState } from "react"
import { Credentials } from "../temial/src"

export const getSavedCredentials = () => {
  const str = window.localStorage.getItem('temial-credentials')
  if (str) {
    return JSON.parse(str)
  }
  return undefined
}

export const saveCredentials = (credentials?: Credentials) => {
  if (credentials) {
    window.localStorage.setItem('temial-credentials', JSON.stringify(credentials))
  } else {
    window.localStorage.removeItem('temial-credentials')
  }
}

export const useSavedCredentials = () => {
  const [credentials, _setCredentials] = useState<Credentials | undefined>(getSavedCredentials())

  const setCredentials = (credentials?: Credentials) => {
    saveCredentials(credentials)
    _setCredentials(credentials)
  }

  return {
    credentials,
    setCredentials,
  }
}
