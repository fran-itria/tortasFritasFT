import { Theme } from "@/utils/constTheme";
import Swal from "sweetalert2";

export const alerts = (icon: 'error' | 'success', theme: string, text: string) => {
    const Toast = Swal.mixin({
        width: 300,
        heightAuto: true,
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: theme === Theme.DARK ? 'white' : 'black',
        background: theme === Theme.DARK ? '#585BFF' : 'white',
    })
    Toast.fire({
        icon: icon,
        text
    })
}