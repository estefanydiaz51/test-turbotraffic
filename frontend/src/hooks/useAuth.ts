import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useAuth = (role: string, push: string) => {
    const route = useRouter()
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const session = localStorage.getItem('auth')
            const sessionParse = session ? JSON.parse(session) : undefined
            if (role === 'none' && !sessionParse) {
                return setRender(true)
            }
            if (role === 'any' && sessionParse) {
                return setRender(true)
            } 
            if (sessionParse?.role !== role) {
                route.push(push)
            } else {
                return setRender(true)
            }

          

        }
    }, [])
    return {
        render
    }
}

export default useAuth