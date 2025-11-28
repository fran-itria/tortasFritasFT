'use client'
import useUsersHook from "./useUsersHook";
import { Theme } from "@/utils/constTheme";
import changeAdminStatus from "./services/changeAdminStatus";
import Loading from "@/components/loading";
import changeActiveStatus from "./services/changeActiveStatus";
import { SearchIcon } from "@/components/Icons";

export default function UsersPage() {
    const { users, loader, setLoader, setSearchUser, theme } = useUsersHook()
    return (
        <div className="px-6">
            {loader && <Loading text={loader} />}
            <table className={`
            w-full 
            font-bold
            rounded-t-lg
            rounded-b-0
            border-separate border-3 border-spacing-2
            ${loader && 'opacity-50 pointer-events-none'} 
            ${theme == Theme.DARK ? 'bg-dark-background-button border-dark-input' : 'bg-light-tertiary border-black'}
            `}>
                <caption className="mt-4 mb-3 text-left">
                    Lista de usuarios
                    <div className="relative float-center flex items-center justify-center w-fit">
                        <div className="absolute left-2 z-10">
                            <SearchIcon theme={theme} />
                        </div>
                        <input className={`
                        ${theme == Theme.DARK ? 'bg-dark-input text-black' : 'bg-light-input text-white'}
                        rounded-lg
                        text-sm
                        w-40
                        px-8
                        `}
                            type="search"
                            onChange={(e) => setSearchUser(e.target.value)}
                        >
                        </input>
                    </div>
                </caption>
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