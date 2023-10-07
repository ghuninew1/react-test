import {useState, createContext, useContext} from 'react'
import {io} from 'socket.io-client'
import { SOCKET_URL } from '../config'

export const SocketContext = createContext(null)

const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null)

  const connectSocket = () => {
    if(!socket) {
      const newSocket = io(SOCKET_URL)
      setSocket(newSocket)
      return
    }
    socket.connect()
  }

  return (
    <SocketContext.Provider value={{socket, connectSocket}}>
      {children}
    </SocketContext.Provider>
  )
}

const useSocket = () => {
  const context = useContext(SocketContext)
  if(!context) {
    throw new Error('Something went wrong!')
  }
  return context
}

export {SocketProvider, useSocket}