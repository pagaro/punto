import axios from 'axios';

const userLoginStatus = async () =>{
    let isLoggedIng = false;
    let errormsg = null;

    const token = localStorage.getItem('token');

    if (token) {
        await axios.get('http://localhost:3000/check-token', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
                if (response.status === 200) {
                    console.log("toto" + response.status)
                    isLoggedIng = true;
                    console.log(isLoggedIng)
                }
            }
        ).catch(error => {
            errormsg = error.message;
            isLoggedIng = false;
        });
    }
    console.log(isLoggedIng)
    return {isLoggedIng, errormsg};
}

export default userLoginStatus;