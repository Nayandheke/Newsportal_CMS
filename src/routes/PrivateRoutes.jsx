import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import { setUser } from "../store"
import { Loading } from "../components/Loading"

export const PrivateRoutes = ({element}) => {
    const user = useSelector(state => state.user.value)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length == 0) {
            setLoading(true)
            const token = fromStorage('cmstoken')

            if(token) {
                http.get('profile/details')
                    .then(({data}) => dispatch(setUser(data)))
                    .catch(err => {
                        if(err.response.status == 401) {
                            clearStorage('cmstoken')
                            
                        }
                        toast.error('Please log in to continue.')
                        navigate('/login')
                    })
                    .finally( () => setLoading(false))
            } else {
                toast.error('Please log in to continue.')
                navigate('/login')
            }
        }
    },[user])

    return loading ? <Loading/> : element
}