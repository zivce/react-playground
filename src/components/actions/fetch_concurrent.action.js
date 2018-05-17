function fetchConcurrent(msg)
{
    return {
        type: 'FETCH_CONCURRENT',
        msg : msg
    }
}
export default fetchConcurrent