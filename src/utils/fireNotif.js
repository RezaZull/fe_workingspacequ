import Swal from 'sweetalert2'

const fireNotif = {
  notifSuccess: (message) => {
    return Swal.fire({
      title: 'Success',
      icon: 'success',
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Continue',
    })
  },
  notifError: (message) => {
    return Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Continue',
    })
  },
  notifWarning: (message) => {
    return Swal.fire({
      title: 'Warning',
      icon: 'warning',
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Continue',
      showCancelButton: true,
    })
  },
  notifInfo: (message) => {
    return Swal.fire({
      title: 'Info',
      icon: 'info',
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Continue',
    })
  },
}
export default fireNotif
