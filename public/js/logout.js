/*eslint-disable*/
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out. Try again');
  }
};

const logOutBtn = document.querySelector('.nav__el--logout');
if (logOutBtn) logOutBtn.addEventListener('click', logout);
