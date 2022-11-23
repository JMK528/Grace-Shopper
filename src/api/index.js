
const baseURL = 'http://localhost:3001/api';

export const loginUser = async (username, password) => {
    try {
        const response = await fetch (`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        const result = await response.json();
        return result;
      } catch (err) {
        console.log('registerUser FAILED', err);
      }
}

export const registerUser = async (username, password, email, name, active, isAdmin) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name,
        active: active,
        isAdmin: isAdmin
      })
    })
    console.log(email, 'line 38 of src/index')
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user.')
  }
}


// export const registerUser = async (username, password) => {
  //   try {
  //     const response = await fetch(`${baseURL}/users/register`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           username: username,
  //           password: password
  //         }
  //       })
  //     })
  //     const result = await response.json();
  //     if (!result) {
  //       return {
  //         success: false,
  //         error: {
  //           name: "error",
  //           message: "something went wrong, please try again",
  //         },
  //       };
  //     }
  //     return result;
  //   } catch(error) {
  //     console.log('Error registering user');
  //   }
  // }
