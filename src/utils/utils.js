import Swal from 'sweetalert2'

export const Alert = (title,text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
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

export const MoveToTopDivs = () => {
    const  thediv = document.querySelector('.thediv')
    thediv.scrollTo({
        top: 0,
    })
}




