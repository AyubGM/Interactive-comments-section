import { useState, useEffect } from "react"
// const {data: blog, error, isPending } = useFetch("http://localhost:8000/blogs/" + id)

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const abourtCont = new AbortController()


      
        

            fetch(url, {signal: abourtCont.signal})
            
                .then(res => {
                    if(!res.ok){ throw Error("couldnt fetch the data for that resource")}
                    return res.json()
                    
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted")
                    } else {
                        setIsPending(false)
                        setError(err.message)}
                    
                })


       

        return () => abourtCont.abort()
    }, [url]);

    return { data, isPending, error}

}

export default useFetch