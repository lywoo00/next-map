import { useRouter } from "next/router"

const StroeEditPage = () => {
const router = useRouter()
const {id} = router.query
console.log(id)
  return (
    <h1>Store Edit: {id}</h1>
  )
}

export default StroeEditPage