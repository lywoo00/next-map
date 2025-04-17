import { useRouter } from "next/router"
const StoreDetailPage = () => {
    const router = useRouter()
    const {id} = router.query
    return (
    <h1>Store Detail: {id}</h1>
  )
}

export default StoreDetailPage