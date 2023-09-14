import axios from 'axios'

const Notify = async (token,message) => {
    const response = await axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ token
        },
        data: {
            message: message
        }
    })
    
  return response
}
export default Notify