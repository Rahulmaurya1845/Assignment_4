import axios from 'axios';


export const baseURL = process.env.REACT_APP_API_URL;
const instance = axios.create({
    baseURL
})

// admin: yourSecurePassword
// student BK20250012: BK20250012
// teacher TK2025151: TK2025151
export default instance