import Swal from 'sweetalert2'

export const Alert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: true,
        confirmButtonText: 'Continue',
        confirmButtonColor: "#6459DD",
    })
}


export const CookieName = 'aiwebgiddys'

export const UserRole = [
    {
        role: 'user',
        url: '/dashboard'
    },
    {
        role: 'admin',
        url: '/admin-controls'
    },
]

export const MoveToTop = () => {
    document.documentElement.scrollTo({
        top: 0
    })
}

export const MoveToTopDiv = () => {
    const move = document.querySelector('.move')
    move.scrollTo({
        top: 0,
    })
}




