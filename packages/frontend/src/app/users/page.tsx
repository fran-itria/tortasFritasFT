'use client'
import { useUserState } from "@/zustand/userState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUsersHook from "./useUsersHook";
import useThemeState from "@/zustand/theme";
import { Theme } from "@/utils/constTheme";
import "./switch.css"
import changeAdminStatus from "./services/changeAdminStatus";
import Loading from "@/components/loading";
import changeActiveStatus from "./services/changeActiveStatus";

export default function UsersPage() {
    const { user } = useUserState(state => state);
    const { theme } = useThemeState(state => state)
    const router = useRouter()
    const { users, loader, setLoader } = useUsersHook()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !user || !user.admin) {
            router.back()
        }
    }, [])
    return (
        <div className="px-6">
            {loader.state && <Loading text={loader.text} />}
            <table className={`
            w-full 
            font-bold
            rounded-t-lg
            rounded-b-0
            border-separate border-3 border-spacing-2
            ${loader.state && 'opacity-50 pointer-events-none'} 
            ${theme == Theme.DARK ? 'bg-dark-background-button border-dark-input' : 'bg-light-tertiary border-black'}
            `}>
                <thead>
                    <tr>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Nombre</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Apellido</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Tel</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Ordenes</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Active</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {user.name}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {user.surname}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {user.phone || 'N/A'}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {user.orders ? user.orders.length : 0}
                            </td>
                            <td
                                className={`
                                    border-2
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                <div className="flex justify-center items-center min-h-[35px]">
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={user.active} onChange={e => changeActiveStatus({ id: user.id, e, setLoader, theme })} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                <div className="flex justify-center items-center min-h-[35px]">
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={user.admin} onChange={e => changeAdminStatus({ id: user.id, e, setLoader, theme })} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}