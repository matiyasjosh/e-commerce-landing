import axios from "axios"

export function useShop() {
    const handleFetch = async () => {
      const res = await axios.get('/api/fetch-product')
      const products = res.data

      return products
    }

    return { handleFetch };
}