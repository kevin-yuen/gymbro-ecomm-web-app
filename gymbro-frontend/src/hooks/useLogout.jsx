export default function useLogout() {
    const handleLogout = () => {
      localStorage.removeItem("authorizedUser")
    }


    return { handleLogout }
}